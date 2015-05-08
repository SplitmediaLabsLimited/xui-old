/// <reference path='../_references.ts' />

module internal.utils {

    export class XMLJSON {
        tag: string;
        children: XMLJSON[];
        value: string;

        constructor(xml?: any) {
            if (xml === undefined) {
                return;
            }

            let sxml: string = xml;

            if (xml instanceof XML) {
                sxml = xml.toString();
            }

            // process short ended tags
            sxml = sxml.replace(
                /<([^\s>]+)([^>]+)\/>/g, 
                (match, tagname, attributes) => {
                    return ['<', tagname, attributes, '></', tagname, '>'].join('');
                }
            );

            let container: HTMLElement = document.createElement('div');
            container.innerHTML = sxml;

            let obj: XMLJSON = (function processNode(node: HTMLElement) {
                let nodeJSON: XMLJSON = new XMLJSON();

                nodeJSON.tag = node.tagName.toLowerCase();

                // process attributes
                for (var a = 0; a < node.attributes.length; a++) {
                    let attribute = node.attributes[a];

                    nodeJSON[attribute.name] = attribute.value;
                }

                // process child nodes
                nodeJSON.children = [];

                for (var c = 0; c < node.childNodes.length; c++) {
                    let childNode = node.childNodes[c];

                    if (childNode instanceof HTMLElement) {
                        nodeJSON.children.push(processNode(childNode));
                    }
                }

                // process value
                if (
                    nodeJSON.value === undefined &&
                    nodeJSON.children.length === 0
                ) {
                    delete nodeJSON.children;
                    nodeJSON.value = node.textContent;
                }

                return nodeJSON;
            })(container);

            obj = obj.children[0];

            if (obj !== undefined) {
                this.tag      = obj.tag;
                this.children = obj.children;
                this.value    = obj.value;
            }
        }

        static parse(xml: any): XMLJSON {
            return new XMLJSON(xml);
        }
    }

    export class XML {
        private xml: string;

        private static RESERVED_ATTRIBUTES: RegExp = /^(children|tag|value)$/i; 

        constructor(json?: XMLJSON) {
            let attributes = '';

            if (json.value  === undefined) {
                json.value = '';
            }

            for (let key in json) {
                if (
                    !XML.RESERVED_ATTRIBUTES.test(key) && 
                    json[key] !== undefined
                ) {
                    attributes += [' ', key, '=\'', json[key], '\''].join('');      
                }
            }

            if (json.children === undefined) {
                json.children = [];
            }

            for (var child of json.children) {
                json.value += new XML(child).toString();
            }

            this.xml = ['<', json.tag, attributes, '>', 
                json.value, '</', json.tag, '>'].join('');
        }

        toString() {
            return this.xml;
        }

        static parseJSON(json: XMLJSON): XML {
            return new XML(json);
        }

        static encode(str: string)
        {
            return str.replace(/[&<>'']/g, function($0) {
                return '&' + {
                    '&':  'amp', 
                    '<':  'lt', 
                    '>':  'gt', 
                    '\'': 'quot', 
                    '"':  '#39'
                }[$0] + ';';
            });
        }
    }
}