#  Tanzu Buildpacks Documentation Book

The content repo associated with this book is [pivotal/docs-tanzu-buildpacks](https://github.com/pivotal/docs-tanzu-buildpacks).
For specific information about Tanzu Buildpacks documentation,
see [Tanzu Buildpacks Docs](https://github.com/pivotal/docs-tanzu-buildpacks/blob/master/README.md).


In this topic:

* [What's in this Repo](#whats-in-this-repo)
* [Running locally](#running-locally)
* [The Docs Toolchain](#the-docs-toolchain)
* [Contributing to the Documentation](#contributing-to-the-documentation)
* [Submitting a Pull Request](#submitting-a-pull-request)
* [Determine Content Repos and Branches of a Book](#determine-content-repos-and-branches-of-a-book)
* [Product Variables](#product-variables)

This book uses a centralized layout repository, [docs-layout-repo](https://github.com/pivotal-cf/docs-layout-repo).  
You must clone this repository to run `bookbinder bind local`.

The centralized layout repository is specified as the value of the `layout_repo` key in the `config.yml` file.
Bookbinder uses this centralized layout repository by default,
but files in the book's `master_middleman/source` directory override files
in the centralized layout repository if they have the same name.

## What's in this Repo

Here you'll find the configuration and templates for the Tanzu Buildpacks documentation.

[//]: # "set published eventually to [docs.pivotal.io/tanzu-buildpacks/](http://docs.pivotal.io/tanzu-buildpacks/)."
[//]: # "staging site published to [docs-pcf-staging.cfapps.io/tanzu-buildpacks/](http://Cdocs-pcf-staging.cfapps.io/tanzu-buildpacks)."

This repository *does not* contain the actual documentation content.
Actual content is contained in the topic repositories listed in the `config.yml` file.

The `master_middleman` folder contains the templates used for publishing.

## Running Locally
Clone the following repositories:
* [docs-layout-repo](https://github.com/pivotal-cf/docs-layout-repo)
* [docs-tanzu-buildpacks](https://github.com/pivotal/docs-tanzu-buildpacks)

From the home directory of the docs-book-tanzu-buildpacks repository, run:
```
bundle install
bundle exec bookbinder bind local
cd final_app/
bundle install
bundle exec rackup
```
In a browser, open: http://localhost:9292/tanzu-buildpacks

Alternatively, you can see a live preview of the docs by running:
```
bundle install
bundle exec bookbinder watch
```
In a browser, open: http://localhost:4567/tanzu-buildpacks.

If you you don't see the bound book at the above URL,
make sure you have the required bookbinder dependencies outlined
in the [Bookbinder/Bookbindery](https://github.com/pivotal-cf/bookbinder/blob/master/README.md) readme.

## The Docs Toolchain

The Tanzu documentation is written in markdown and published using the [Bookbinder gem](http://github.com/pivotal-cf/bookbinder) to generate the documentation as a web application with [Middleman](http://middlemanapp.com/).


## Contributing to the Documentation

The docs team prefers to receive documentation contributions as pull requests rather than
having engineering teams push directly to the docs repos.
This gives us a chance to review the changes for consistency and understand the new content.

If you are planning to initiate a large documentation effort,
please coordinate with the docs team in advance to make sure we're not going to step on each other.
You can reach the docs team by email at [cf-docs@pivotal.io](mailto:cf-docs@pivotal.io).

If you are trying to figure out where a particular bit of information should live, please reach out and ask.
We're happy to help you ensure information goes to the right place.

## Submitting a Pull Request

This is a Bookbinder project. See [its README](https://github.com/pivotal-cf/bookbinder/blob/master/README.md) for instructions on how edits are made.


## Determine Content Repos and Branches of a Book

The `config.yml` defines the content repos for each book.
The `config.yml` file of each book contains the list of content repos and branches that appear in the doc set.
In the `config.yml` file, each content repo is specified in the `repository` subsection.
This subsection includes an optional `ref` key-value pair which defines the branch of the content repo the book uses.

Make sure that you are adding your content to the correct branches of the content repos.

To determine which branch of a content repo a book version uses:

1. Confirm that you are on the correct book branch. For example, the currently published doc might be on the `master` branch
or on the branch corresponding to its version number.

2. Open the `config.yml` file.

3. Search for the name of the content repo, for example, `docs-cloudfoundry-concepts`.

4. Review the `repository` subsection for the content repo.
   If there is no `ref:` tag, then the repo uses the master branch.
   If there is a `ref` key-value pair, it specifies the branch name of the content repo.

## Product Variables

Variables for this book are in `config/template_variable.yml`.
Don't make more variables than absolutely necessary.
Minimizing variable usage in this book will make it easier for the engineering team to contribute.

If you need to make more variables, be consistent with variables in other books,
see [Product Variables](https://docs-wiki.cfapps.io/wiki/style/product-variables.html).
