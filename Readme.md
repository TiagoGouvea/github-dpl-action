# Dpl (dee-pee-ell) GitHub Action

This action allows you to deploy using [Dpl](https://github.com/travis-ci/dpl). 

It was built using [dpl v1](https://github.com/travis-ci/dpl/blob/v1/README.md), that is the currently used in production on Travis CI.

## Providers

List of providers already added: 

- [Heroku](https://github.com/travis-ci/dpl/blob/v1/README.md#heroku)

If you want a new provider, open your PR adding the provider params to [action.yml](action.yml), [index.js](index.js) and document it on [readme.md](Readme.md), following the heroku pattern. I will be happy to accept your contribution. :)

## Inputs

| Input          | Required  | Description                                      |
| -------------- | --------- | ------------------------------------------------ |
| `provider`  | `true`    |  The provider you want to deploy to. |
| `base-dir`  | `false`    |  Relative folder from root to mount, could be some like "api" |
| `skip_cleanup` | `false`   |  Prevent from resetting your working directory and deleting all changes made during the build.  |

Every provider has slightly different flags, which are documented in [dpl repository](https://github.com/travis-ci/dpl/blob/v1/README.md).

### Heroku

| Input          | Required  | Description                                      |
| -------------- | --------- | ------------------------------------------------ |
| `app`          | `false`    |  Heroku app name |
| `api-key`      | `false`   |  Heroku api key  |
| `strategy`     | `false`   |  Deployment strategy for Dpl  |
| `username`     | `false`   |  heroku username. Not necessary if api-key is used. Requires git strategy.  |
| `password`     | `false`   |  heroku password. Not necessary if api-key is used. Requires git strategy.  |

## Outputs

| Input        | Description           |
| ------------ | --------------------- |
| `result`  | "Successfully deployed" in case of success |

If `dpl` fail running it will throw an error, and the job will fail. 

## Example 

```
- name: Dpl to heroku
  uses: tiagogouvea/github-dpl-action@master
  with:
    provider: 'heroku'
    app: 'your-heroku-app-name'
    api-key: 'your-66a593c465c7ec9-heroku-api-key'
```