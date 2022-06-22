# Unicial CLI ![Unicial Logo](css/logo.svg)

[![CI](https://github.com/unicial/cli/actions/workflows/ci.yml/badge.svg?branch=master&event=push)](https://github.com/unicial/cli/actions/workflows/ci.yml)
[![chat on Discord](https://img.shields.io/discord/417796904760639509.svg?logo=discord)](https://discordapp.com/invite/9EcuFgC)

This CLI provides tooling/commands to assist you in the [scenes](https://github.com/unicial-scenes/Awesome-Repository) development process. Some of the commands will help you scaffold a new scene project, locally start and visualize the scene in order to test it and deploy it to a [content server](https://github.com/unicial/catalyst/tree/master/content) to be incorporated in your Unicial parcel.

## Usage

To install the latest version of `unicial` (Unicial CLI), run this command:

```bash
npm install -g unicial
```

To learn what you can do with the CLI run the following command:

```bash
unicial --help
```

See more details at [Unicial docs](https://docs.unicial.org/getting-started/installation-guide).

## Documentation

For details on how to use Unicial developer tools, check our [documentation site](https://docs.unicial.org)

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Install dependencies with `npm install`.
3. Build the project by running `npm run build`.
4. Link the CLI with: `npm link`. The `unicial` command should now be available.
5. You can run tests with `npm test`

**NOTE:** you can set the environment variable `DEBUG=true` to see all debugging info

## Releasing

Just update the version on the `package.json` file and merge to master.

## Configuration

`unicial` can be configured in several ways to adapt it to another environment other than the default one. To do this you have to either set environment variables or change your `~/.unicialinfo` file:

| Variable name            | Enviroment variable | `~/.unicialinfo` |
| ------------------------ | :-----------------: | :--------------: |
| Provider                 |       RPC_URL       |        -         |
| MANA Token Contract      |     MANA_TOKEN      |    MANAToken     |
| LAND Registry Contract   |    LAND_REGISTRY    |   LANDRegistry   |
| Estate Registry Contract |   ESTATE_REGISTRY   |  EstateRegistry  |
| Content Server URL       |     CONTENT_URL     |    contentUrl    |
| Segment API key          |     SEGMENT_KEY     |    segmentKey    |

## Copyright info

This repository is protected with a standard Apache 2 license. See the terms and conditions in the [LICENSE](https://github.com/unicial/cli/blob/master/LICENSE) file.
