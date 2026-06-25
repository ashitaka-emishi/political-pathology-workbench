.PHONY: validate generate site-data analyze render build publish-preview

validate:
	npm run validate

generate:
	npm run generate

site-data:
	npm run site-data

analyze:
	PYTHONPATH=src-py python3 -m political_pathology.scoring.summary

render:
	cd site && quarto render

build: validate generate analyze site-data

publish-preview: build render
