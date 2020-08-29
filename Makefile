.DEFAULT_GOAL := build

.PHONY: build clean

# ==============================================================================
# Target used by Netlify
# ==============================================================================

# Target used by Netlify to build the prod version.
build:
	make clean
	# Download dependencies
	yarn install --network-timeout 3000 --prefer-offline
	# Create folder to copy dependencies
	mkdir -p ./site/css/dependencies/
	mkdir -p ./site/js/dependencies/
	# reboot.css
	cp ./node_modules/bootstrap-reboot/dist/reboot.min.css* ./site/css/dependencies/
	## fonts
	cp -R ./node_modules/typeface-montserrat ./site/css/dependencies/
	cp -R ./node_modules/typeface-eb-garamond ./site/css/dependencies/
	# AOS
	cp ./node_modules/aos/dist/aos.css ./site/css/dependencies/aos.css
	cp ./node_modules/aos/dist/aos.js ./site/js/dependencies/aos.js
	# Lint
	yarn lint
	yarn prettier:check

clean:
	# We should clean the repo, because Netlify does not clean the repo
	# Options `-f -f` is not an error. See https://github.com/sogilis/Blog/pull/160#discussion_r422919097
	# Following is advised by GitLab CI https://docs.gitlab.com/ee/ci/yaml/#git-clean-flags
	git clean -f -f -d -x -e node_modules
