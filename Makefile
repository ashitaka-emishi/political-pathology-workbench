.PHONY: validate generate summary site-data analyze pre-render render build publish-preview

validate:
	npm run validate

generate:
	npm run generate

summary:
	npm run summary

site-data:
	npm run site-data

analyze:
	PYTHONPATH=src-py python3 -m political_pathology.scoring.summary

pre-render:
	python3 site/pre-render.py

render:
	cd site && quarto render

build: validate generate analyze site-data pre-render

publish-preview: build render
