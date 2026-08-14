import fs from "node:fs";
import path from "node:path";
import { readJson } from "./json.js";

function describeType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function pointerJoin(pointer, token) {
  return `${pointer}/${String(token).replaceAll("~", "~0").replaceAll("/", "~1")}`;
}

function normalizeTypes(type) {
  return Array.isArray(type) ? type : [type];
}

function schemaRef(schema, schemasByName, ref) {
  const [fileName, fragment] = ref.split("#");
  const target = fileName ? schemasByName.get(fileName) : schema;
  if (!target) return null;
  if (!fragment) return target;
  const parts = fragment.split("/").filter(Boolean).map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"));
  return parts.reduce((value, part) => value?.[part], target);
}

function validateValue(value, schemaNode, context, errors, schemasByName, rootSchema) {
  if (!schemaNode) return;
  if (schemaNode.$ref) {
    const resolved = schemaRef(rootSchema, schemasByName, schemaNode.$ref);
    if (!resolved) {
      errors.push(`${context.artifactPath}: ${context.pointer}: unresolved schema ref ${schemaNode.$ref}`);
      return;
    }
    validateValue(value, resolved, context, errors, schemasByName, rootSchema);
    return;
  }

  if (schemaNode.const !== undefined && value !== schemaNode.const) {
    errors.push(`${context.artifactPath}: ${context.pointer}: expected const ${JSON.stringify(schemaNode.const)}, got ${JSON.stringify(value)}`);
  }

  if (schemaNode.type !== undefined) {
    const expectedTypes = normalizeTypes(schemaNode.type);
    const actualType = describeType(value);
    const matches = expectedTypes.some((type) => {
      if (type === actualType) return true;
      if (type === "number" && actualType === "number") return true;
      if (type === "integer" && actualType === "number") return Number.isInteger(value);
      return false;
    });
    if (!matches) {
      errors.push(`${context.artifactPath}: ${context.pointer}: expected type ${expectedTypes.join("|")}, got ${actualType}`);
      return;
    }
  }

  if (schemaNode.enum && !schemaNode.enum.includes(value)) {
    errors.push(`${context.artifactPath}: ${context.pointer}: unsupported enum value ${JSON.stringify(value)}`);
  }

  if (typeof value === "number") {
    if (schemaNode.minimum !== undefined && value < schemaNode.minimum) {
      errors.push(`${context.artifactPath}: ${context.pointer}: value ${value} is below minimum ${schemaNode.minimum}`);
    }
    if (schemaNode.maximum !== undefined && value > schemaNode.maximum) {
      errors.push(`${context.artifactPath}: ${context.pointer}: value ${value} is above maximum ${schemaNode.maximum}`);
    }
  }

  if (Array.isArray(value)) {
    if (schemaNode.minItems !== undefined && value.length < schemaNode.minItems) {
      errors.push(`${context.artifactPath}: ${context.pointer}: expected at least ${schemaNode.minItems} item(s), got ${value.length}`);
    }
    if (schemaNode.uniqueItems) {
      const seen = new Set();
      for (const item of value) {
        const key = JSON.stringify(item);
        if (seen.has(key)) errors.push(`${context.artifactPath}: ${context.pointer}: duplicate array item ${key}`);
        seen.add(key);
      }
    }
    if (schemaNode.items) {
      value.forEach((item, index) => {
        validateValue(item, schemaNode.items, { ...context, pointer: pointerJoin(context.pointer, index) }, errors, schemasByName, rootSchema);
      });
    }
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const requiredField of schemaNode.required ?? []) {
      if (value[requiredField] === undefined || value[requiredField] === null || value[requiredField] === "") {
        errors.push(`${context.artifactPath}: ${pointerJoin(context.pointer, requiredField)}: missing required field`);
      }
    }

    const properties = schemaNode.properties ?? {};
    if (schemaNode.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.hasOwn(properties, key)) {
          errors.push(`${context.artifactPath}: ${pointerJoin(context.pointer, key)}: additional property is not allowed`);
        }
      }
    } else if (schemaNode.additionalProperties && typeof schemaNode.additionalProperties === "object") {
      for (const key of Object.keys(value)) {
        if (!Object.hasOwn(properties, key)) {
          validateValue(value[key], schemaNode.additionalProperties, { ...context, pointer: pointerJoin(context.pointer, key) }, errors, schemasByName, rootSchema);
        }
      }
    }

    for (const [key, propertySchema] of Object.entries(properties)) {
      if (value[key] !== undefined) {
        validateValue(value[key], propertySchema, { ...context, pointer: pointerJoin(context.pointer, key) }, errors, schemasByName, rootSchema);
      }
    }
  }
}

