run:
				cd frontend && npm run dev

lint:
				cd frontend && npx eslint

lintfix:
				cd frontend && npx eslint --fix .

build:
				rm -rf frontend/build
				cd frontend && npm run build