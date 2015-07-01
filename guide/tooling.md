# XUI Framework Tools

1. [Generator](#generator)
2. [Recommended IDEs](#ide)

## <a name="generator"></a> XUI Generator

You can use Yeoman to scaffold a skeleton XUI Framework based XSplit plugin project.

### Installation
```shell
npm install -g yo
npm install -g generator-xui
```

### Basic usage
```shell
mkdir YOUR_DIR
cd YOUR_DIR
yo xui
gulp
```

### Using with TypeScript (Recommeded)
_TypeScript has support for autocomplete when using Atom Editor with atom-typescript plugin_
```shell
mkdir YOUR_DIR
cd YOUR_DIR
yo xui:ts
gulp
```

## <a name="ide"></a> Recommended IDE (Editors)

When developing with TypeScript, the following text editors/IDEs (with their typescript plugin) could take advantage of the definition files that we provide. The autocomplete that these IDEs provide could really help in your development.

[Atom](https://atom.io/) ([atom-typescript plugin](https://atom.io/packages/atom-typescript))

[SublimeText](http://www.sublimetext.com/) ([TypeScript plugin](https://github.com/Microsoft/TypeScript-Sublime-Plugin))

[WebStorm](https://www.jetbrains.com/webstorm/)