function addCaseArtifacts(root, artifacts) {
  const casesRoot = path.join(root, "data", "cases");
  if (!fs.existsSync(casesRoot)) return;
  for (const caseSlug of fs.readdirSync(casesRoot).sort()) {
    const caseDir = path.join(casesRoot, caseSlug);
    if (!fs.statSync(caseDir).isDirectory()) continue;
    artifacts.push(["case.schema.json", path.join(caseDir, "case.json")]);
    artifacts.push(["source.schema.json", path.join(caseDir, "source-pack.json")]);
    artifacts.push(["passage.schema.json", path.join(caseDir, "passages.json")]);
    artifacts.push(["claim.schema.json", path.join(caseDir, "claims.json")]);
    artifacts.push(["counterclaim.schema.json", path.join(caseDir, "counterclaims.json")]);
    artifacts.push(["interpretation.schema.json", path.join(caseDir, "interpretations.json")]);
    artifacts.push(["score.schema.json", path.join(caseDir, "scores.json")]);
    artifacts.push(["search-log.schema.json", path.join(caseDir, "search-log.json")]);
    artifacts.push(["rival-explanation.schema.json", path.join(caseDir, "rival-explanations.json")]);
  }
}

function addTheoryArtifacts(root, artifacts) {
  const theoriesRoot = path.join(root, "theories");
  if (!fs.existsSync(theoriesRoot)) return;
  for (const theorySlug of fs.readdirSync(theoriesRoot).sort()) {
    const theoryDir = path.join(theoriesRoot, theorySlug);
    if (!fs.statSync(theoryDir).isDirectory()) continue;
    artifacts.push(["theory.schema.json", path.join(theoryDir, "manifest.json")]);
    artifacts.push(["theory-variable.schema.json", path.join(theoryDir, "variables.json")]);
    artifacts.push(["theory-proposition.schema.json", path.join(theoryDir, "propositions.json")]);
    artifacts.push(["construct-validity.schema.json", path.join(theoryDir, "construct-validity.json")]);
  }
}

export function validateSchemaRegistry(root) {
  const errors = [];
  const schemasDir = path.join(root, "schemas");
  const schemasByName = new Map();
  for (const fileName of fs.readdirSync(schemasDir).filter((name) => name.endsWith(".schema.json")).sort()) {
    const schemaPath = path.join(schemasDir, fileName);
    const schema = readJson(schemaPath);
    schemasByName.set(fileName, schema);
    if (schema.$schema && !schema.$schema.includes("2020-12")) {
      errors.push(`${schemaPath}: unsupported schema dialect ${schema.$schema}`);
    }
    if (!schema.$id && fileName !== "controlled-vocab.schema.json") {
      errors.push(`${schemaPath}: schema is missing $id`);
    }
  }

  const artifacts = [
    ["research-question.schema.json", path.join(root, "research", "research-questions.json")],
    ["claim-promotion.schema.json", path.join(root, "data", "claim-promotion", "promotion-registry.json")],
    ["corpus-registry.schema.json", path.join(root, "data", "corpora", "corpus-registry.json")],
    ["evidence-module.schema.json", path.join(root, "data", "evidence-modules", "module-registry.json")],
    ["child-issue-migration-manifest.schema.json", path.join(root, "data", "migration", "child-issue-migration-manifest.json")]
  ];
  addCaseArtifacts(root, artifacts);
  addTheoryArtifacts(root, artifacts);

  for (const [schemaName, artifactPath] of artifacts) {
    if (!fs.existsSync(artifactPath)) continue;
    const schema = schemasByName.get(schemaName);
    if (!schema) {
      errors.push(`${artifactPath}: no schema registered at schemas/${schemaName}`);
      continue;
    }
    const value = readJson(artifactPath);
    if (Array.isArray(value) && schema.type === "object") {
      value.forEach((item, index) => {
        validateValue(item, schema, { artifactPath, pointer: `/${index}` }, errors, schemasByName, schema);
      });
    } else {
      validateValue(value, schema, { artifactPath, pointer: "" }, errors, schemasByName, schema);
    }
  }

  return { errors };
}
