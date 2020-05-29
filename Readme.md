# Dpl (dee-pee-ell) GitHub Action

This action allows you to deploy using [Dpl](https://github.com/travis-ci/dpl).

## Usage


## Inputs



## Outputs

| Input          | Required  | Description                                      |
| -------------- | --------- | ------------------------------------------------ |
| `provider`  | `true`    |  The provider you want to deploy to. |

Every provider has slightly different flags, which are documented in dpl repository. 

## Example 

```
- name: Dpl to heroku
  uses: tiagogouvea/github-dpl-action@master
  with:
    provider: 'heroku'
    app: "dev-finder-dev"
    api-key: "66a593c4-0ad7-4e0e-a396-8685565c7ec9"
```