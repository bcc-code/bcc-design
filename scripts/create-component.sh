#!/usr/bin/env bash

makeComponent() {
	COMPONENT="$1"
	if [ -d src/components/$COMPONENT ]; then
		printf "$COMPONENT folder already exists, skipping.\n"
	else
		mkdir src/components/$COMPONENT

		sh scripts/templates/create-vue-file.sh $COMPONENT
		sh scripts/templates/create-test-file.sh $COMPONENT
		sh scripts/templates/create-stories-file.sh $COMPONENT

        echo "export { default as $1 } from \"./components/$1/$1.vue\";" >> src/index.ts

		printf "Scaffolded $1 component. The following files were created:\n"
		printf "
src
├── components
	├── $COMPONENT
		├── $COMPONENT.spec.ts
		├── $COMPONENT.stories.ts
		├── $COMPONENT.vue
		"
	fi
}

makeComponent $1
