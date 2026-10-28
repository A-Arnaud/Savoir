// Generated from Pydantic schemas with Ajv standalone; do not edit.
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// wire.cjs
var require_wire = __commonJS({
  "wire.cjs"(exports) {
    exports.SettingsV1 = validate10;
    var schema11 = { "$defs": { "CommentsSettings": { "additionalProperties": false, "properties": { "tldr": { "default": true, "title": "Tldr", "type": "boolean" } }, "required": ["tldr"], "title": "CommentsSettings", "type": "object" }, "FlexibleSettings": { "additionalProperties": false, "properties": { "focus": { "default": "insightful", "enum": ["insightful", "funny", "actionable", "controversial"], "title": "Focus", "type": "string" }, "format": { "default": "list", "enum": ["list", "qa"], "title": "Format", "type": "string" }, "amount": { "default": "auto", "enum": ["short", "auto", "detailed"], "title": "Amount", "type": "string" }, "emoji": { "default": true, "title": "Emoji", "type": "boolean" }, "highlight": { "default": true, "title": "Highlight", "type": "boolean" }, "grouping": { "default": true, "title": "Grouping", "type": "boolean" } }, "required": ["focus", "format", "amount", "emoji", "highlight", "grouping"], "title": "FlexibleSettings", "type": "object" }, "TimestampedSettings": { "additionalProperties": false, "properties": { "emoji": { "default": true, "title": "Emoji", "type": "boolean" }, "timestamps": { "default": true, "title": "Timestamps", "type": "boolean" }, "details": { "default": true, "title": "Details", "type": "boolean" } }, "required": ["emoji", "timestamps", "details"], "title": "TimestampedSettings", "type": "object" }, "TranscriptSettings": { "additionalProperties": false, "properties": { "timestamps": { "default": true, "title": "Timestamps", "type": "boolean" } }, "required": ["timestamps"], "title": "TranscriptSettings", "type": "object" } }, "additionalProperties": false, "properties": { "schemaVersion": { "const": 1, "default": 1, "title": "Schemaversion", "type": "integer" }, "interfaceLanguage": { "default": "fr", "enum": ["fr", "en"], "title": "Interfacelanguage", "type": "string" }, "outputLanguage": { "default": "EN", "enum": ["EN", "AR", "BG", "BN", "ZH", "CS", "DA", "DE", "ET", "EL", "ES", "FI", "FR", "HE", "HI", "HU", "ID", "IT", "JA", "KO", "LT", "LV", "MS", "NL", "NB", "PL", "PT-BR", "PT-PT", "RO", "RU", "SK", "SL", "SV", "TH", "TR", "TL", "ZH-TW", "UK", "UR", "VI", "ZU"], "title": "Outputlanguage", "type": "string" }, "autoSummary": { "default": false, "title": "Autosummary", "type": "boolean" }, "flexible": { "$ref": "#/$defs/FlexibleSettings" }, "timestamped": { "$ref": "#/$defs/TimestampedSettings" }, "transcript": { "$ref": "#/$defs/TranscriptSettings" }, "comments": { "$ref": "#/$defs/CommentsSettings" } }, "required": ["schemaVersion", "interfaceLanguage", "outputLanguage", "autoSummary", "flexible", "timestamped", "transcript", "comments"], "title": "SettingsV1", "type": "object" };
    var schema12 = { "additionalProperties": false, "properties": { "focus": { "default": "insightful", "enum": ["insightful", "funny", "actionable", "controversial"], "title": "Focus", "type": "string" }, "format": { "default": "list", "enum": ["list", "qa"], "title": "Format", "type": "string" }, "amount": { "default": "auto", "enum": ["short", "auto", "detailed"], "title": "Amount", "type": "string" }, "emoji": { "default": true, "title": "Emoji", "type": "boolean" }, "highlight": { "default": true, "title": "Highlight", "type": "boolean" }, "grouping": { "default": true, "title": "Grouping", "type": "boolean" } }, "required": ["focus", "format", "amount", "emoji", "highlight", "grouping"], "title": "FlexibleSettings", "type": "object" };
    function validate10(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.schemaVersion === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "schemaVersion" }, message: "must have required property 'schemaVersion'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.interfaceLanguage === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "interfaceLanguage" }, message: "must have required property 'interfaceLanguage'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.outputLanguage === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "outputLanguage" }, message: "must have required property 'outputLanguage'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.autoSummary === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "autoSummary" }, message: "must have required property 'autoSummary'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.flexible === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "flexible" }, message: "must have required property 'flexible'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data.timestamped === void 0) {
          const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "timestamped" }, message: "must have required property 'timestamped'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data.transcript === void 0) {
          const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "transcript" }, message: "must have required property 'transcript'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data.comments === void 0) {
          const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "comments" }, message: "must have required property 'comments'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "schemaVersion" || key0 === "interfaceLanguage" || key0 === "outputLanguage" || key0 === "autoSummary" || key0 === "flexible" || key0 === "timestamped" || key0 === "transcript" || key0 === "comments")) {
            const err8 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data.schemaVersion !== void 0) {
          let data0 = data.schemaVersion;
          if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
            const err9 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
          if (1 !== data0) {
            const err10 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/const", keyword: "const", params: { allowedValue: 1 }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data.interfaceLanguage !== void 0) {
          let data1 = data.interfaceLanguage;
          if (typeof data1 !== "string") {
            const err11 = { instancePath: instancePath + "/interfaceLanguage", schemaPath: "#/properties/interfaceLanguage/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
          if (!(data1 === "fr" || data1 === "en")) {
            const err12 = { instancePath: instancePath + "/interfaceLanguage", schemaPath: "#/properties/interfaceLanguage/enum", keyword: "enum", params: { allowedValues: schema11.properties.interfaceLanguage.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        if (data.outputLanguage !== void 0) {
          let data2 = data.outputLanguage;
          if (typeof data2 !== "string") {
            const err13 = { instancePath: instancePath + "/outputLanguage", schemaPath: "#/properties/outputLanguage/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
          if (!(data2 === "EN" || data2 === "AR" || data2 === "BG" || data2 === "BN" || data2 === "ZH" || data2 === "CS" || data2 === "DA" || data2 === "DE" || data2 === "ET" || data2 === "EL" || data2 === "ES" || data2 === "FI" || data2 === "FR" || data2 === "HE" || data2 === "HI" || data2 === "HU" || data2 === "ID" || data2 === "IT" || data2 === "JA" || data2 === "KO" || data2 === "LT" || data2 === "LV" || data2 === "MS" || data2 === "NL" || data2 === "NB" || data2 === "PL" || data2 === "PT-BR" || data2 === "PT-PT" || data2 === "RO" || data2 === "RU" || data2 === "SK" || data2 === "SL" || data2 === "SV" || data2 === "TH" || data2 === "TR" || data2 === "TL" || data2 === "ZH-TW" || data2 === "UK" || data2 === "UR" || data2 === "VI" || data2 === "ZU")) {
            const err14 = { instancePath: instancePath + "/outputLanguage", schemaPath: "#/properties/outputLanguage/enum", keyword: "enum", params: { allowedValues: schema11.properties.outputLanguage.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
        if (data.autoSummary !== void 0) {
          if (typeof data.autoSummary !== "boolean") {
            const err15 = { instancePath: instancePath + "/autoSummary", schemaPath: "#/properties/autoSummary/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data.flexible !== void 0) {
          let data4 = data.flexible;
          if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
            if (data4.focus === void 0) {
              const err16 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "focus" }, message: "must have required property 'focus'" };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
              }
              errors++;
            }
            if (data4.format === void 0) {
              const err17 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "format" }, message: "must have required property 'format'" };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
            if (data4.amount === void 0) {
              const err18 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property 'amount'" };
              if (vErrors === null) {
                vErrors = [err18];
              } else {
                vErrors.push(err18);
              }
              errors++;
            }
            if (data4.emoji === void 0) {
              const err19 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "emoji" }, message: "must have required property 'emoji'" };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            }
            if (data4.highlight === void 0) {
              const err20 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "highlight" }, message: "must have required property 'highlight'" };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
            if (data4.grouping === void 0) {
              const err21 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "grouping" }, message: "must have required property 'grouping'" };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
            for (const key1 in data4) {
              if (!(key1 === "focus" || key1 === "format" || key1 === "amount" || key1 === "emoji" || key1 === "highlight" || key1 === "grouping")) {
                const err22 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err22];
                } else {
                  vErrors.push(err22);
                }
                errors++;
              }
            }
            if (data4.focus !== void 0) {
              let data5 = data4.focus;
              if (typeof data5 !== "string") {
                const err23 = { instancePath: instancePath + "/flexible/focus", schemaPath: "#/$defs/FlexibleSettings/properties/focus/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
              if (!(data5 === "insightful" || data5 === "funny" || data5 === "actionable" || data5 === "controversial")) {
                const err24 = { instancePath: instancePath + "/flexible/focus", schemaPath: "#/$defs/FlexibleSettings/properties/focus/enum", keyword: "enum", params: { allowedValues: schema12.properties.focus.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
            }
            if (data4.format !== void 0) {
              let data6 = data4.format;
              if (typeof data6 !== "string") {
                const err25 = { instancePath: instancePath + "/flexible/format", schemaPath: "#/$defs/FlexibleSettings/properties/format/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
              if (!(data6 === "list" || data6 === "qa")) {
                const err26 = { instancePath: instancePath + "/flexible/format", schemaPath: "#/$defs/FlexibleSettings/properties/format/enum", keyword: "enum", params: { allowedValues: schema12.properties.format.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
            }
            if (data4.amount !== void 0) {
              let data7 = data4.amount;
              if (typeof data7 !== "string") {
                const err27 = { instancePath: instancePath + "/flexible/amount", schemaPath: "#/$defs/FlexibleSettings/properties/amount/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err27];
                } else {
                  vErrors.push(err27);
                }
                errors++;
              }
              if (!(data7 === "short" || data7 === "auto" || data7 === "detailed")) {
                const err28 = { instancePath: instancePath + "/flexible/amount", schemaPath: "#/$defs/FlexibleSettings/properties/amount/enum", keyword: "enum", params: { allowedValues: schema12.properties.amount.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
            }
            if (data4.emoji !== void 0) {
              if (typeof data4.emoji !== "boolean") {
                const err29 = { instancePath: instancePath + "/flexible/emoji", schemaPath: "#/$defs/FlexibleSettings/properties/emoji/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err29];
                } else {
                  vErrors.push(err29);
                }
                errors++;
              }
            }
            if (data4.highlight !== void 0) {
              if (typeof data4.highlight !== "boolean") {
                const err30 = { instancePath: instancePath + "/flexible/highlight", schemaPath: "#/$defs/FlexibleSettings/properties/highlight/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err30];
                } else {
                  vErrors.push(err30);
                }
                errors++;
              }
            }
            if (data4.grouping !== void 0) {
              if (typeof data4.grouping !== "boolean") {
                const err31 = { instancePath: instancePath + "/flexible/grouping", schemaPath: "#/$defs/FlexibleSettings/properties/grouping/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err31];
                } else {
                  vErrors.push(err31);
                }
                errors++;
              }
            }
          } else {
            const err32 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err32];
            } else {
              vErrors.push(err32);
            }
            errors++;
          }
        }
        if (data.timestamped !== void 0) {
          let data11 = data.timestamped;
          if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
            if (data11.emoji === void 0) {
              const err33 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/required", keyword: "required", params: { missingProperty: "emoji" }, message: "must have required property 'emoji'" };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
            if (data11.timestamps === void 0) {
              const err34 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/required", keyword: "required", params: { missingProperty: "timestamps" }, message: "must have required property 'timestamps'" };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
            if (data11.details === void 0) {
              const err35 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/required", keyword: "required", params: { missingProperty: "details" }, message: "must have required property 'details'" };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
            for (const key2 in data11) {
              if (!(key2 === "emoji" || key2 === "timestamps" || key2 === "details")) {
                const err36 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
            if (data11.emoji !== void 0) {
              if (typeof data11.emoji !== "boolean") {
                const err37 = { instancePath: instancePath + "/timestamped/emoji", schemaPath: "#/$defs/TimestampedSettings/properties/emoji/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
            }
            if (data11.timestamps !== void 0) {
              if (typeof data11.timestamps !== "boolean") {
                const err38 = { instancePath: instancePath + "/timestamped/timestamps", schemaPath: "#/$defs/TimestampedSettings/properties/timestamps/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err38];
                } else {
                  vErrors.push(err38);
                }
                errors++;
              }
            }
            if (data11.details !== void 0) {
              if (typeof data11.details !== "boolean") {
                const err39 = { instancePath: instancePath + "/timestamped/details", schemaPath: "#/$defs/TimestampedSettings/properties/details/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err39];
                } else {
                  vErrors.push(err39);
                }
                errors++;
              }
            }
          } else {
            const err40 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err40];
            } else {
              vErrors.push(err40);
            }
            errors++;
          }
        }
        if (data.transcript !== void 0) {
          let data15 = data.transcript;
          if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
            if (data15.timestamps === void 0) {
              const err41 = { instancePath: instancePath + "/transcript", schemaPath: "#/$defs/TranscriptSettings/required", keyword: "required", params: { missingProperty: "timestamps" }, message: "must have required property 'timestamps'" };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
            for (const key3 in data15) {
              if (!(key3 === "timestamps")) {
                const err42 = { instancePath: instancePath + "/transcript", schemaPath: "#/$defs/TranscriptSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err42];
                } else {
                  vErrors.push(err42);
                }
                errors++;
              }
            }
            if (data15.timestamps !== void 0) {
              if (typeof data15.timestamps !== "boolean") {
                const err43 = { instancePath: instancePath + "/transcript/timestamps", schemaPath: "#/$defs/TranscriptSettings/properties/timestamps/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err43];
                } else {
                  vErrors.push(err43);
                }
                errors++;
              }
            }
          } else {
            const err44 = { instancePath: instancePath + "/transcript", schemaPath: "#/$defs/TranscriptSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        if (data.comments !== void 0) {
          let data17 = data.comments;
          if (data17 && typeof data17 == "object" && !Array.isArray(data17)) {
            if (data17.tldr === void 0) {
              const err45 = { instancePath: instancePath + "/comments", schemaPath: "#/$defs/CommentsSettings/required", keyword: "required", params: { missingProperty: "tldr" }, message: "must have required property 'tldr'" };
              if (vErrors === null) {
                vErrors = [err45];
              } else {
                vErrors.push(err45);
              }
              errors++;
            }
            for (const key4 in data17) {
              if (!(key4 === "tldr")) {
                const err46 = { instancePath: instancePath + "/comments", schemaPath: "#/$defs/CommentsSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key4 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err46];
                } else {
                  vErrors.push(err46);
                }
                errors++;
              }
            }
            if (data17.tldr !== void 0) {
              if (typeof data17.tldr !== "boolean") {
                const err47 = { instancePath: instancePath + "/comments/tldr", schemaPath: "#/$defs/CommentsSettings/properties/tldr/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
            }
          } else {
            const err48 = { instancePath: instancePath + "/comments", schemaPath: "#/$defs/CommentsSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err48];
            } else {
              vErrors.push(err48);
            }
            errors++;
          }
        }
      } else {
        const err49 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
      validate10.errors = vErrors;
      return errors === 0;
    }
    exports.JobRequest = validate11;
    var schema16 = { "$defs": { "CommentsSettings": { "additionalProperties": false, "properties": { "tldr": { "default": true, "title": "Tldr", "type": "boolean" } }, "required": ["tldr"], "title": "CommentsSettings", "type": "object" }, "FlexibleSettings": { "additionalProperties": false, "properties": { "focus": { "default": "insightful", "enum": ["insightful", "funny", "actionable", "controversial"], "title": "Focus", "type": "string" }, "format": { "default": "list", "enum": ["list", "qa"], "title": "Format", "type": "string" }, "amount": { "default": "auto", "enum": ["short", "auto", "detailed"], "title": "Amount", "type": "string" }, "emoji": { "default": true, "title": "Emoji", "type": "boolean" }, "highlight": { "default": true, "title": "Highlight", "type": "boolean" }, "grouping": { "default": true, "title": "Grouping", "type": "boolean" } }, "required": ["focus", "format", "amount", "emoji", "highlight", "grouping"], "title": "FlexibleSettings", "type": "object" }, "SettingsV1": { "additionalProperties": false, "properties": { "schemaVersion": { "const": 1, "default": 1, "title": "Schemaversion", "type": "integer" }, "interfaceLanguage": { "default": "fr", "enum": ["fr", "en"], "title": "Interfacelanguage", "type": "string" }, "outputLanguage": { "default": "EN", "enum": ["EN", "AR", "BG", "BN", "ZH", "CS", "DA", "DE", "ET", "EL", "ES", "FI", "FR", "HE", "HI", "HU", "ID", "IT", "JA", "KO", "LT", "LV", "MS", "NL", "NB", "PL", "PT-BR", "PT-PT", "RO", "RU", "SK", "SL", "SV", "TH", "TR", "TL", "ZH-TW", "UK", "UR", "VI", "ZU"], "title": "Outputlanguage", "type": "string" }, "autoSummary": { "default": false, "title": "Autosummary", "type": "boolean" }, "flexible": { "$ref": "#/$defs/FlexibleSettings" }, "timestamped": { "$ref": "#/$defs/TimestampedSettings" }, "transcript": { "$ref": "#/$defs/TranscriptSettings" }, "comments": { "$ref": "#/$defs/CommentsSettings" } }, "required": ["schemaVersion", "interfaceLanguage", "outputLanguage", "autoSummary", "flexible", "timestamped", "transcript", "comments"], "title": "SettingsV1", "type": "object" }, "TimestampedSettings": { "additionalProperties": false, "properties": { "emoji": { "default": true, "title": "Emoji", "type": "boolean" }, "timestamps": { "default": true, "title": "Timestamps", "type": "boolean" }, "details": { "default": true, "title": "Details", "type": "boolean" } }, "required": ["emoji", "timestamps", "details"], "title": "TimestampedSettings", "type": "object" }, "Transcript": { "additionalProperties": false, "properties": { "language": { "title": "Language", "type": "string" }, "source": { "enum": ["import", "manual", "automatic", "audio"], "title": "Source", "type": "string" }, "complete": { "title": "Complete", "type": "boolean" }, "segments": { "items": { "$ref": "#/$defs/TranscriptSegment" }, "title": "Segments", "type": "array" }, "diagnostics": { "items": { "type": "string" }, "title": "Diagnostics", "type": "array" } }, "required": ["language", "source", "complete", "segments", "diagnostics"], "title": "Transcript", "type": "object" }, "TranscriptSegment": { "additionalProperties": false, "properties": { "id": { "title": "Id", "type": "string" }, "startSeconds": { "minimum": 0, "title": "Startseconds", "type": "number" }, "durationSeconds": { "minimum": 0, "title": "Durationseconds", "type": "number" }, "text": { "title": "Text", "type": "string" } }, "required": ["id", "startSeconds", "durationSeconds", "text"], "title": "TranscriptSegment", "type": "object" }, "TranscriptSettings": { "additionalProperties": false, "properties": { "timestamps": { "default": true, "title": "Timestamps", "type": "boolean" } }, "required": ["timestamps"], "title": "TranscriptSettings", "type": "object" }, "VideoContext": { "additionalProperties": false, "properties": { "videoId": { "pattern": "^[A-Za-z0-9_-]{11}$", "title": "Videoid", "type": "string" }, "canonicalUrl": { "pattern": "^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$", "title": "Canonicalurl", "type": "string" }, "title": { "anyOf": [{ "type": "string" }, { "type": "null" }], "default": null, "title": "Title" }, "durationSeconds": { "anyOf": [{ "minimum": 0, "type": "number" }, { "type": "null" }], "default": null, "title": "Durationseconds" }, "navigationRevision": { "minimum": 0, "title": "Navigationrevision", "type": "integer" } }, "required": ["videoId", "canonicalUrl", "title", "durationSeconds", "navigationRevision"], "title": "VideoContext", "type": "object" } }, "additionalProperties": false, "properties": { "video": { "$ref": "#/$defs/VideoContext" }, "kind": { "enum": ["insights", "timestamped", "comments", "transcript"], "title": "Kind", "type": "string" }, "settings": { "$ref": "#/$defs/SettingsV1" }, "providerId": { "const": "ollama", "title": "Providerid", "type": "string" }, "modelId": { "maxLength": 200, "minLength": 1, "title": "Modelid", "type": "string" }, "importedSource": { "anyOf": [{ "$ref": "#/$defs/Transcript" }, { "type": "null" }], "default": null }, "allowAudioFallback": { "default": false, "title": "Allowaudiofallback", "type": "boolean" } }, "required": ["video", "kind", "settings", "providerId", "modelId", "importedSource", "allowAudioFallback"], "title": "JobRequest", "type": "object" };
    var pattern0 = new RegExp("^[A-Za-z0-9_-]{11}$", "u");
    var pattern1 = new RegExp("^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$", "u");
    var schema18 = { "additionalProperties": false, "properties": { "schemaVersion": { "const": 1, "default": 1, "title": "Schemaversion", "type": "integer" }, "interfaceLanguage": { "default": "fr", "enum": ["fr", "en"], "title": "Interfacelanguage", "type": "string" }, "outputLanguage": { "default": "EN", "enum": ["EN", "AR", "BG", "BN", "ZH", "CS", "DA", "DE", "ET", "EL", "ES", "FI", "FR", "HE", "HI", "HU", "ID", "IT", "JA", "KO", "LT", "LV", "MS", "NL", "NB", "PL", "PT-BR", "PT-PT", "RO", "RU", "SK", "SL", "SV", "TH", "TR", "TL", "ZH-TW", "UK", "UR", "VI", "ZU"], "title": "Outputlanguage", "type": "string" }, "autoSummary": { "default": false, "title": "Autosummary", "type": "boolean" }, "flexible": { "$ref": "#/$defs/FlexibleSettings" }, "timestamped": { "$ref": "#/$defs/TimestampedSettings" }, "transcript": { "$ref": "#/$defs/TranscriptSettings" }, "comments": { "$ref": "#/$defs/CommentsSettings" } }, "required": ["schemaVersion", "interfaceLanguage", "outputLanguage", "autoSummary", "flexible", "timestamped", "transcript", "comments"], "title": "SettingsV1", "type": "object" };
    var schema19 = { "additionalProperties": false, "properties": { "focus": { "default": "insightful", "enum": ["insightful", "funny", "actionable", "controversial"], "title": "Focus", "type": "string" }, "format": { "default": "list", "enum": ["list", "qa"], "title": "Format", "type": "string" }, "amount": { "default": "auto", "enum": ["short", "auto", "detailed"], "title": "Amount", "type": "string" }, "emoji": { "default": true, "title": "Emoji", "type": "boolean" }, "highlight": { "default": true, "title": "Highlight", "type": "boolean" }, "grouping": { "default": true, "title": "Grouping", "type": "boolean" } }, "required": ["focus", "format", "amount", "emoji", "highlight", "grouping"], "title": "FlexibleSettings", "type": "object" };
    function validate12(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.schemaVersion === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "schemaVersion" }, message: "must have required property 'schemaVersion'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.interfaceLanguage === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "interfaceLanguage" }, message: "must have required property 'interfaceLanguage'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.outputLanguage === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "outputLanguage" }, message: "must have required property 'outputLanguage'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.autoSummary === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "autoSummary" }, message: "must have required property 'autoSummary'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.flexible === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "flexible" }, message: "must have required property 'flexible'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data.timestamped === void 0) {
          const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "timestamped" }, message: "must have required property 'timestamped'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data.transcript === void 0) {
          const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "transcript" }, message: "must have required property 'transcript'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data.comments === void 0) {
          const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "comments" }, message: "must have required property 'comments'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "schemaVersion" || key0 === "interfaceLanguage" || key0 === "outputLanguage" || key0 === "autoSummary" || key0 === "flexible" || key0 === "timestamped" || key0 === "transcript" || key0 === "comments")) {
            const err8 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data.schemaVersion !== void 0) {
          let data0 = data.schemaVersion;
          if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
            const err9 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
          if (1 !== data0) {
            const err10 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/const", keyword: "const", params: { allowedValue: 1 }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data.interfaceLanguage !== void 0) {
          let data1 = data.interfaceLanguage;
          if (typeof data1 !== "string") {
            const err11 = { instancePath: instancePath + "/interfaceLanguage", schemaPath: "#/properties/interfaceLanguage/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
          if (!(data1 === "fr" || data1 === "en")) {
            const err12 = { instancePath: instancePath + "/interfaceLanguage", schemaPath: "#/properties/interfaceLanguage/enum", keyword: "enum", params: { allowedValues: schema18.properties.interfaceLanguage.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        if (data.outputLanguage !== void 0) {
          let data2 = data.outputLanguage;
          if (typeof data2 !== "string") {
            const err13 = { instancePath: instancePath + "/outputLanguage", schemaPath: "#/properties/outputLanguage/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
          if (!(data2 === "EN" || data2 === "AR" || data2 === "BG" || data2 === "BN" || data2 === "ZH" || data2 === "CS" || data2 === "DA" || data2 === "DE" || data2 === "ET" || data2 === "EL" || data2 === "ES" || data2 === "FI" || data2 === "FR" || data2 === "HE" || data2 === "HI" || data2 === "HU" || data2 === "ID" || data2 === "IT" || data2 === "JA" || data2 === "KO" || data2 === "LT" || data2 === "LV" || data2 === "MS" || data2 === "NL" || data2 === "NB" || data2 === "PL" || data2 === "PT-BR" || data2 === "PT-PT" || data2 === "RO" || data2 === "RU" || data2 === "SK" || data2 === "SL" || data2 === "SV" || data2 === "TH" || data2 === "TR" || data2 === "TL" || data2 === "ZH-TW" || data2 === "UK" || data2 === "UR" || data2 === "VI" || data2 === "ZU")) {
            const err14 = { instancePath: instancePath + "/outputLanguage", schemaPath: "#/properties/outputLanguage/enum", keyword: "enum", params: { allowedValues: schema18.properties.outputLanguage.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
        if (data.autoSummary !== void 0) {
          if (typeof data.autoSummary !== "boolean") {
            const err15 = { instancePath: instancePath + "/autoSummary", schemaPath: "#/properties/autoSummary/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data.flexible !== void 0) {
          let data4 = data.flexible;
          if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
            if (data4.focus === void 0) {
              const err16 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "focus" }, message: "must have required property 'focus'" };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
              }
              errors++;
            }
            if (data4.format === void 0) {
              const err17 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "format" }, message: "must have required property 'format'" };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
            if (data4.amount === void 0) {
              const err18 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property 'amount'" };
              if (vErrors === null) {
                vErrors = [err18];
              } else {
                vErrors.push(err18);
              }
              errors++;
            }
            if (data4.emoji === void 0) {
              const err19 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "emoji" }, message: "must have required property 'emoji'" };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            }
            if (data4.highlight === void 0) {
              const err20 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "highlight" }, message: "must have required property 'highlight'" };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
            if (data4.grouping === void 0) {
              const err21 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "grouping" }, message: "must have required property 'grouping'" };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
            for (const key1 in data4) {
              if (!(key1 === "focus" || key1 === "format" || key1 === "amount" || key1 === "emoji" || key1 === "highlight" || key1 === "grouping")) {
                const err22 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err22];
                } else {
                  vErrors.push(err22);
                }
                errors++;
              }
            }
            if (data4.focus !== void 0) {
              let data5 = data4.focus;
              if (typeof data5 !== "string") {
                const err23 = { instancePath: instancePath + "/flexible/focus", schemaPath: "#/$defs/FlexibleSettings/properties/focus/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
              if (!(data5 === "insightful" || data5 === "funny" || data5 === "actionable" || data5 === "controversial")) {
                const err24 = { instancePath: instancePath + "/flexible/focus", schemaPath: "#/$defs/FlexibleSettings/properties/focus/enum", keyword: "enum", params: { allowedValues: schema19.properties.focus.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
            }
            if (data4.format !== void 0) {
              let data6 = data4.format;
              if (typeof data6 !== "string") {
                const err25 = { instancePath: instancePath + "/flexible/format", schemaPath: "#/$defs/FlexibleSettings/properties/format/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
              if (!(data6 === "list" || data6 === "qa")) {
                const err26 = { instancePath: instancePath + "/flexible/format", schemaPath: "#/$defs/FlexibleSettings/properties/format/enum", keyword: "enum", params: { allowedValues: schema19.properties.format.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
            }
            if (data4.amount !== void 0) {
              let data7 = data4.amount;
              if (typeof data7 !== "string") {
                const err27 = { instancePath: instancePath + "/flexible/amount", schemaPath: "#/$defs/FlexibleSettings/properties/amount/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err27];
                } else {
                  vErrors.push(err27);
                }
                errors++;
              }
              if (!(data7 === "short" || data7 === "auto" || data7 === "detailed")) {
                const err28 = { instancePath: instancePath + "/flexible/amount", schemaPath: "#/$defs/FlexibleSettings/properties/amount/enum", keyword: "enum", params: { allowedValues: schema19.properties.amount.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
            }
            if (data4.emoji !== void 0) {
              if (typeof data4.emoji !== "boolean") {
                const err29 = { instancePath: instancePath + "/flexible/emoji", schemaPath: "#/$defs/FlexibleSettings/properties/emoji/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err29];
                } else {
                  vErrors.push(err29);
                }
                errors++;
              }
            }
            if (data4.highlight !== void 0) {
              if (typeof data4.highlight !== "boolean") {
                const err30 = { instancePath: instancePath + "/flexible/highlight", schemaPath: "#/$defs/FlexibleSettings/properties/highlight/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err30];
                } else {
                  vErrors.push(err30);
                }
                errors++;
              }
            }
            if (data4.grouping !== void 0) {
              if (typeof data4.grouping !== "boolean") {
                const err31 = { instancePath: instancePath + "/flexible/grouping", schemaPath: "#/$defs/FlexibleSettings/properties/grouping/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err31];
                } else {
                  vErrors.push(err31);
                }
                errors++;
              }
            }
          } else {
            const err32 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err32];
            } else {
              vErrors.push(err32);
            }
            errors++;
          }
        }
        if (data.timestamped !== void 0) {
          let data11 = data.timestamped;
          if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
            if (data11.emoji === void 0) {
              const err33 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/required", keyword: "required", params: { missingProperty: "emoji" }, message: "must have required property 'emoji'" };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
            if (data11.timestamps === void 0) {
              const err34 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/required", keyword: "required", params: { missingProperty: "timestamps" }, message: "must have required property 'timestamps'" };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
            if (data11.details === void 0) {
              const err35 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/required", keyword: "required", params: { missingProperty: "details" }, message: "must have required property 'details'" };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
            for (const key2 in data11) {
              if (!(key2 === "emoji" || key2 === "timestamps" || key2 === "details")) {
                const err36 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
            if (data11.emoji !== void 0) {
              if (typeof data11.emoji !== "boolean") {
                const err37 = { instancePath: instancePath + "/timestamped/emoji", schemaPath: "#/$defs/TimestampedSettings/properties/emoji/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
            }
            if (data11.timestamps !== void 0) {
              if (typeof data11.timestamps !== "boolean") {
                const err38 = { instancePath: instancePath + "/timestamped/timestamps", schemaPath: "#/$defs/TimestampedSettings/properties/timestamps/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err38];
                } else {
                  vErrors.push(err38);
                }
                errors++;
              }
            }
            if (data11.details !== void 0) {
              if (typeof data11.details !== "boolean") {
                const err39 = { instancePath: instancePath + "/timestamped/details", schemaPath: "#/$defs/TimestampedSettings/properties/details/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err39];
                } else {
                  vErrors.push(err39);
                }
                errors++;
              }
            }
          } else {
            const err40 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err40];
            } else {
              vErrors.push(err40);
            }
            errors++;
          }
        }
        if (data.transcript !== void 0) {
          let data15 = data.transcript;
          if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
            if (data15.timestamps === void 0) {
              const err41 = { instancePath: instancePath + "/transcript", schemaPath: "#/$defs/TranscriptSettings/required", keyword: "required", params: { missingProperty: "timestamps" }, message: "must have required property 'timestamps'" };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
            for (const key3 in data15) {
              if (!(key3 === "timestamps")) {
                const err42 = { instancePath: instancePath + "/transcript", schemaPath: "#/$defs/TranscriptSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err42];
                } else {
                  vErrors.push(err42);
                }
                errors++;
              }
            }
            if (data15.timestamps !== void 0) {
              if (typeof data15.timestamps !== "boolean") {
                const err43 = { instancePath: instancePath + "/transcript/timestamps", schemaPath: "#/$defs/TranscriptSettings/properties/timestamps/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err43];
                } else {
                  vErrors.push(err43);
                }
                errors++;
              }
            }
          } else {
            const err44 = { instancePath: instancePath + "/transcript", schemaPath: "#/$defs/TranscriptSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        if (data.comments !== void 0) {
          let data17 = data.comments;
          if (data17 && typeof data17 == "object" && !Array.isArray(data17)) {
            if (data17.tldr === void 0) {
              const err45 = { instancePath: instancePath + "/comments", schemaPath: "#/$defs/CommentsSettings/required", keyword: "required", params: { missingProperty: "tldr" }, message: "must have required property 'tldr'" };
              if (vErrors === null) {
                vErrors = [err45];
              } else {
                vErrors.push(err45);
              }
              errors++;
            }
            for (const key4 in data17) {
              if (!(key4 === "tldr")) {
                const err46 = { instancePath: instancePath + "/comments", schemaPath: "#/$defs/CommentsSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key4 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err46];
                } else {
                  vErrors.push(err46);
                }
                errors++;
              }
            }
            if (data17.tldr !== void 0) {
              if (typeof data17.tldr !== "boolean") {
                const err47 = { instancePath: instancePath + "/comments/tldr", schemaPath: "#/$defs/CommentsSettings/properties/tldr/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
            }
          } else {
            const err48 = { instancePath: instancePath + "/comments", schemaPath: "#/$defs/CommentsSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err48];
            } else {
              vErrors.push(err48);
            }
            errors++;
          }
        }
      } else {
        const err49 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
      validate12.errors = vErrors;
      return errors === 0;
    }
    var schema23 = { "additionalProperties": false, "properties": { "language": { "title": "Language", "type": "string" }, "source": { "enum": ["import", "manual", "automatic", "audio"], "title": "Source", "type": "string" }, "complete": { "title": "Complete", "type": "boolean" }, "segments": { "items": { "$ref": "#/$defs/TranscriptSegment" }, "title": "Segments", "type": "array" }, "diagnostics": { "items": { "type": "string" }, "title": "Diagnostics", "type": "array" } }, "required": ["language", "source", "complete", "segments", "diagnostics"], "title": "Transcript", "type": "object" };
    function validate14(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.language === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.source === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "source" }, message: "must have required property 'source'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.complete === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "complete" }, message: "must have required property 'complete'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.segments === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "segments" }, message: "must have required property 'segments'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.diagnostics === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "diagnostics" }, message: "must have required property 'diagnostics'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "language" || key0 === "source" || key0 === "complete" || key0 === "segments" || key0 === "diagnostics")) {
            const err5 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
        if (data.language !== void 0) {
          if (typeof data.language !== "string") {
            const err6 = { instancePath: instancePath + "/language", schemaPath: "#/properties/language/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
        if (data.source !== void 0) {
          let data1 = data.source;
          if (typeof data1 !== "string") {
            const err7 = { instancePath: instancePath + "/source", schemaPath: "#/properties/source/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
          if (!(data1 === "import" || data1 === "manual" || data1 === "automatic" || data1 === "audio")) {
            const err8 = { instancePath: instancePath + "/source", schemaPath: "#/properties/source/enum", keyword: "enum", params: { allowedValues: schema23.properties.source.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data.complete !== void 0) {
          if (typeof data.complete !== "boolean") {
            const err9 = { instancePath: instancePath + "/complete", schemaPath: "#/properties/complete/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        if (data.segments !== void 0) {
          let data3 = data.segments;
          if (Array.isArray(data3)) {
            const len0 = data3.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data4 = data3[i0];
              if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
                if (data4.id === void 0) {
                  const err10 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
                  if (vErrors === null) {
                    vErrors = [err10];
                  } else {
                    vErrors.push(err10);
                  }
                  errors++;
                }
                if (data4.startSeconds === void 0) {
                  const err11 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "startSeconds" }, message: "must have required property 'startSeconds'" };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
                if (data4.durationSeconds === void 0) {
                  const err12 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "durationSeconds" }, message: "must have required property 'durationSeconds'" };
                  if (vErrors === null) {
                    vErrors = [err12];
                  } else {
                    vErrors.push(err12);
                  }
                  errors++;
                }
                if (data4.text === void 0) {
                  const err13 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
                  if (vErrors === null) {
                    vErrors = [err13];
                  } else {
                    vErrors.push(err13);
                  }
                  errors++;
                }
                for (const key1 in data4) {
                  if (!(key1 === "id" || key1 === "startSeconds" || key1 === "durationSeconds" || key1 === "text")) {
                    const err14 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                    if (vErrors === null) {
                      vErrors = [err14];
                    } else {
                      vErrors.push(err14);
                    }
                    errors++;
                  }
                }
                if (data4.id !== void 0) {
                  if (typeof data4.id !== "string") {
                    const err15 = { instancePath: instancePath + "/segments/" + i0 + "/id", schemaPath: "#/$defs/TranscriptSegment/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err15];
                    } else {
                      vErrors.push(err15);
                    }
                    errors++;
                  }
                }
                if (data4.startSeconds !== void 0) {
                  let data6 = data4.startSeconds;
                  if (typeof data6 == "number" && isFinite(data6)) {
                    if (data6 < 0 || isNaN(data6)) {
                      const err16 = { instancePath: instancePath + "/segments/" + i0 + "/startSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/startSeconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                      if (vErrors === null) {
                        vErrors = [err16];
                      } else {
                        vErrors.push(err16);
                      }
                      errors++;
                    }
                  } else {
                    const err17 = { instancePath: instancePath + "/segments/" + i0 + "/startSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/startSeconds/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err17];
                    } else {
                      vErrors.push(err17);
                    }
                    errors++;
                  }
                }
                if (data4.durationSeconds !== void 0) {
                  let data7 = data4.durationSeconds;
                  if (typeof data7 == "number" && isFinite(data7)) {
                    if (data7 < 0 || isNaN(data7)) {
                      const err18 = { instancePath: instancePath + "/segments/" + i0 + "/durationSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/durationSeconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                      if (vErrors === null) {
                        vErrors = [err18];
                      } else {
                        vErrors.push(err18);
                      }
                      errors++;
                    }
                  } else {
                    const err19 = { instancePath: instancePath + "/segments/" + i0 + "/durationSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/durationSeconds/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err19];
                    } else {
                      vErrors.push(err19);
                    }
                    errors++;
                  }
                }
                if (data4.text !== void 0) {
                  if (typeof data4.text !== "string") {
                    const err20 = { instancePath: instancePath + "/segments/" + i0 + "/text", schemaPath: "#/$defs/TranscriptSegment/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err20];
                    } else {
                      vErrors.push(err20);
                    }
                    errors++;
                  }
                }
              } else {
                const err21 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
            }
          } else {
            const err22 = { instancePath: instancePath + "/segments", schemaPath: "#/properties/segments/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
        }
        if (data.diagnostics !== void 0) {
          let data9 = data.diagnostics;
          if (Array.isArray(data9)) {
            const len1 = data9.length;
            for (let i1 = 0; i1 < len1; i1++) {
              if (typeof data9[i1] !== "string") {
                const err23 = { instancePath: instancePath + "/diagnostics/" + i1, schemaPath: "#/properties/diagnostics/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
            }
          } else {
            const err24 = { instancePath: instancePath + "/diagnostics", schemaPath: "#/properties/diagnostics/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
            }
            errors++;
          }
        }
      } else {
        const err25 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
      validate14.errors = vErrors;
      return errors === 0;
    }
    var func2 = require_ucs2length().default;
    function validate11(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.video === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "video" }, message: "must have required property 'video'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.kind === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.settings === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "settings" }, message: "must have required property 'settings'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.providerId === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "providerId" }, message: "must have required property 'providerId'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.modelId === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "modelId" }, message: "must have required property 'modelId'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data.importedSource === void 0) {
          const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "importedSource" }, message: "must have required property 'importedSource'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data.allowAudioFallback === void 0) {
          const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "allowAudioFallback" }, message: "must have required property 'allowAudioFallback'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "video" || key0 === "kind" || key0 === "settings" || key0 === "providerId" || key0 === "modelId" || key0 === "importedSource" || key0 === "allowAudioFallback")) {
            const err7 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
        }
        if (data.video !== void 0) {
          let data0 = data.video;
          if (data0 && typeof data0 == "object" && !Array.isArray(data0)) {
            if (data0.videoId === void 0) {
              const err8 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "videoId" }, message: "must have required property 'videoId'" };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
            if (data0.canonicalUrl === void 0) {
              const err9 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "canonicalUrl" }, message: "must have required property 'canonicalUrl'" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
            if (data0.title === void 0) {
              const err10 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "title" }, message: "must have required property 'title'" };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
            if (data0.durationSeconds === void 0) {
              const err11 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "durationSeconds" }, message: "must have required property 'durationSeconds'" };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
            if (data0.navigationRevision === void 0) {
              const err12 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "navigationRevision" }, message: "must have required property 'navigationRevision'" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
            for (const key1 in data0) {
              if (!(key1 === "videoId" || key1 === "canonicalUrl" || key1 === "title" || key1 === "durationSeconds" || key1 === "navigationRevision")) {
                const err13 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err13];
                } else {
                  vErrors.push(err13);
                }
                errors++;
              }
            }
            if (data0.videoId !== void 0) {
              let data1 = data0.videoId;
              if (typeof data1 === "string") {
                if (!pattern0.test(data1)) {
                  const err14 = { instancePath: instancePath + "/video/videoId", schemaPath: "#/$defs/VideoContext/properties/videoId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{11}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{11}$"' };
                  if (vErrors === null) {
                    vErrors = [err14];
                  } else {
                    vErrors.push(err14);
                  }
                  errors++;
                }
              } else {
                const err15 = { instancePath: instancePath + "/video/videoId", schemaPath: "#/$defs/VideoContext/properties/videoId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err15];
                } else {
                  vErrors.push(err15);
                }
                errors++;
              }
            }
            if (data0.canonicalUrl !== void 0) {
              let data2 = data0.canonicalUrl;
              if (typeof data2 === "string") {
                if (!pattern1.test(data2)) {
                  const err16 = { instancePath: instancePath + "/video/canonicalUrl", schemaPath: "#/$defs/VideoContext/properties/canonicalUrl/pattern", keyword: "pattern", params: { pattern: "^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$" }, message: 'must match pattern "^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$"' };
                  if (vErrors === null) {
                    vErrors = [err16];
                  } else {
                    vErrors.push(err16);
                  }
                  errors++;
                }
              } else {
                const err17 = { instancePath: instancePath + "/video/canonicalUrl", schemaPath: "#/$defs/VideoContext/properties/canonicalUrl/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err17];
                } else {
                  vErrors.push(err17);
                }
                errors++;
              }
            }
            if (data0.title !== void 0) {
              let data3 = data0.title;
              const _errs11 = errors;
              let valid3 = false;
              const _errs12 = errors;
              if (typeof data3 !== "string") {
                const err18 = { instancePath: instancePath + "/video/title", schemaPath: "#/$defs/VideoContext/properties/title/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
              }
              var _valid0 = _errs12 === errors;
              valid3 = valid3 || _valid0;
              if (!valid3) {
                const _errs14 = errors;
                if (data3 !== null) {
                  const err19 = { instancePath: instancePath + "/video/title", schemaPath: "#/$defs/VideoContext/properties/title/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err19];
                  } else {
                    vErrors.push(err19);
                  }
                  errors++;
                }
                var _valid0 = _errs14 === errors;
                valid3 = valid3 || _valid0;
              }
              if (!valid3) {
                const err20 = { instancePath: instancePath + "/video/title", schemaPath: "#/$defs/VideoContext/properties/title/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err20];
                } else {
                  vErrors.push(err20);
                }
                errors++;
              } else {
                errors = _errs11;
                if (vErrors !== null) {
                  if (_errs11) {
                    vErrors.length = _errs11;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data0.durationSeconds !== void 0) {
              let data4 = data0.durationSeconds;
              const _errs17 = errors;
              let valid4 = false;
              const _errs18 = errors;
              if (typeof data4 == "number" && isFinite(data4)) {
                if (data4 < 0 || isNaN(data4)) {
                  const err21 = { instancePath: instancePath + "/video/durationSeconds", schemaPath: "#/$defs/VideoContext/properties/durationSeconds/anyOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err21];
                  } else {
                    vErrors.push(err21);
                  }
                  errors++;
                }
              } else {
                const err22 = { instancePath: instancePath + "/video/durationSeconds", schemaPath: "#/$defs/VideoContext/properties/durationSeconds/anyOf/0/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err22];
                } else {
                  vErrors.push(err22);
                }
                errors++;
              }
              var _valid1 = _errs18 === errors;
              valid4 = valid4 || _valid1;
              if (!valid4) {
                const _errs20 = errors;
                if (data4 !== null) {
                  const err23 = { instancePath: instancePath + "/video/durationSeconds", schemaPath: "#/$defs/VideoContext/properties/durationSeconds/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err23];
                  } else {
                    vErrors.push(err23);
                  }
                  errors++;
                }
                var _valid1 = _errs20 === errors;
                valid4 = valid4 || _valid1;
              }
              if (!valid4) {
                const err24 = { instancePath: instancePath + "/video/durationSeconds", schemaPath: "#/$defs/VideoContext/properties/durationSeconds/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              } else {
                errors = _errs17;
                if (vErrors !== null) {
                  if (_errs17) {
                    vErrors.length = _errs17;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data0.navigationRevision !== void 0) {
              let data5 = data0.navigationRevision;
              if (!(typeof data5 == "number" && (!(data5 % 1) && !isNaN(data5)) && isFinite(data5))) {
                const err25 = { instancePath: instancePath + "/video/navigationRevision", schemaPath: "#/$defs/VideoContext/properties/navigationRevision/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
              if (typeof data5 == "number" && isFinite(data5)) {
                if (data5 < 0 || isNaN(data5)) {
                  const err26 = { instancePath: instancePath + "/video/navigationRevision", schemaPath: "#/$defs/VideoContext/properties/navigationRevision/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err26];
                  } else {
                    vErrors.push(err26);
                  }
                  errors++;
                }
              }
            }
          } else {
            const err27 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
        if (data.kind !== void 0) {
          let data6 = data.kind;
          if (typeof data6 !== "string") {
            const err28 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err28];
            } else {
              vErrors.push(err28);
            }
            errors++;
          }
          if (!(data6 === "insights" || data6 === "timestamped" || data6 === "comments" || data6 === "transcript")) {
            const err29 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema16.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err29];
            } else {
              vErrors.push(err29);
            }
            errors++;
          }
        }
        if (data.settings !== void 0) {
          if (!validate12(data.settings, { instancePath: instancePath + "/settings", parentData: data, parentDataProperty: "settings", rootData })) {
            vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
            errors = vErrors.length;
          }
        }
        if (data.providerId !== void 0) {
          let data8 = data.providerId;
          if (typeof data8 !== "string") {
            const err30 = { instancePath: instancePath + "/providerId", schemaPath: "#/properties/providerId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err30];
            } else {
              vErrors.push(err30);
            }
            errors++;
          }
          if ("ollama" !== data8) {
            const err31 = { instancePath: instancePath + "/providerId", schemaPath: "#/properties/providerId/const", keyword: "const", params: { allowedValue: "ollama" }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err31];
            } else {
              vErrors.push(err31);
            }
            errors++;
          }
        }
        if (data.modelId !== void 0) {
          let data9 = data.modelId;
          if (typeof data9 === "string") {
            if (func2(data9) > 200) {
              const err32 = { instancePath: instancePath + "/modelId", schemaPath: "#/properties/modelId/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
            if (func2(data9) < 1) {
              const err33 = { instancePath: instancePath + "/modelId", schemaPath: "#/properties/modelId/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
          } else {
            const err34 = { instancePath: instancePath + "/modelId", schemaPath: "#/properties/modelId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err34];
            } else {
              vErrors.push(err34);
            }
            errors++;
          }
        }
        if (data.importedSource !== void 0) {
          let data10 = data.importedSource;
          const _errs32 = errors;
          let valid5 = false;
          const _errs33 = errors;
          if (!validate14(data10, { instancePath: instancePath + "/importedSource", parentData: data, parentDataProperty: "importedSource", rootData })) {
            vErrors = vErrors === null ? validate14.errors : vErrors.concat(validate14.errors);
            errors = vErrors.length;
          }
          var _valid2 = _errs33 === errors;
          valid5 = valid5 || _valid2;
          if (!valid5) {
            const _errs34 = errors;
            if (data10 !== null) {
              const err35 = { instancePath: instancePath + "/importedSource", schemaPath: "#/properties/importedSource/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
            var _valid2 = _errs34 === errors;
            valid5 = valid5 || _valid2;
          }
          if (!valid5) {
            const err36 = { instancePath: instancePath + "/importedSource", schemaPath: "#/properties/importedSource/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err36];
            } else {
              vErrors.push(err36);
            }
            errors++;
          } else {
            errors = _errs32;
            if (vErrors !== null) {
              if (_errs32) {
                vErrors.length = _errs32;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data.allowAudioFallback !== void 0) {
          if (typeof data.allowAudioFallback !== "boolean") {
            const err37 = { instancePath: instancePath + "/allowAudioFallback", schemaPath: "#/properties/allowAudioFallback/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err37];
            } else {
              vErrors.push(err37);
            }
            errors++;
          }
        }
      } else {
        const err38 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
      validate11.errors = vErrors;
      return errors === 0;
    }
    exports.JobSnapshot = validate16;
    var schema25 = { "$defs": { "Comment": { "additionalProperties": false, "properties": { "id": { "maxLength": 256, "minLength": 1, "title": "Id", "type": "string" }, "author": { "anyOf": [{ "type": "string" }, { "type": "null" }], "default": null, "title": "Author" }, "text": { "title": "Text", "type": "string" }, "authorUrl": { "anyOf": [{ "pattern": "^https://(?:www\\.)?youtube\\.com/", "type": "string" }, { "type": "null" }], "default": null, "title": "Authorurl" }, "likes": { "anyOf": [{ "minimum": 0, "type": "integer" }, { "type": "null" }], "default": null, "title": "Likes" }, "startSeconds": { "anyOf": [{ "minimum": 0, "type": "number" }, { "type": "null" }], "default": null, "title": "Startseconds" }, "sourceUrl": { "anyOf": [{ "pattern": "^https://(?:www\\.)?youtube\\.com/", "type": "string" }, { "type": "null" }], "default": null, "title": "Sourceurl" } }, "required": ["id", "author", "text", "authorUrl", "likes", "startSeconds", "sourceUrl"], "title": "Comment", "type": "object" }, "CommentCollection": { "additionalProperties": false, "properties": { "fetchedCount": { "minimum": 0, "title": "Fetchedcount", "type": "integer" }, "complete": { "title": "Complete", "type": "boolean" }, "diagnostics": { "items": { "type": "string" }, "title": "Diagnostics", "type": "array" }, "announcedCount": { "anyOf": [{ "minimum": 0, "type": "integer" }, { "type": "null" }], "default": null, "title": "Announcedcount" } }, "required": ["fetchedCount", "complete", "diagnostics", "announcedCount"], "title": "CommentCollection", "type": "object" }, "CommentsResult": { "additionalProperties": false, "properties": { "kind": { "const": "comments", "default": "comments", "title": "Kind", "type": "string" }, "tldr": { "anyOf": [{ "type": "string" }, { "type": "null" }], "default": null, "title": "Tldr" }, "comments": { "items": { "$ref": "#/$defs/Comment" }, "title": "Comments", "type": "array" }, "collection": { "$ref": "#/$defs/CommentCollection" }, "language": { "title": "Language", "type": "string" }, "provenance": { "anyOf": [{ "$ref": "#/$defs/Provenance" }, { "type": "null" }], "default": null } }, "required": ["kind", "tldr", "comments", "collection", "language", "provenance"], "title": "CommentsResult", "type": "object" }, "CommentsSettings": { "additionalProperties": false, "properties": { "tldr": { "default": true, "title": "Tldr", "type": "boolean" } }, "required": ["tldr"], "title": "CommentsSettings", "type": "object" }, "FlexibleSettings": { "additionalProperties": false, "properties": { "focus": { "default": "insightful", "enum": ["insightful", "funny", "actionable", "controversial"], "title": "Focus", "type": "string" }, "format": { "default": "list", "enum": ["list", "qa"], "title": "Format", "type": "string" }, "amount": { "default": "auto", "enum": ["short", "auto", "detailed"], "title": "Amount", "type": "string" }, "emoji": { "default": true, "title": "Emoji", "type": "boolean" }, "highlight": { "default": true, "title": "Highlight", "type": "boolean" }, "grouping": { "default": true, "title": "Grouping", "type": "boolean" } }, "required": ["focus", "format", "amount", "emoji", "highlight", "grouping"], "title": "FlexibleSettings", "type": "object" }, "InsightGroup": { "additionalProperties": false, "properties": { "id": { "title": "Id", "type": "string" }, "title": { "anyOf": [{ "type": "string" }, { "type": "null" }], "default": null, "title": "Title" }, "items": { "items": { "$ref": "#/$defs/InsightItem" }, "title": "Items", "type": "array" } }, "required": ["id", "title", "items"], "title": "InsightGroup", "type": "object" }, "InsightItem": { "additionalProperties": false, "properties": { "id": { "title": "Id", "type": "string" }, "text": { "title": "Text", "type": "string" }, "sourceSegmentIds": { "items": { "type": "string" }, "title": "Sourcesegmentids", "type": "array" } }, "required": ["id", "text", "sourceSegmentIds"], "title": "InsightItem", "type": "object" }, "InsightsResult": { "additionalProperties": false, "properties": { "kind": { "const": "insights", "default": "insights", "title": "Kind", "type": "string" }, "groups": { "items": { "$ref": "#/$defs/InsightGroup" }, "title": "Groups", "type": "array" }, "language": { "title": "Language", "type": "string" }, "provenance": { "$ref": "#/$defs/Provenance" }, "sources": { "anyOf": [{ "items": { "$ref": "#/$defs/TranscriptSegment" }, "type": "array" }, { "type": "null" }], "title": "Sources" } }, "required": ["kind", "groups", "language", "provenance"], "title": "InsightsResult", "type": "object" }, "JobError": { "additionalProperties": false, "properties": { "code": { "title": "Code", "type": "string" }, "message": { "title": "Message", "type": "string" } }, "required": ["code", "message"], "title": "JobError", "type": "object" }, "Provenance": { "additionalProperties": false, "properties": { "providerId": { "title": "Providerid", "type": "string" }, "modelId": { "title": "Modelid", "type": "string" }, "promptVersion": { "title": "Promptversion", "type": "string" }, "modelDigest": { "anyOf": [{ "type": "string" }, { "type": "null" }], "default": null, "title": "Modeldigest" }, "sourceHash": { "anyOf": [{ "type": "string" }, { "type": "null" }], "default": null, "title": "Sourcehash" } }, "required": ["providerId", "modelId", "promptVersion", "modelDigest", "sourceHash"], "title": "Provenance", "type": "object" }, "SettingsV1": { "additionalProperties": false, "properties": { "schemaVersion": { "const": 1, "default": 1, "title": "Schemaversion", "type": "integer" }, "interfaceLanguage": { "default": "fr", "enum": ["fr", "en"], "title": "Interfacelanguage", "type": "string" }, "outputLanguage": { "default": "EN", "enum": ["EN", "AR", "BG", "BN", "ZH", "CS", "DA", "DE", "ET", "EL", "ES", "FI", "FR", "HE", "HI", "HU", "ID", "IT", "JA", "KO", "LT", "LV", "MS", "NL", "NB", "PL", "PT-BR", "PT-PT", "RO", "RU", "SK", "SL", "SV", "TH", "TR", "TL", "ZH-TW", "UK", "UR", "VI", "ZU"], "title": "Outputlanguage", "type": "string" }, "autoSummary": { "default": false, "title": "Autosummary", "type": "boolean" }, "flexible": { "$ref": "#/$defs/FlexibleSettings" }, "timestamped": { "$ref": "#/$defs/TimestampedSettings" }, "transcript": { "$ref": "#/$defs/TranscriptSettings" }, "comments": { "$ref": "#/$defs/CommentsSettings" } }, "required": ["schemaVersion", "interfaceLanguage", "outputLanguage", "autoSummary", "flexible", "timestamped", "transcript", "comments"], "title": "SettingsV1", "type": "object" }, "TimestampedResult": { "additionalProperties": false, "properties": { "kind": { "const": "timestamped", "default": "timestamped", "title": "Kind", "type": "string" }, "overview": { "title": "Overview", "type": "string" }, "sections": { "items": { "$ref": "#/$defs/TimestampedSection" }, "title": "Sections", "type": "array" }, "language": { "title": "Language", "type": "string" }, "provenance": { "$ref": "#/$defs/Provenance" } }, "required": ["kind", "overview", "sections", "language", "provenance"], "title": "TimestampedResult", "type": "object" }, "TimestampedSection": { "additionalProperties": false, "properties": { "id": { "title": "Id", "type": "string" }, "startSeconds": { "minimum": 0, "title": "Startseconds", "type": "number" }, "title": { "title": "Title", "type": "string" }, "summary": { "title": "Summary", "type": "string" }, "details": { "items": { "type": "string" }, "title": "Details", "type": "array" }, "sourceSegmentIds": { "items": { "type": "string" }, "title": "Sourcesegmentids", "type": "array" } }, "required": ["id", "startSeconds", "title", "summary", "details", "sourceSegmentIds"], "title": "TimestampedSection", "type": "object" }, "TimestampedSettings": { "additionalProperties": false, "properties": { "emoji": { "default": true, "title": "Emoji", "type": "boolean" }, "timestamps": { "default": true, "title": "Timestamps", "type": "boolean" }, "details": { "default": true, "title": "Details", "type": "boolean" } }, "required": ["emoji", "timestamps", "details"], "title": "TimestampedSettings", "type": "object" }, "Transcript": { "additionalProperties": false, "properties": { "language": { "title": "Language", "type": "string" }, "source": { "enum": ["import", "manual", "automatic", "audio"], "title": "Source", "type": "string" }, "complete": { "title": "Complete", "type": "boolean" }, "segments": { "items": { "$ref": "#/$defs/TranscriptSegment" }, "title": "Segments", "type": "array" }, "diagnostics": { "items": { "type": "string" }, "title": "Diagnostics", "type": "array" } }, "required": ["language", "source", "complete", "segments", "diagnostics"], "title": "Transcript", "type": "object" }, "TranscriptResult": { "additionalProperties": false, "properties": { "kind": { "const": "transcript", "default": "transcript", "title": "Kind", "type": "string" }, "transcript": { "$ref": "#/$defs/Transcript" } }, "required": ["kind", "transcript"], "title": "TranscriptResult", "type": "object" }, "TranscriptSegment": { "additionalProperties": false, "properties": { "id": { "title": "Id", "type": "string" }, "startSeconds": { "minimum": 0, "title": "Startseconds", "type": "number" }, "durationSeconds": { "minimum": 0, "title": "Durationseconds", "type": "number" }, "text": { "title": "Text", "type": "string" } }, "required": ["id", "startSeconds", "durationSeconds", "text"], "title": "TranscriptSegment", "type": "object" }, "TranscriptSettings": { "additionalProperties": false, "properties": { "timestamps": { "default": true, "title": "Timestamps", "type": "boolean" } }, "required": ["timestamps"], "title": "TranscriptSettings", "type": "object" }, "VideoContext": { "additionalProperties": false, "properties": { "videoId": { "pattern": "^[A-Za-z0-9_-]{11}$", "title": "Videoid", "type": "string" }, "canonicalUrl": { "pattern": "^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$", "title": "Canonicalurl", "type": "string" }, "title": { "anyOf": [{ "type": "string" }, { "type": "null" }], "default": null, "title": "Title" }, "durationSeconds": { "anyOf": [{ "minimum": 0, "type": "number" }, { "type": "null" }], "default": null, "title": "Durationseconds" }, "navigationRevision": { "minimum": 0, "title": "Navigationrevision", "type": "integer" } }, "required": ["videoId", "canonicalUrl", "title", "durationSeconds", "navigationRevision"], "title": "VideoContext", "type": "object" } }, "additionalProperties": false, "properties": { "id": { "title": "Id", "type": "string" }, "video": { "$ref": "#/$defs/VideoContext" }, "state": { "enum": ["queued", "running", "completed", "failed", "cancelled", "interrupted"], "title": "State", "type": "string" }, "stage": { "title": "Stage", "type": "string" }, "completed": { "default": 0, "minimum": 0, "title": "Completed", "type": "integer" }, "total": { "anyOf": [{ "minimum": 0, "type": "integer" }, { "type": "null" }], "default": null, "title": "Total" }, "revision": { "default": 0, "minimum": 0, "title": "Revision", "type": "integer" }, "result": { "anyOf": [{ "$ref": "#/$defs/InsightsResult" }, { "$ref": "#/$defs/TimestampedResult" }, { "$ref": "#/$defs/CommentsResult" }, { "$ref": "#/$defs/TranscriptResult" }, { "type": "null" }], "default": null, "title": "Result" }, "error": { "anyOf": [{ "$ref": "#/$defs/JobError" }, { "type": "null" }], "default": null }, "requestSettings": { "anyOf": [{ "$ref": "#/$defs/SettingsV1" }, { "type": "null" }] }, "modelId": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Modelid" } }, "required": ["id", "video", "state", "stage", "completed", "total", "revision", "result", "error"], "title": "JobSnapshot", "type": "object" };
    var func4 = Object.prototype.hasOwnProperty;
    function validate18(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.id === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.title === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "title" }, message: "must have required property 'title'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.items === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "items" }, message: "must have required property 'items'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "id" || key0 === "title" || key0 === "items")) {
            const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err3];
            } else {
              vErrors.push(err3);
            }
            errors++;
          }
        }
        if (data.id !== void 0) {
          if (typeof data.id !== "string") {
            const err4 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
        if (data.title !== void 0) {
          let data1 = data.title;
          const _errs5 = errors;
          let valid1 = false;
          const _errs6 = errors;
          if (typeof data1 !== "string") {
            const err5 = { instancePath: instancePath + "/title", schemaPath: "#/properties/title/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
          var _valid0 = _errs6 === errors;
          valid1 = valid1 || _valid0;
          if (!valid1) {
            const _errs8 = errors;
            if (data1 !== null) {
              const err6 = { instancePath: instancePath + "/title", schemaPath: "#/properties/title/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err6];
              } else {
                vErrors.push(err6);
              }
              errors++;
            }
            var _valid0 = _errs8 === errors;
            valid1 = valid1 || _valid0;
          }
          if (!valid1) {
            const err7 = { instancePath: instancePath + "/title", schemaPath: "#/properties/title/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          } else {
            errors = _errs5;
            if (vErrors !== null) {
              if (_errs5) {
                vErrors.length = _errs5;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data.items !== void 0) {
          let data2 = data.items;
          if (Array.isArray(data2)) {
            const len0 = data2.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data3 = data2[i0];
              if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
                if (data3.id === void 0) {
                  const err8 = { instancePath: instancePath + "/items/" + i0, schemaPath: "#/$defs/InsightItem/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
                  if (vErrors === null) {
                    vErrors = [err8];
                  } else {
                    vErrors.push(err8);
                  }
                  errors++;
                }
                if (data3.text === void 0) {
                  const err9 = { instancePath: instancePath + "/items/" + i0, schemaPath: "#/$defs/InsightItem/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
                  if (vErrors === null) {
                    vErrors = [err9];
                  } else {
                    vErrors.push(err9);
                  }
                  errors++;
                }
                if (data3.sourceSegmentIds === void 0) {
                  const err10 = { instancePath: instancePath + "/items/" + i0, schemaPath: "#/$defs/InsightItem/required", keyword: "required", params: { missingProperty: "sourceSegmentIds" }, message: "must have required property 'sourceSegmentIds'" };
                  if (vErrors === null) {
                    vErrors = [err10];
                  } else {
                    vErrors.push(err10);
                  }
                  errors++;
                }
                for (const key1 in data3) {
                  if (!(key1 === "id" || key1 === "text" || key1 === "sourceSegmentIds")) {
                    const err11 = { instancePath: instancePath + "/items/" + i0, schemaPath: "#/$defs/InsightItem/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                    if (vErrors === null) {
                      vErrors = [err11];
                    } else {
                      vErrors.push(err11);
                    }
                    errors++;
                  }
                }
                if (data3.id !== void 0) {
                  if (typeof data3.id !== "string") {
                    const err12 = { instancePath: instancePath + "/items/" + i0 + "/id", schemaPath: "#/$defs/InsightItem/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err12];
                    } else {
                      vErrors.push(err12);
                    }
                    errors++;
                  }
                }
                if (data3.text !== void 0) {
                  if (typeof data3.text !== "string") {
                    const err13 = { instancePath: instancePath + "/items/" + i0 + "/text", schemaPath: "#/$defs/InsightItem/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err13];
                    } else {
                      vErrors.push(err13);
                    }
                    errors++;
                  }
                }
                if (data3.sourceSegmentIds !== void 0) {
                  let data6 = data3.sourceSegmentIds;
                  if (Array.isArray(data6)) {
                    const len1 = data6.length;
                    for (let i1 = 0; i1 < len1; i1++) {
                      if (typeof data6[i1] !== "string") {
                        const err14 = { instancePath: instancePath + "/items/" + i0 + "/sourceSegmentIds/" + i1, schemaPath: "#/$defs/InsightItem/properties/sourceSegmentIds/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err14];
                        } else {
                          vErrors.push(err14);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err15 = { instancePath: instancePath + "/items/" + i0 + "/sourceSegmentIds", schemaPath: "#/$defs/InsightItem/properties/sourceSegmentIds/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                    if (vErrors === null) {
                      vErrors = [err15];
                    } else {
                      vErrors.push(err15);
                    }
                    errors++;
                  }
                }
              } else {
                const err16 = { instancePath: instancePath + "/items/" + i0, schemaPath: "#/$defs/InsightItem/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
            }
          } else {
            const err17 = { instancePath: instancePath + "/items", schemaPath: "#/properties/items/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err17];
            } else {
              vErrors.push(err17);
            }
            errors++;
          }
        }
      } else {
        const err18 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
      validate18.errors = vErrors;
      return errors === 0;
    }
    function validate17(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.kind === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.groups === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "groups" }, message: "must have required property 'groups'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.language === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.provenance === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "provenance" }, message: "must have required property 'provenance'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "kind" || key0 === "groups" || key0 === "language" || key0 === "provenance" || key0 === "sources")) {
            const err4 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
        if (data.kind !== void 0) {
          let data0 = data.kind;
          if (typeof data0 !== "string") {
            const err5 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
          if ("insights" !== data0) {
            const err6 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "insights" }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
        if (data.groups !== void 0) {
          let data1 = data.groups;
          if (Array.isArray(data1)) {
            const len0 = data1.length;
            for (let i0 = 0; i0 < len0; i0++) {
              if (!validate18(data1[i0], { instancePath: instancePath + "/groups/" + i0, parentData: data1, parentDataProperty: i0, rootData })) {
                vErrors = vErrors === null ? validate18.errors : vErrors.concat(validate18.errors);
                errors = vErrors.length;
              }
            }
          } else {
            const err7 = { instancePath: instancePath + "/groups", schemaPath: "#/properties/groups/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
        }
        if (data.language !== void 0) {
          if (typeof data.language !== "string") {
            const err8 = { instancePath: instancePath + "/language", schemaPath: "#/properties/language/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data.provenance !== void 0) {
          let data4 = data.provenance;
          if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
            if (data4.providerId === void 0) {
              const err9 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "providerId" }, message: "must have required property 'providerId'" };
              if (vErrors === null) {
                vErrors = [err9];
              } else {
                vErrors.push(err9);
              }
              errors++;
            }
            if (data4.modelId === void 0) {
              const err10 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "modelId" }, message: "must have required property 'modelId'" };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
            if (data4.promptVersion === void 0) {
              const err11 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "promptVersion" }, message: "must have required property 'promptVersion'" };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
            if (data4.modelDigest === void 0) {
              const err12 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "modelDigest" }, message: "must have required property 'modelDigest'" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
            if (data4.sourceHash === void 0) {
              const err13 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "sourceHash" }, message: "must have required property 'sourceHash'" };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
            for (const key1 in data4) {
              if (!(key1 === "providerId" || key1 === "modelId" || key1 === "promptVersion" || key1 === "modelDigest" || key1 === "sourceHash")) {
                const err14 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err14];
                } else {
                  vErrors.push(err14);
                }
                errors++;
              }
            }
            if (data4.providerId !== void 0) {
              if (typeof data4.providerId !== "string") {
                const err15 = { instancePath: instancePath + "/provenance/providerId", schemaPath: "#/$defs/Provenance/properties/providerId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err15];
                } else {
                  vErrors.push(err15);
                }
                errors++;
              }
            }
            if (data4.modelId !== void 0) {
              if (typeof data4.modelId !== "string") {
                const err16 = { instancePath: instancePath + "/provenance/modelId", schemaPath: "#/$defs/Provenance/properties/modelId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
            }
            if (data4.promptVersion !== void 0) {
              if (typeof data4.promptVersion !== "string") {
                const err17 = { instancePath: instancePath + "/provenance/promptVersion", schemaPath: "#/$defs/Provenance/properties/promptVersion/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err17];
                } else {
                  vErrors.push(err17);
                }
                errors++;
              }
            }
            if (data4.modelDigest !== void 0) {
              let data8 = data4.modelDigest;
              const _errs20 = errors;
              let valid5 = false;
              const _errs21 = errors;
              if (typeof data8 !== "string") {
                const err18 = { instancePath: instancePath + "/provenance/modelDigest", schemaPath: "#/$defs/Provenance/properties/modelDigest/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
              }
              var _valid0 = _errs21 === errors;
              valid5 = valid5 || _valid0;
              if (!valid5) {
                const _errs23 = errors;
                if (data8 !== null) {
                  const err19 = { instancePath: instancePath + "/provenance/modelDigest", schemaPath: "#/$defs/Provenance/properties/modelDigest/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err19];
                  } else {
                    vErrors.push(err19);
                  }
                  errors++;
                }
                var _valid0 = _errs23 === errors;
                valid5 = valid5 || _valid0;
              }
              if (!valid5) {
                const err20 = { instancePath: instancePath + "/provenance/modelDigest", schemaPath: "#/$defs/Provenance/properties/modelDigest/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err20];
                } else {
                  vErrors.push(err20);
                }
                errors++;
              } else {
                errors = _errs20;
                if (vErrors !== null) {
                  if (_errs20) {
                    vErrors.length = _errs20;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data4.sourceHash !== void 0) {
              let data9 = data4.sourceHash;
              const _errs26 = errors;
              let valid6 = false;
              const _errs27 = errors;
              if (typeof data9 !== "string") {
                const err21 = { instancePath: instancePath + "/provenance/sourceHash", schemaPath: "#/$defs/Provenance/properties/sourceHash/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
              var _valid1 = _errs27 === errors;
              valid6 = valid6 || _valid1;
              if (!valid6) {
                const _errs29 = errors;
                if (data9 !== null) {
                  const err22 = { instancePath: instancePath + "/provenance/sourceHash", schemaPath: "#/$defs/Provenance/properties/sourceHash/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err22];
                  } else {
                    vErrors.push(err22);
                  }
                  errors++;
                }
                var _valid1 = _errs29 === errors;
                valid6 = valid6 || _valid1;
              }
              if (!valid6) {
                const err23 = { instancePath: instancePath + "/provenance/sourceHash", schemaPath: "#/$defs/Provenance/properties/sourceHash/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              } else {
                errors = _errs26;
                if (vErrors !== null) {
                  if (_errs26) {
                    vErrors.length = _errs26;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
          } else {
            const err24 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
            }
            errors++;
          }
        }
        if (data.sources !== void 0) {
          let data10 = data.sources;
          const _errs32 = errors;
          let valid7 = false;
          const _errs33 = errors;
          if (Array.isArray(data10)) {
            const len1 = data10.length;
            for (let i1 = 0; i1 < len1; i1++) {
              let data11 = data10[i1];
              if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
                if (data11.id === void 0) {
                  const err25 = { instancePath: instancePath + "/sources/" + i1, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
                  if (vErrors === null) {
                    vErrors = [err25];
                  } else {
                    vErrors.push(err25);
                  }
                  errors++;
                }
                if (data11.startSeconds === void 0) {
                  const err26 = { instancePath: instancePath + "/sources/" + i1, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "startSeconds" }, message: "must have required property 'startSeconds'" };
                  if (vErrors === null) {
                    vErrors = [err26];
                  } else {
                    vErrors.push(err26);
                  }
                  errors++;
                }
                if (data11.durationSeconds === void 0) {
                  const err27 = { instancePath: instancePath + "/sources/" + i1, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "durationSeconds" }, message: "must have required property 'durationSeconds'" };
                  if (vErrors === null) {
                    vErrors = [err27];
                  } else {
                    vErrors.push(err27);
                  }
                  errors++;
                }
                if (data11.text === void 0) {
                  const err28 = { instancePath: instancePath + "/sources/" + i1, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
                  if (vErrors === null) {
                    vErrors = [err28];
                  } else {
                    vErrors.push(err28);
                  }
                  errors++;
                }
                for (const key2 in data11) {
                  if (!(key2 === "id" || key2 === "startSeconds" || key2 === "durationSeconds" || key2 === "text")) {
                    const err29 = { instancePath: instancePath + "/sources/" + i1, schemaPath: "#/$defs/TranscriptSegment/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                    if (vErrors === null) {
                      vErrors = [err29];
                    } else {
                      vErrors.push(err29);
                    }
                    errors++;
                  }
                }
                if (data11.id !== void 0) {
                  if (typeof data11.id !== "string") {
                    const err30 = { instancePath: instancePath + "/sources/" + i1 + "/id", schemaPath: "#/$defs/TranscriptSegment/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err30];
                    } else {
                      vErrors.push(err30);
                    }
                    errors++;
                  }
                }
                if (data11.startSeconds !== void 0) {
                  let data13 = data11.startSeconds;
                  if (typeof data13 == "number" && isFinite(data13)) {
                    if (data13 < 0 || isNaN(data13)) {
                      const err31 = { instancePath: instancePath + "/sources/" + i1 + "/startSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/startSeconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                      if (vErrors === null) {
                        vErrors = [err31];
                      } else {
                        vErrors.push(err31);
                      }
                      errors++;
                    }
                  } else {
                    const err32 = { instancePath: instancePath + "/sources/" + i1 + "/startSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/startSeconds/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err32];
                    } else {
                      vErrors.push(err32);
                    }
                    errors++;
                  }
                }
                if (data11.durationSeconds !== void 0) {
                  let data14 = data11.durationSeconds;
                  if (typeof data14 == "number" && isFinite(data14)) {
                    if (data14 < 0 || isNaN(data14)) {
                      const err33 = { instancePath: instancePath + "/sources/" + i1 + "/durationSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/durationSeconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                      if (vErrors === null) {
                        vErrors = [err33];
                      } else {
                        vErrors.push(err33);
                      }
                      errors++;
                    }
                  } else {
                    const err34 = { instancePath: instancePath + "/sources/" + i1 + "/durationSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/durationSeconds/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err34];
                    } else {
                      vErrors.push(err34);
                    }
                    errors++;
                  }
                }
                if (data11.text !== void 0) {
                  if (typeof data11.text !== "string") {
                    const err35 = { instancePath: instancePath + "/sources/" + i1 + "/text", schemaPath: "#/$defs/TranscriptSegment/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err35];
                    } else {
                      vErrors.push(err35);
                    }
                    errors++;
                  }
                }
              } else {
                const err36 = { instancePath: instancePath + "/sources/" + i1, schemaPath: "#/$defs/TranscriptSegment/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
          } else {
            const err37 = { instancePath: instancePath + "/sources", schemaPath: "#/properties/sources/anyOf/0/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err37];
            } else {
              vErrors.push(err37);
            }
            errors++;
          }
          var _valid2 = _errs33 === errors;
          valid7 = valid7 || _valid2;
          if (!valid7) {
            const _errs47 = errors;
            if (data10 !== null) {
              const err38 = { instancePath: instancePath + "/sources", schemaPath: "#/properties/sources/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err38];
              } else {
                vErrors.push(err38);
              }
              errors++;
            }
            var _valid2 = _errs47 === errors;
            valid7 = valid7 || _valid2;
          }
          if (!valid7) {
            const err39 = { instancePath: instancePath + "/sources", schemaPath: "#/properties/sources/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err39];
            } else {
              vErrors.push(err39);
            }
            errors++;
          } else {
            errors = _errs32;
            if (vErrors !== null) {
              if (_errs32) {
                vErrors.length = _errs32;
              } else {
                vErrors = null;
              }
            }
          }
        }
      } else {
        const err40 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
      validate17.errors = vErrors;
      return errors === 0;
    }
    function validate21(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.kind === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.overview === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "overview" }, message: "must have required property 'overview'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.sections === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sections" }, message: "must have required property 'sections'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.language === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.provenance === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "provenance" }, message: "must have required property 'provenance'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "kind" || key0 === "overview" || key0 === "sections" || key0 === "language" || key0 === "provenance")) {
            const err5 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
        if (data.kind !== void 0) {
          let data0 = data.kind;
          if (typeof data0 !== "string") {
            const err6 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
          if ("timestamped" !== data0) {
            const err7 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "timestamped" }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
        }
        if (data.overview !== void 0) {
          if (typeof data.overview !== "string") {
            const err8 = { instancePath: instancePath + "/overview", schemaPath: "#/properties/overview/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data.sections !== void 0) {
          let data2 = data.sections;
          if (Array.isArray(data2)) {
            const len0 = data2.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data3 = data2[i0];
              if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
                if (data3.id === void 0) {
                  const err9 = { instancePath: instancePath + "/sections/" + i0, schemaPath: "#/$defs/TimestampedSection/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
                  if (vErrors === null) {
                    vErrors = [err9];
                  } else {
                    vErrors.push(err9);
                  }
                  errors++;
                }
                if (data3.startSeconds === void 0) {
                  const err10 = { instancePath: instancePath + "/sections/" + i0, schemaPath: "#/$defs/TimestampedSection/required", keyword: "required", params: { missingProperty: "startSeconds" }, message: "must have required property 'startSeconds'" };
                  if (vErrors === null) {
                    vErrors = [err10];
                  } else {
                    vErrors.push(err10);
                  }
                  errors++;
                }
                if (data3.title === void 0) {
                  const err11 = { instancePath: instancePath + "/sections/" + i0, schemaPath: "#/$defs/TimestampedSection/required", keyword: "required", params: { missingProperty: "title" }, message: "must have required property 'title'" };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
                if (data3.summary === void 0) {
                  const err12 = { instancePath: instancePath + "/sections/" + i0, schemaPath: "#/$defs/TimestampedSection/required", keyword: "required", params: { missingProperty: "summary" }, message: "must have required property 'summary'" };
                  if (vErrors === null) {
                    vErrors = [err12];
                  } else {
                    vErrors.push(err12);
                  }
                  errors++;
                }
                if (data3.details === void 0) {
                  const err13 = { instancePath: instancePath + "/sections/" + i0, schemaPath: "#/$defs/TimestampedSection/required", keyword: "required", params: { missingProperty: "details" }, message: "must have required property 'details'" };
                  if (vErrors === null) {
                    vErrors = [err13];
                  } else {
                    vErrors.push(err13);
                  }
                  errors++;
                }
                if (data3.sourceSegmentIds === void 0) {
                  const err14 = { instancePath: instancePath + "/sections/" + i0, schemaPath: "#/$defs/TimestampedSection/required", keyword: "required", params: { missingProperty: "sourceSegmentIds" }, message: "must have required property 'sourceSegmentIds'" };
                  if (vErrors === null) {
                    vErrors = [err14];
                  } else {
                    vErrors.push(err14);
                  }
                  errors++;
                }
                for (const key1 in data3) {
                  if (!(key1 === "id" || key1 === "startSeconds" || key1 === "title" || key1 === "summary" || key1 === "details" || key1 === "sourceSegmentIds")) {
                    const err15 = { instancePath: instancePath + "/sections/" + i0, schemaPath: "#/$defs/TimestampedSection/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                    if (vErrors === null) {
                      vErrors = [err15];
                    } else {
                      vErrors.push(err15);
                    }
                    errors++;
                  }
                }
                if (data3.id !== void 0) {
                  if (typeof data3.id !== "string") {
                    const err16 = { instancePath: instancePath + "/sections/" + i0 + "/id", schemaPath: "#/$defs/TimestampedSection/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err16];
                    } else {
                      vErrors.push(err16);
                    }
                    errors++;
                  }
                }
                if (data3.startSeconds !== void 0) {
                  let data5 = data3.startSeconds;
                  if (typeof data5 == "number" && isFinite(data5)) {
                    if (data5 < 0 || isNaN(data5)) {
                      const err17 = { instancePath: instancePath + "/sections/" + i0 + "/startSeconds", schemaPath: "#/$defs/TimestampedSection/properties/startSeconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                      if (vErrors === null) {
                        vErrors = [err17];
                      } else {
                        vErrors.push(err17);
                      }
                      errors++;
                    }
                  } else {
                    const err18 = { instancePath: instancePath + "/sections/" + i0 + "/startSeconds", schemaPath: "#/$defs/TimestampedSection/properties/startSeconds/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err18];
                    } else {
                      vErrors.push(err18);
                    }
                    errors++;
                  }
                }
                if (data3.title !== void 0) {
                  if (typeof data3.title !== "string") {
                    const err19 = { instancePath: instancePath + "/sections/" + i0 + "/title", schemaPath: "#/$defs/TimestampedSection/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err19];
                    } else {
                      vErrors.push(err19);
                    }
                    errors++;
                  }
                }
                if (data3.summary !== void 0) {
                  if (typeof data3.summary !== "string") {
                    const err20 = { instancePath: instancePath + "/sections/" + i0 + "/summary", schemaPath: "#/$defs/TimestampedSection/properties/summary/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err20];
                    } else {
                      vErrors.push(err20);
                    }
                    errors++;
                  }
                }
                if (data3.details !== void 0) {
                  let data8 = data3.details;
                  if (Array.isArray(data8)) {
                    const len1 = data8.length;
                    for (let i1 = 0; i1 < len1; i1++) {
                      if (typeof data8[i1] !== "string") {
                        const err21 = { instancePath: instancePath + "/sections/" + i0 + "/details/" + i1, schemaPath: "#/$defs/TimestampedSection/properties/details/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err21];
                        } else {
                          vErrors.push(err21);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err22 = { instancePath: instancePath + "/sections/" + i0 + "/details", schemaPath: "#/$defs/TimestampedSection/properties/details/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                    if (vErrors === null) {
                      vErrors = [err22];
                    } else {
                      vErrors.push(err22);
                    }
                    errors++;
                  }
                }
                if (data3.sourceSegmentIds !== void 0) {
                  let data10 = data3.sourceSegmentIds;
                  if (Array.isArray(data10)) {
                    const len2 = data10.length;
                    for (let i2 = 0; i2 < len2; i2++) {
                      if (typeof data10[i2] !== "string") {
                        const err23 = { instancePath: instancePath + "/sections/" + i0 + "/sourceSegmentIds/" + i2, schemaPath: "#/$defs/TimestampedSection/properties/sourceSegmentIds/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                        if (vErrors === null) {
                          vErrors = [err23];
                        } else {
                          vErrors.push(err23);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err24 = { instancePath: instancePath + "/sections/" + i0 + "/sourceSegmentIds", schemaPath: "#/$defs/TimestampedSection/properties/sourceSegmentIds/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                    if (vErrors === null) {
                      vErrors = [err24];
                    } else {
                      vErrors.push(err24);
                    }
                    errors++;
                  }
                }
              } else {
                const err25 = { instancePath: instancePath + "/sections/" + i0, schemaPath: "#/$defs/TimestampedSection/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
            }
          } else {
            const err26 = { instancePath: instancePath + "/sections", schemaPath: "#/properties/sections/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err26];
            } else {
              vErrors.push(err26);
            }
            errors++;
          }
        }
        if (data.language !== void 0) {
          if (typeof data.language !== "string") {
            const err27 = { instancePath: instancePath + "/language", schemaPath: "#/properties/language/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
        if (data.provenance !== void 0) {
          let data13 = data.provenance;
          if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
            if (data13.providerId === void 0) {
              const err28 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "providerId" }, message: "must have required property 'providerId'" };
              if (vErrors === null) {
                vErrors = [err28];
              } else {
                vErrors.push(err28);
              }
              errors++;
            }
            if (data13.modelId === void 0) {
              const err29 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "modelId" }, message: "must have required property 'modelId'" };
              if (vErrors === null) {
                vErrors = [err29];
              } else {
                vErrors.push(err29);
              }
              errors++;
            }
            if (data13.promptVersion === void 0) {
              const err30 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "promptVersion" }, message: "must have required property 'promptVersion'" };
              if (vErrors === null) {
                vErrors = [err30];
              } else {
                vErrors.push(err30);
              }
              errors++;
            }
            if (data13.modelDigest === void 0) {
              const err31 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "modelDigest" }, message: "must have required property 'modelDigest'" };
              if (vErrors === null) {
                vErrors = [err31];
              } else {
                vErrors.push(err31);
              }
              errors++;
            }
            if (data13.sourceHash === void 0) {
              const err32 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "sourceHash" }, message: "must have required property 'sourceHash'" };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
            for (const key2 in data13) {
              if (!(key2 === "providerId" || key2 === "modelId" || key2 === "promptVersion" || key2 === "modelDigest" || key2 === "sourceHash")) {
                const err33 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err33];
                } else {
                  vErrors.push(err33);
                }
                errors++;
              }
            }
            if (data13.providerId !== void 0) {
              if (typeof data13.providerId !== "string") {
                const err34 = { instancePath: instancePath + "/provenance/providerId", schemaPath: "#/$defs/Provenance/properties/providerId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err34];
                } else {
                  vErrors.push(err34);
                }
                errors++;
              }
            }
            if (data13.modelId !== void 0) {
              if (typeof data13.modelId !== "string") {
                const err35 = { instancePath: instancePath + "/provenance/modelId", schemaPath: "#/$defs/Provenance/properties/modelId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err35];
                } else {
                  vErrors.push(err35);
                }
                errors++;
              }
            }
            if (data13.promptVersion !== void 0) {
              if (typeof data13.promptVersion !== "string") {
                const err36 = { instancePath: instancePath + "/provenance/promptVersion", schemaPath: "#/$defs/Provenance/properties/promptVersion/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
            if (data13.modelDigest !== void 0) {
              let data17 = data13.modelDigest;
              const _errs41 = errors;
              let valid11 = false;
              const _errs42 = errors;
              if (typeof data17 !== "string") {
                const err37 = { instancePath: instancePath + "/provenance/modelDigest", schemaPath: "#/$defs/Provenance/properties/modelDigest/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
              var _valid0 = _errs42 === errors;
              valid11 = valid11 || _valid0;
              if (!valid11) {
                const _errs44 = errors;
                if (data17 !== null) {
                  const err38 = { instancePath: instancePath + "/provenance/modelDigest", schemaPath: "#/$defs/Provenance/properties/modelDigest/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err38];
                  } else {
                    vErrors.push(err38);
                  }
                  errors++;
                }
                var _valid0 = _errs44 === errors;
                valid11 = valid11 || _valid0;
              }
              if (!valid11) {
                const err39 = { instancePath: instancePath + "/provenance/modelDigest", schemaPath: "#/$defs/Provenance/properties/modelDigest/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err39];
                } else {
                  vErrors.push(err39);
                }
                errors++;
              } else {
                errors = _errs41;
                if (vErrors !== null) {
                  if (_errs41) {
                    vErrors.length = _errs41;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data13.sourceHash !== void 0) {
              let data18 = data13.sourceHash;
              const _errs47 = errors;
              let valid12 = false;
              const _errs48 = errors;
              if (typeof data18 !== "string") {
                const err40 = { instancePath: instancePath + "/provenance/sourceHash", schemaPath: "#/$defs/Provenance/properties/sourceHash/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err40];
                } else {
                  vErrors.push(err40);
                }
                errors++;
              }
              var _valid1 = _errs48 === errors;
              valid12 = valid12 || _valid1;
              if (!valid12) {
                const _errs50 = errors;
                if (data18 !== null) {
                  const err41 = { instancePath: instancePath + "/provenance/sourceHash", schemaPath: "#/$defs/Provenance/properties/sourceHash/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err41];
                  } else {
                    vErrors.push(err41);
                  }
                  errors++;
                }
                var _valid1 = _errs50 === errors;
                valid12 = valid12 || _valid1;
              }
              if (!valid12) {
                const err42 = { instancePath: instancePath + "/provenance/sourceHash", schemaPath: "#/$defs/Provenance/properties/sourceHash/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err42];
                } else {
                  vErrors.push(err42);
                }
                errors++;
              } else {
                errors = _errs47;
                if (vErrors !== null) {
                  if (_errs47) {
                    vErrors.length = _errs47;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
          } else {
            const err43 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
        }
      } else {
        const err44 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err44];
        } else {
          vErrors.push(err44);
        }
        errors++;
      }
      validate21.errors = vErrors;
      return errors === 0;
    }
    var pattern4 = new RegExp("^https://(?:www\\.)?youtube\\.com/", "u");
    function validate23(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.kind === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.tldr === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "tldr" }, message: "must have required property 'tldr'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.comments === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "comments" }, message: "must have required property 'comments'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.collection === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "collection" }, message: "must have required property 'collection'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.language === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data.provenance === void 0) {
          const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "provenance" }, message: "must have required property 'provenance'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "kind" || key0 === "tldr" || key0 === "comments" || key0 === "collection" || key0 === "language" || key0 === "provenance")) {
            const err6 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
        if (data.kind !== void 0) {
          let data0 = data.kind;
          if (typeof data0 !== "string") {
            const err7 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
          if ("comments" !== data0) {
            const err8 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "comments" }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data.tldr !== void 0) {
          let data1 = data.tldr;
          const _errs5 = errors;
          let valid1 = false;
          const _errs6 = errors;
          if (typeof data1 !== "string") {
            const err9 = { instancePath: instancePath + "/tldr", schemaPath: "#/properties/tldr/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
          var _valid0 = _errs6 === errors;
          valid1 = valid1 || _valid0;
          if (!valid1) {
            const _errs8 = errors;
            if (data1 !== null) {
              const err10 = { instancePath: instancePath + "/tldr", schemaPath: "#/properties/tldr/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
            var _valid0 = _errs8 === errors;
            valid1 = valid1 || _valid0;
          }
          if (!valid1) {
            const err11 = { instancePath: instancePath + "/tldr", schemaPath: "#/properties/tldr/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          } else {
            errors = _errs5;
            if (vErrors !== null) {
              if (_errs5) {
                vErrors.length = _errs5;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data.comments !== void 0) {
          let data2 = data.comments;
          if (Array.isArray(data2)) {
            const len0 = data2.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data3 = data2[i0];
              if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
                if (data3.id === void 0) {
                  const err12 = { instancePath: instancePath + "/comments/" + i0, schemaPath: "#/$defs/Comment/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
                  if (vErrors === null) {
                    vErrors = [err12];
                  } else {
                    vErrors.push(err12);
                  }
                  errors++;
                }
                if (data3.author === void 0) {
                  const err13 = { instancePath: instancePath + "/comments/" + i0, schemaPath: "#/$defs/Comment/required", keyword: "required", params: { missingProperty: "author" }, message: "must have required property 'author'" };
                  if (vErrors === null) {
                    vErrors = [err13];
                  } else {
                    vErrors.push(err13);
                  }
                  errors++;
                }
                if (data3.text === void 0) {
                  const err14 = { instancePath: instancePath + "/comments/" + i0, schemaPath: "#/$defs/Comment/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
                  if (vErrors === null) {
                    vErrors = [err14];
                  } else {
                    vErrors.push(err14);
                  }
                  errors++;
                }
                if (data3.authorUrl === void 0) {
                  const err15 = { instancePath: instancePath + "/comments/" + i0, schemaPath: "#/$defs/Comment/required", keyword: "required", params: { missingProperty: "authorUrl" }, message: "must have required property 'authorUrl'" };
                  if (vErrors === null) {
                    vErrors = [err15];
                  } else {
                    vErrors.push(err15);
                  }
                  errors++;
                }
                if (data3.likes === void 0) {
                  const err16 = { instancePath: instancePath + "/comments/" + i0, schemaPath: "#/$defs/Comment/required", keyword: "required", params: { missingProperty: "likes" }, message: "must have required property 'likes'" };
                  if (vErrors === null) {
                    vErrors = [err16];
                  } else {
                    vErrors.push(err16);
                  }
                  errors++;
                }
                if (data3.startSeconds === void 0) {
                  const err17 = { instancePath: instancePath + "/comments/" + i0, schemaPath: "#/$defs/Comment/required", keyword: "required", params: { missingProperty: "startSeconds" }, message: "must have required property 'startSeconds'" };
                  if (vErrors === null) {
                    vErrors = [err17];
                  } else {
                    vErrors.push(err17);
                  }
                  errors++;
                }
                if (data3.sourceUrl === void 0) {
                  const err18 = { instancePath: instancePath + "/comments/" + i0, schemaPath: "#/$defs/Comment/required", keyword: "required", params: { missingProperty: "sourceUrl" }, message: "must have required property 'sourceUrl'" };
                  if (vErrors === null) {
                    vErrors = [err18];
                  } else {
                    vErrors.push(err18);
                  }
                  errors++;
                }
                for (const key1 in data3) {
                  if (!(key1 === "id" || key1 === "author" || key1 === "text" || key1 === "authorUrl" || key1 === "likes" || key1 === "startSeconds" || key1 === "sourceUrl")) {
                    const err19 = { instancePath: instancePath + "/comments/" + i0, schemaPath: "#/$defs/Comment/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                    if (vErrors === null) {
                      vErrors = [err19];
                    } else {
                      vErrors.push(err19);
                    }
                    errors++;
                  }
                }
                if (data3.id !== void 0) {
                  let data4 = data3.id;
                  if (typeof data4 === "string") {
                    if (func2(data4) > 256) {
                      const err20 = { instancePath: instancePath + "/comments/" + i0 + "/id", schemaPath: "#/$defs/Comment/properties/id/maxLength", keyword: "maxLength", params: { limit: 256 }, message: "must NOT have more than 256 characters" };
                      if (vErrors === null) {
                        vErrors = [err20];
                      } else {
                        vErrors.push(err20);
                      }
                      errors++;
                    }
                    if (func2(data4) < 1) {
                      const err21 = { instancePath: instancePath + "/comments/" + i0 + "/id", schemaPath: "#/$defs/Comment/properties/id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                      if (vErrors === null) {
                        vErrors = [err21];
                      } else {
                        vErrors.push(err21);
                      }
                      errors++;
                    }
                  } else {
                    const err22 = { instancePath: instancePath + "/comments/" + i0 + "/id", schemaPath: "#/$defs/Comment/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err22];
                    } else {
                      vErrors.push(err22);
                    }
                    errors++;
                  }
                }
                if (data3.author !== void 0) {
                  let data5 = data3.author;
                  const _errs19 = errors;
                  let valid6 = false;
                  const _errs20 = errors;
                  if (typeof data5 !== "string") {
                    const err23 = { instancePath: instancePath + "/comments/" + i0 + "/author", schemaPath: "#/$defs/Comment/properties/author/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err23];
                    } else {
                      vErrors.push(err23);
                    }
                    errors++;
                  }
                  var _valid1 = _errs20 === errors;
                  valid6 = valid6 || _valid1;
                  if (!valid6) {
                    const _errs22 = errors;
                    if (data5 !== null) {
                      const err24 = { instancePath: instancePath + "/comments/" + i0 + "/author", schemaPath: "#/$defs/Comment/properties/author/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                      if (vErrors === null) {
                        vErrors = [err24];
                      } else {
                        vErrors.push(err24);
                      }
                      errors++;
                    }
                    var _valid1 = _errs22 === errors;
                    valid6 = valid6 || _valid1;
                  }
                  if (!valid6) {
                    const err25 = { instancePath: instancePath + "/comments/" + i0 + "/author", schemaPath: "#/$defs/Comment/properties/author/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                    if (vErrors === null) {
                      vErrors = [err25];
                    } else {
                      vErrors.push(err25);
                    }
                    errors++;
                  } else {
                    errors = _errs19;
                    if (vErrors !== null) {
                      if (_errs19) {
                        vErrors.length = _errs19;
                      } else {
                        vErrors = null;
                      }
                    }
                  }
                }
                if (data3.text !== void 0) {
                  if (typeof data3.text !== "string") {
                    const err26 = { instancePath: instancePath + "/comments/" + i0 + "/text", schemaPath: "#/$defs/Comment/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err26];
                    } else {
                      vErrors.push(err26);
                    }
                    errors++;
                  }
                }
                if (data3.authorUrl !== void 0) {
                  let data7 = data3.authorUrl;
                  const _errs27 = errors;
                  let valid7 = false;
                  const _errs28 = errors;
                  if (typeof data7 === "string") {
                    if (!pattern4.test(data7)) {
                      const err27 = { instancePath: instancePath + "/comments/" + i0 + "/authorUrl", schemaPath: "#/$defs/Comment/properties/authorUrl/anyOf/0/pattern", keyword: "pattern", params: { pattern: "^https://(?:www\\.)?youtube\\.com/" }, message: 'must match pattern "^https://(?:www\\.)?youtube\\.com/"' };
                      if (vErrors === null) {
                        vErrors = [err27];
                      } else {
                        vErrors.push(err27);
                      }
                      errors++;
                    }
                  } else {
                    const err28 = { instancePath: instancePath + "/comments/" + i0 + "/authorUrl", schemaPath: "#/$defs/Comment/properties/authorUrl/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err28];
                    } else {
                      vErrors.push(err28);
                    }
                    errors++;
                  }
                  var _valid2 = _errs28 === errors;
                  valid7 = valid7 || _valid2;
                  if (!valid7) {
                    const _errs30 = errors;
                    if (data7 !== null) {
                      const err29 = { instancePath: instancePath + "/comments/" + i0 + "/authorUrl", schemaPath: "#/$defs/Comment/properties/authorUrl/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                      if (vErrors === null) {
                        vErrors = [err29];
                      } else {
                        vErrors.push(err29);
                      }
                      errors++;
                    }
                    var _valid2 = _errs30 === errors;
                    valid7 = valid7 || _valid2;
                  }
                  if (!valid7) {
                    const err30 = { instancePath: instancePath + "/comments/" + i0 + "/authorUrl", schemaPath: "#/$defs/Comment/properties/authorUrl/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                    if (vErrors === null) {
                      vErrors = [err30];
                    } else {
                      vErrors.push(err30);
                    }
                    errors++;
                  } else {
                    errors = _errs27;
                    if (vErrors !== null) {
                      if (_errs27) {
                        vErrors.length = _errs27;
                      } else {
                        vErrors = null;
                      }
                    }
                  }
                }
                if (data3.likes !== void 0) {
                  let data8 = data3.likes;
                  const _errs33 = errors;
                  let valid8 = false;
                  const _errs34 = errors;
                  if (!(typeof data8 == "number" && (!(data8 % 1) && !isNaN(data8)) && isFinite(data8))) {
                    const err31 = { instancePath: instancePath + "/comments/" + i0 + "/likes", schemaPath: "#/$defs/Comment/properties/likes/anyOf/0/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                    if (vErrors === null) {
                      vErrors = [err31];
                    } else {
                      vErrors.push(err31);
                    }
                    errors++;
                  }
                  if (typeof data8 == "number" && isFinite(data8)) {
                    if (data8 < 0 || isNaN(data8)) {
                      const err32 = { instancePath: instancePath + "/comments/" + i0 + "/likes", schemaPath: "#/$defs/Comment/properties/likes/anyOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                      if (vErrors === null) {
                        vErrors = [err32];
                      } else {
                        vErrors.push(err32);
                      }
                      errors++;
                    }
                  }
                  var _valid3 = _errs34 === errors;
                  valid8 = valid8 || _valid3;
                  if (!valid8) {
                    const _errs36 = errors;
                    if (data8 !== null) {
                      const err33 = { instancePath: instancePath + "/comments/" + i0 + "/likes", schemaPath: "#/$defs/Comment/properties/likes/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                      if (vErrors === null) {
                        vErrors = [err33];
                      } else {
                        vErrors.push(err33);
                      }
                      errors++;
                    }
                    var _valid3 = _errs36 === errors;
                    valid8 = valid8 || _valid3;
                  }
                  if (!valid8) {
                    const err34 = { instancePath: instancePath + "/comments/" + i0 + "/likes", schemaPath: "#/$defs/Comment/properties/likes/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                    if (vErrors === null) {
                      vErrors = [err34];
                    } else {
                      vErrors.push(err34);
                    }
                    errors++;
                  } else {
                    errors = _errs33;
                    if (vErrors !== null) {
                      if (_errs33) {
                        vErrors.length = _errs33;
                      } else {
                        vErrors = null;
                      }
                    }
                  }
                }
                if (data3.startSeconds !== void 0) {
                  let data9 = data3.startSeconds;
                  const _errs39 = errors;
                  let valid9 = false;
                  const _errs40 = errors;
                  if (typeof data9 == "number" && isFinite(data9)) {
                    if (data9 < 0 || isNaN(data9)) {
                      const err35 = { instancePath: instancePath + "/comments/" + i0 + "/startSeconds", schemaPath: "#/$defs/Comment/properties/startSeconds/anyOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                      if (vErrors === null) {
                        vErrors = [err35];
                      } else {
                        vErrors.push(err35);
                      }
                      errors++;
                    }
                  } else {
                    const err36 = { instancePath: instancePath + "/comments/" + i0 + "/startSeconds", schemaPath: "#/$defs/Comment/properties/startSeconds/anyOf/0/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err36];
                    } else {
                      vErrors.push(err36);
                    }
                    errors++;
                  }
                  var _valid4 = _errs40 === errors;
                  valid9 = valid9 || _valid4;
                  if (!valid9) {
                    const _errs42 = errors;
                    if (data9 !== null) {
                      const err37 = { instancePath: instancePath + "/comments/" + i0 + "/startSeconds", schemaPath: "#/$defs/Comment/properties/startSeconds/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                      if (vErrors === null) {
                        vErrors = [err37];
                      } else {
                        vErrors.push(err37);
                      }
                      errors++;
                    }
                    var _valid4 = _errs42 === errors;
                    valid9 = valid9 || _valid4;
                  }
                  if (!valid9) {
                    const err38 = { instancePath: instancePath + "/comments/" + i0 + "/startSeconds", schemaPath: "#/$defs/Comment/properties/startSeconds/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                    if (vErrors === null) {
                      vErrors = [err38];
                    } else {
                      vErrors.push(err38);
                    }
                    errors++;
                  } else {
                    errors = _errs39;
                    if (vErrors !== null) {
                      if (_errs39) {
                        vErrors.length = _errs39;
                      } else {
                        vErrors = null;
                      }
                    }
                  }
                }
                if (data3.sourceUrl !== void 0) {
                  let data10 = data3.sourceUrl;
                  const _errs45 = errors;
                  let valid10 = false;
                  const _errs46 = errors;
                  if (typeof data10 === "string") {
                    if (!pattern4.test(data10)) {
                      const err39 = { instancePath: instancePath + "/comments/" + i0 + "/sourceUrl", schemaPath: "#/$defs/Comment/properties/sourceUrl/anyOf/0/pattern", keyword: "pattern", params: { pattern: "^https://(?:www\\.)?youtube\\.com/" }, message: 'must match pattern "^https://(?:www\\.)?youtube\\.com/"' };
                      if (vErrors === null) {
                        vErrors = [err39];
                      } else {
                        vErrors.push(err39);
                      }
                      errors++;
                    }
                  } else {
                    const err40 = { instancePath: instancePath + "/comments/" + i0 + "/sourceUrl", schemaPath: "#/$defs/Comment/properties/sourceUrl/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err40];
                    } else {
                      vErrors.push(err40);
                    }
                    errors++;
                  }
                  var _valid5 = _errs46 === errors;
                  valid10 = valid10 || _valid5;
                  if (!valid10) {
                    const _errs48 = errors;
                    if (data10 !== null) {
                      const err41 = { instancePath: instancePath + "/comments/" + i0 + "/sourceUrl", schemaPath: "#/$defs/Comment/properties/sourceUrl/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                      if (vErrors === null) {
                        vErrors = [err41];
                      } else {
                        vErrors.push(err41);
                      }
                      errors++;
                    }
                    var _valid5 = _errs48 === errors;
                    valid10 = valid10 || _valid5;
                  }
                  if (!valid10) {
                    const err42 = { instancePath: instancePath + "/comments/" + i0 + "/sourceUrl", schemaPath: "#/$defs/Comment/properties/sourceUrl/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                    if (vErrors === null) {
                      vErrors = [err42];
                    } else {
                      vErrors.push(err42);
                    }
                    errors++;
                  } else {
                    errors = _errs45;
                    if (vErrors !== null) {
                      if (_errs45) {
                        vErrors.length = _errs45;
                      } else {
                        vErrors = null;
                      }
                    }
                  }
                }
              } else {
                const err43 = { instancePath: instancePath + "/comments/" + i0, schemaPath: "#/$defs/Comment/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err43];
                } else {
                  vErrors.push(err43);
                }
                errors++;
              }
            }
          } else {
            const err44 = { instancePath: instancePath + "/comments", schemaPath: "#/properties/comments/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        if (data.collection !== void 0) {
          let data11 = data.collection;
          if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
            if (data11.fetchedCount === void 0) {
              const err45 = { instancePath: instancePath + "/collection", schemaPath: "#/$defs/CommentCollection/required", keyword: "required", params: { missingProperty: "fetchedCount" }, message: "must have required property 'fetchedCount'" };
              if (vErrors === null) {
                vErrors = [err45];
              } else {
                vErrors.push(err45);
              }
              errors++;
            }
            if (data11.complete === void 0) {
              const err46 = { instancePath: instancePath + "/collection", schemaPath: "#/$defs/CommentCollection/required", keyword: "required", params: { missingProperty: "complete" }, message: "must have required property 'complete'" };
              if (vErrors === null) {
                vErrors = [err46];
              } else {
                vErrors.push(err46);
              }
              errors++;
            }
            if (data11.diagnostics === void 0) {
              const err47 = { instancePath: instancePath + "/collection", schemaPath: "#/$defs/CommentCollection/required", keyword: "required", params: { missingProperty: "diagnostics" }, message: "must have required property 'diagnostics'" };
              if (vErrors === null) {
                vErrors = [err47];
              } else {
                vErrors.push(err47);
              }
              errors++;
            }
            if (data11.announcedCount === void 0) {
              const err48 = { instancePath: instancePath + "/collection", schemaPath: "#/$defs/CommentCollection/required", keyword: "required", params: { missingProperty: "announcedCount" }, message: "must have required property 'announcedCount'" };
              if (vErrors === null) {
                vErrors = [err48];
              } else {
                vErrors.push(err48);
              }
              errors++;
            }
            for (const key2 in data11) {
              if (!(key2 === "fetchedCount" || key2 === "complete" || key2 === "diagnostics" || key2 === "announcedCount")) {
                const err49 = { instancePath: instancePath + "/collection", schemaPath: "#/$defs/CommentCollection/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err49];
                } else {
                  vErrors.push(err49);
                }
                errors++;
              }
            }
            if (data11.fetchedCount !== void 0) {
              let data12 = data11.fetchedCount;
              if (!(typeof data12 == "number" && (!(data12 % 1) && !isNaN(data12)) && isFinite(data12))) {
                const err50 = { instancePath: instancePath + "/collection/fetchedCount", schemaPath: "#/$defs/CommentCollection/properties/fetchedCount/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                if (vErrors === null) {
                  vErrors = [err50];
                } else {
                  vErrors.push(err50);
                }
                errors++;
              }
              if (typeof data12 == "number" && isFinite(data12)) {
                if (data12 < 0 || isNaN(data12)) {
                  const err51 = { instancePath: instancePath + "/collection/fetchedCount", schemaPath: "#/$defs/CommentCollection/properties/fetchedCount/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err51];
                  } else {
                    vErrors.push(err51);
                  }
                  errors++;
                }
              }
            }
            if (data11.complete !== void 0) {
              if (typeof data11.complete !== "boolean") {
                const err52 = { instancePath: instancePath + "/collection/complete", schemaPath: "#/$defs/CommentCollection/properties/complete/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err52];
                } else {
                  vErrors.push(err52);
                }
                errors++;
              }
            }
            if (data11.diagnostics !== void 0) {
              let data14 = data11.diagnostics;
              if (Array.isArray(data14)) {
                const len1 = data14.length;
                for (let i1 = 0; i1 < len1; i1++) {
                  if (typeof data14[i1] !== "string") {
                    const err53 = { instancePath: instancePath + "/collection/diagnostics/" + i1, schemaPath: "#/$defs/CommentCollection/properties/diagnostics/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err53];
                    } else {
                      vErrors.push(err53);
                    }
                    errors++;
                  }
                }
              } else {
                const err54 = { instancePath: instancePath + "/collection/diagnostics", schemaPath: "#/$defs/CommentCollection/properties/diagnostics/type", keyword: "type", params: { type: "array" }, message: "must be array" };
                if (vErrors === null) {
                  vErrors = [err54];
                } else {
                  vErrors.push(err54);
                }
                errors++;
              }
            }
            if (data11.announcedCount !== void 0) {
              let data16 = data11.announcedCount;
              const _errs63 = errors;
              let valid15 = false;
              const _errs64 = errors;
              if (!(typeof data16 == "number" && (!(data16 % 1) && !isNaN(data16)) && isFinite(data16))) {
                const err55 = { instancePath: instancePath + "/collection/announcedCount", schemaPath: "#/$defs/CommentCollection/properties/announcedCount/anyOf/0/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                if (vErrors === null) {
                  vErrors = [err55];
                } else {
                  vErrors.push(err55);
                }
                errors++;
              }
              if (typeof data16 == "number" && isFinite(data16)) {
                if (data16 < 0 || isNaN(data16)) {
                  const err56 = { instancePath: instancePath + "/collection/announcedCount", schemaPath: "#/$defs/CommentCollection/properties/announcedCount/anyOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err56];
                  } else {
                    vErrors.push(err56);
                  }
                  errors++;
                }
              }
              var _valid6 = _errs64 === errors;
              valid15 = valid15 || _valid6;
              if (!valid15) {
                const _errs66 = errors;
                if (data16 !== null) {
                  const err57 = { instancePath: instancePath + "/collection/announcedCount", schemaPath: "#/$defs/CommentCollection/properties/announcedCount/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err57];
                  } else {
                    vErrors.push(err57);
                  }
                  errors++;
                }
                var _valid6 = _errs66 === errors;
                valid15 = valid15 || _valid6;
              }
              if (!valid15) {
                const err58 = { instancePath: instancePath + "/collection/announcedCount", schemaPath: "#/$defs/CommentCollection/properties/announcedCount/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err58];
                } else {
                  vErrors.push(err58);
                }
                errors++;
              } else {
                errors = _errs63;
                if (vErrors !== null) {
                  if (_errs63) {
                    vErrors.length = _errs63;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
          } else {
            const err59 = { instancePath: instancePath + "/collection", schemaPath: "#/$defs/CommentCollection/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err59];
            } else {
              vErrors.push(err59);
            }
            errors++;
          }
        }
        if (data.language !== void 0) {
          if (typeof data.language !== "string") {
            const err60 = { instancePath: instancePath + "/language", schemaPath: "#/properties/language/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err60];
            } else {
              vErrors.push(err60);
            }
            errors++;
          }
        }
        if (data.provenance !== void 0) {
          let data18 = data.provenance;
          const _errs71 = errors;
          let valid16 = false;
          const _errs72 = errors;
          if (data18 && typeof data18 == "object" && !Array.isArray(data18)) {
            if (data18.providerId === void 0) {
              const err61 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "providerId" }, message: "must have required property 'providerId'" };
              if (vErrors === null) {
                vErrors = [err61];
              } else {
                vErrors.push(err61);
              }
              errors++;
            }
            if (data18.modelId === void 0) {
              const err62 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "modelId" }, message: "must have required property 'modelId'" };
              if (vErrors === null) {
                vErrors = [err62];
              } else {
                vErrors.push(err62);
              }
              errors++;
            }
            if (data18.promptVersion === void 0) {
              const err63 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "promptVersion" }, message: "must have required property 'promptVersion'" };
              if (vErrors === null) {
                vErrors = [err63];
              } else {
                vErrors.push(err63);
              }
              errors++;
            }
            if (data18.modelDigest === void 0) {
              const err64 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "modelDigest" }, message: "must have required property 'modelDigest'" };
              if (vErrors === null) {
                vErrors = [err64];
              } else {
                vErrors.push(err64);
              }
              errors++;
            }
            if (data18.sourceHash === void 0) {
              const err65 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/required", keyword: "required", params: { missingProperty: "sourceHash" }, message: "must have required property 'sourceHash'" };
              if (vErrors === null) {
                vErrors = [err65];
              } else {
                vErrors.push(err65);
              }
              errors++;
            }
            for (const key3 in data18) {
              if (!(key3 === "providerId" || key3 === "modelId" || key3 === "promptVersion" || key3 === "modelDigest" || key3 === "sourceHash")) {
                const err66 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err66];
                } else {
                  vErrors.push(err66);
                }
                errors++;
              }
            }
            if (data18.providerId !== void 0) {
              if (typeof data18.providerId !== "string") {
                const err67 = { instancePath: instancePath + "/provenance/providerId", schemaPath: "#/$defs/Provenance/properties/providerId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err67];
                } else {
                  vErrors.push(err67);
                }
                errors++;
              }
            }
            if (data18.modelId !== void 0) {
              if (typeof data18.modelId !== "string") {
                const err68 = { instancePath: instancePath + "/provenance/modelId", schemaPath: "#/$defs/Provenance/properties/modelId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err68];
                } else {
                  vErrors.push(err68);
                }
                errors++;
              }
            }
            if (data18.promptVersion !== void 0) {
              if (typeof data18.promptVersion !== "string") {
                const err69 = { instancePath: instancePath + "/provenance/promptVersion", schemaPath: "#/$defs/Provenance/properties/promptVersion/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err69];
                } else {
                  vErrors.push(err69);
                }
                errors++;
              }
            }
            if (data18.modelDigest !== void 0) {
              let data22 = data18.modelDigest;
              const _errs83 = errors;
              let valid19 = false;
              const _errs84 = errors;
              if (typeof data22 !== "string") {
                const err70 = { instancePath: instancePath + "/provenance/modelDigest", schemaPath: "#/$defs/Provenance/properties/modelDigest/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err70];
                } else {
                  vErrors.push(err70);
                }
                errors++;
              }
              var _valid8 = _errs84 === errors;
              valid19 = valid19 || _valid8;
              if (!valid19) {
                const _errs86 = errors;
                if (data22 !== null) {
                  const err71 = { instancePath: instancePath + "/provenance/modelDigest", schemaPath: "#/$defs/Provenance/properties/modelDigest/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err71];
                  } else {
                    vErrors.push(err71);
                  }
                  errors++;
                }
                var _valid8 = _errs86 === errors;
                valid19 = valid19 || _valid8;
              }
              if (!valid19) {
                const err72 = { instancePath: instancePath + "/provenance/modelDigest", schemaPath: "#/$defs/Provenance/properties/modelDigest/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err72];
                } else {
                  vErrors.push(err72);
                }
                errors++;
              } else {
                errors = _errs83;
                if (vErrors !== null) {
                  if (_errs83) {
                    vErrors.length = _errs83;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data18.sourceHash !== void 0) {
              let data23 = data18.sourceHash;
              const _errs89 = errors;
              let valid20 = false;
              const _errs90 = errors;
              if (typeof data23 !== "string") {
                const err73 = { instancePath: instancePath + "/provenance/sourceHash", schemaPath: "#/$defs/Provenance/properties/sourceHash/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err73];
                } else {
                  vErrors.push(err73);
                }
                errors++;
              }
              var _valid9 = _errs90 === errors;
              valid20 = valid20 || _valid9;
              if (!valid20) {
                const _errs92 = errors;
                if (data23 !== null) {
                  const err74 = { instancePath: instancePath + "/provenance/sourceHash", schemaPath: "#/$defs/Provenance/properties/sourceHash/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err74];
                  } else {
                    vErrors.push(err74);
                  }
                  errors++;
                }
                var _valid9 = _errs92 === errors;
                valid20 = valid20 || _valid9;
              }
              if (!valid20) {
                const err75 = { instancePath: instancePath + "/provenance/sourceHash", schemaPath: "#/$defs/Provenance/properties/sourceHash/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err75];
                } else {
                  vErrors.push(err75);
                }
                errors++;
              } else {
                errors = _errs89;
                if (vErrors !== null) {
                  if (_errs89) {
                    vErrors.length = _errs89;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
          } else {
            const err76 = { instancePath: instancePath + "/provenance", schemaPath: "#/$defs/Provenance/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err76];
            } else {
              vErrors.push(err76);
            }
            errors++;
          }
          var _valid7 = _errs72 === errors;
          valid16 = valid16 || _valid7;
          if (!valid16) {
            const _errs94 = errors;
            if (data18 !== null) {
              const err77 = { instancePath: instancePath + "/provenance", schemaPath: "#/properties/provenance/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err77];
              } else {
                vErrors.push(err77);
              }
              errors++;
            }
            var _valid7 = _errs94 === errors;
            valid16 = valid16 || _valid7;
          }
          if (!valid16) {
            const err78 = { instancePath: instancePath + "/provenance", schemaPath: "#/properties/provenance/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err78];
            } else {
              vErrors.push(err78);
            }
            errors++;
          } else {
            errors = _errs71;
            if (vErrors !== null) {
              if (_errs71) {
                vErrors.length = _errs71;
              } else {
                vErrors = null;
              }
            }
          }
        }
      } else {
        const err79 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err79];
        } else {
          vErrors.push(err79);
        }
        errors++;
      }
      validate23.errors = vErrors;
      return errors === 0;
    }
    var schema40 = { "additionalProperties": false, "properties": { "language": { "title": "Language", "type": "string" }, "source": { "enum": ["import", "manual", "automatic", "audio"], "title": "Source", "type": "string" }, "complete": { "title": "Complete", "type": "boolean" }, "segments": { "items": { "$ref": "#/$defs/TranscriptSegment" }, "title": "Segments", "type": "array" }, "diagnostics": { "items": { "type": "string" }, "title": "Diagnostics", "type": "array" } }, "required": ["language", "source", "complete", "segments", "diagnostics"], "title": "Transcript", "type": "object" };
    function validate26(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.language === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.source === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "source" }, message: "must have required property 'source'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.complete === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "complete" }, message: "must have required property 'complete'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.segments === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "segments" }, message: "must have required property 'segments'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.diagnostics === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "diagnostics" }, message: "must have required property 'diagnostics'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "language" || key0 === "source" || key0 === "complete" || key0 === "segments" || key0 === "diagnostics")) {
            const err5 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
        if (data.language !== void 0) {
          if (typeof data.language !== "string") {
            const err6 = { instancePath: instancePath + "/language", schemaPath: "#/properties/language/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
        if (data.source !== void 0) {
          let data1 = data.source;
          if (typeof data1 !== "string") {
            const err7 = { instancePath: instancePath + "/source", schemaPath: "#/properties/source/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
          if (!(data1 === "import" || data1 === "manual" || data1 === "automatic" || data1 === "audio")) {
            const err8 = { instancePath: instancePath + "/source", schemaPath: "#/properties/source/enum", keyword: "enum", params: { allowedValues: schema40.properties.source.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data.complete !== void 0) {
          if (typeof data.complete !== "boolean") {
            const err9 = { instancePath: instancePath + "/complete", schemaPath: "#/properties/complete/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        if (data.segments !== void 0) {
          let data3 = data.segments;
          if (Array.isArray(data3)) {
            const len0 = data3.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data4 = data3[i0];
              if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
                if (data4.id === void 0) {
                  const err10 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
                  if (vErrors === null) {
                    vErrors = [err10];
                  } else {
                    vErrors.push(err10);
                  }
                  errors++;
                }
                if (data4.startSeconds === void 0) {
                  const err11 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "startSeconds" }, message: "must have required property 'startSeconds'" };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
                if (data4.durationSeconds === void 0) {
                  const err12 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "durationSeconds" }, message: "must have required property 'durationSeconds'" };
                  if (vErrors === null) {
                    vErrors = [err12];
                  } else {
                    vErrors.push(err12);
                  }
                  errors++;
                }
                if (data4.text === void 0) {
                  const err13 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
                  if (vErrors === null) {
                    vErrors = [err13];
                  } else {
                    vErrors.push(err13);
                  }
                  errors++;
                }
                for (const key1 in data4) {
                  if (!(key1 === "id" || key1 === "startSeconds" || key1 === "durationSeconds" || key1 === "text")) {
                    const err14 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                    if (vErrors === null) {
                      vErrors = [err14];
                    } else {
                      vErrors.push(err14);
                    }
                    errors++;
                  }
                }
                if (data4.id !== void 0) {
                  if (typeof data4.id !== "string") {
                    const err15 = { instancePath: instancePath + "/segments/" + i0 + "/id", schemaPath: "#/$defs/TranscriptSegment/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err15];
                    } else {
                      vErrors.push(err15);
                    }
                    errors++;
                  }
                }
                if (data4.startSeconds !== void 0) {
                  let data6 = data4.startSeconds;
                  if (typeof data6 == "number" && isFinite(data6)) {
                    if (data6 < 0 || isNaN(data6)) {
                      const err16 = { instancePath: instancePath + "/segments/" + i0 + "/startSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/startSeconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                      if (vErrors === null) {
                        vErrors = [err16];
                      } else {
                        vErrors.push(err16);
                      }
                      errors++;
                    }
                  } else {
                    const err17 = { instancePath: instancePath + "/segments/" + i0 + "/startSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/startSeconds/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err17];
                    } else {
                      vErrors.push(err17);
                    }
                    errors++;
                  }
                }
                if (data4.durationSeconds !== void 0) {
                  let data7 = data4.durationSeconds;
                  if (typeof data7 == "number" && isFinite(data7)) {
                    if (data7 < 0 || isNaN(data7)) {
                      const err18 = { instancePath: instancePath + "/segments/" + i0 + "/durationSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/durationSeconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                      if (vErrors === null) {
                        vErrors = [err18];
                      } else {
                        vErrors.push(err18);
                      }
                      errors++;
                    }
                  } else {
                    const err19 = { instancePath: instancePath + "/segments/" + i0 + "/durationSeconds", schemaPath: "#/$defs/TranscriptSegment/properties/durationSeconds/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                    if (vErrors === null) {
                      vErrors = [err19];
                    } else {
                      vErrors.push(err19);
                    }
                    errors++;
                  }
                }
                if (data4.text !== void 0) {
                  if (typeof data4.text !== "string") {
                    const err20 = { instancePath: instancePath + "/segments/" + i0 + "/text", schemaPath: "#/$defs/TranscriptSegment/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err20];
                    } else {
                      vErrors.push(err20);
                    }
                    errors++;
                  }
                }
              } else {
                const err21 = { instancePath: instancePath + "/segments/" + i0, schemaPath: "#/$defs/TranscriptSegment/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
            }
          } else {
            const err22 = { instancePath: instancePath + "/segments", schemaPath: "#/properties/segments/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
        }
        if (data.diagnostics !== void 0) {
          let data9 = data.diagnostics;
          if (Array.isArray(data9)) {
            const len1 = data9.length;
            for (let i1 = 0; i1 < len1; i1++) {
              if (typeof data9[i1] !== "string") {
                const err23 = { instancePath: instancePath + "/diagnostics/" + i1, schemaPath: "#/properties/diagnostics/items/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
            }
          } else {
            const err24 = { instancePath: instancePath + "/diagnostics", schemaPath: "#/properties/diagnostics/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
            }
            errors++;
          }
        }
      } else {
        const err25 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
      validate26.errors = vErrors;
      return errors === 0;
    }
    function validate25(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.kind === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.transcript === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "transcript" }, message: "must have required property 'transcript'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "kind" || key0 === "transcript")) {
            const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
        }
        if (data.kind !== void 0) {
          let data0 = data.kind;
          if (typeof data0 !== "string") {
            const err3 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err3];
            } else {
              vErrors.push(err3);
            }
            errors++;
          }
          if ("transcript" !== data0) {
            const err4 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/const", keyword: "const", params: { allowedValue: "transcript" }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
        if (data.transcript !== void 0) {
          if (!validate26(data.transcript, { instancePath: instancePath + "/transcript", parentData: data, parentDataProperty: "transcript", rootData })) {
            vErrors = vErrors === null ? validate26.errors : vErrors.concat(validate26.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err5 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
      validate25.errors = vErrors;
      return errors === 0;
    }
    var schema43 = { "additionalProperties": false, "properties": { "schemaVersion": { "const": 1, "default": 1, "title": "Schemaversion", "type": "integer" }, "interfaceLanguage": { "default": "fr", "enum": ["fr", "en"], "title": "Interfacelanguage", "type": "string" }, "outputLanguage": { "default": "EN", "enum": ["EN", "AR", "BG", "BN", "ZH", "CS", "DA", "DE", "ET", "EL", "ES", "FI", "FR", "HE", "HI", "HU", "ID", "IT", "JA", "KO", "LT", "LV", "MS", "NL", "NB", "PL", "PT-BR", "PT-PT", "RO", "RU", "SK", "SL", "SV", "TH", "TR", "TL", "ZH-TW", "UK", "UR", "VI", "ZU"], "title": "Outputlanguage", "type": "string" }, "autoSummary": { "default": false, "title": "Autosummary", "type": "boolean" }, "flexible": { "$ref": "#/$defs/FlexibleSettings" }, "timestamped": { "$ref": "#/$defs/TimestampedSettings" }, "transcript": { "$ref": "#/$defs/TranscriptSettings" }, "comments": { "$ref": "#/$defs/CommentsSettings" } }, "required": ["schemaVersion", "interfaceLanguage", "outputLanguage", "autoSummary", "flexible", "timestamped", "transcript", "comments"], "title": "SettingsV1", "type": "object" };
    var schema44 = { "additionalProperties": false, "properties": { "focus": { "default": "insightful", "enum": ["insightful", "funny", "actionable", "controversial"], "title": "Focus", "type": "string" }, "format": { "default": "list", "enum": ["list", "qa"], "title": "Format", "type": "string" }, "amount": { "default": "auto", "enum": ["short", "auto", "detailed"], "title": "Amount", "type": "string" }, "emoji": { "default": true, "title": "Emoji", "type": "boolean" }, "highlight": { "default": true, "title": "Highlight", "type": "boolean" }, "grouping": { "default": true, "title": "Grouping", "type": "boolean" } }, "required": ["focus", "format", "amount", "emoji", "highlight", "grouping"], "title": "FlexibleSettings", "type": "object" };
    function validate29(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.schemaVersion === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "schemaVersion" }, message: "must have required property 'schemaVersion'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.interfaceLanguage === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "interfaceLanguage" }, message: "must have required property 'interfaceLanguage'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.outputLanguage === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "outputLanguage" }, message: "must have required property 'outputLanguage'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.autoSummary === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "autoSummary" }, message: "must have required property 'autoSummary'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.flexible === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "flexible" }, message: "must have required property 'flexible'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data.timestamped === void 0) {
          const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "timestamped" }, message: "must have required property 'timestamped'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data.transcript === void 0) {
          const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "transcript" }, message: "must have required property 'transcript'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data.comments === void 0) {
          const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "comments" }, message: "must have required property 'comments'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "schemaVersion" || key0 === "interfaceLanguage" || key0 === "outputLanguage" || key0 === "autoSummary" || key0 === "flexible" || key0 === "timestamped" || key0 === "transcript" || key0 === "comments")) {
            const err8 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
        if (data.schemaVersion !== void 0) {
          let data0 = data.schemaVersion;
          if (!(typeof data0 == "number" && (!(data0 % 1) && !isNaN(data0)) && isFinite(data0))) {
            const err9 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
          if (1 !== data0) {
            const err10 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/const", keyword: "const", params: { allowedValue: 1 }, message: "must be equal to constant" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data.interfaceLanguage !== void 0) {
          let data1 = data.interfaceLanguage;
          if (typeof data1 !== "string") {
            const err11 = { instancePath: instancePath + "/interfaceLanguage", schemaPath: "#/properties/interfaceLanguage/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
          if (!(data1 === "fr" || data1 === "en")) {
            const err12 = { instancePath: instancePath + "/interfaceLanguage", schemaPath: "#/properties/interfaceLanguage/enum", keyword: "enum", params: { allowedValues: schema43.properties.interfaceLanguage.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        if (data.outputLanguage !== void 0) {
          let data2 = data.outputLanguage;
          if (typeof data2 !== "string") {
            const err13 = { instancePath: instancePath + "/outputLanguage", schemaPath: "#/properties/outputLanguage/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
          if (!(data2 === "EN" || data2 === "AR" || data2 === "BG" || data2 === "BN" || data2 === "ZH" || data2 === "CS" || data2 === "DA" || data2 === "DE" || data2 === "ET" || data2 === "EL" || data2 === "ES" || data2 === "FI" || data2 === "FR" || data2 === "HE" || data2 === "HI" || data2 === "HU" || data2 === "ID" || data2 === "IT" || data2 === "JA" || data2 === "KO" || data2 === "LT" || data2 === "LV" || data2 === "MS" || data2 === "NL" || data2 === "NB" || data2 === "PL" || data2 === "PT-BR" || data2 === "PT-PT" || data2 === "RO" || data2 === "RU" || data2 === "SK" || data2 === "SL" || data2 === "SV" || data2 === "TH" || data2 === "TR" || data2 === "TL" || data2 === "ZH-TW" || data2 === "UK" || data2 === "UR" || data2 === "VI" || data2 === "ZU")) {
            const err14 = { instancePath: instancePath + "/outputLanguage", schemaPath: "#/properties/outputLanguage/enum", keyword: "enum", params: { allowedValues: schema43.properties.outputLanguage.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
        if (data.autoSummary !== void 0) {
          if (typeof data.autoSummary !== "boolean") {
            const err15 = { instancePath: instancePath + "/autoSummary", schemaPath: "#/properties/autoSummary/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data.flexible !== void 0) {
          let data4 = data.flexible;
          if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
            if (data4.focus === void 0) {
              const err16 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "focus" }, message: "must have required property 'focus'" };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
              }
              errors++;
            }
            if (data4.format === void 0) {
              const err17 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "format" }, message: "must have required property 'format'" };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
            if (data4.amount === void 0) {
              const err18 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "amount" }, message: "must have required property 'amount'" };
              if (vErrors === null) {
                vErrors = [err18];
              } else {
                vErrors.push(err18);
              }
              errors++;
            }
            if (data4.emoji === void 0) {
              const err19 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "emoji" }, message: "must have required property 'emoji'" };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            }
            if (data4.highlight === void 0) {
              const err20 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "highlight" }, message: "must have required property 'highlight'" };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
            if (data4.grouping === void 0) {
              const err21 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/required", keyword: "required", params: { missingProperty: "grouping" }, message: "must have required property 'grouping'" };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
            for (const key1 in data4) {
              if (!(key1 === "focus" || key1 === "format" || key1 === "amount" || key1 === "emoji" || key1 === "highlight" || key1 === "grouping")) {
                const err22 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err22];
                } else {
                  vErrors.push(err22);
                }
                errors++;
              }
            }
            if (data4.focus !== void 0) {
              let data5 = data4.focus;
              if (typeof data5 !== "string") {
                const err23 = { instancePath: instancePath + "/flexible/focus", schemaPath: "#/$defs/FlexibleSettings/properties/focus/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
              if (!(data5 === "insightful" || data5 === "funny" || data5 === "actionable" || data5 === "controversial")) {
                const err24 = { instancePath: instancePath + "/flexible/focus", schemaPath: "#/$defs/FlexibleSettings/properties/focus/enum", keyword: "enum", params: { allowedValues: schema44.properties.focus.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
            }
            if (data4.format !== void 0) {
              let data6 = data4.format;
              if (typeof data6 !== "string") {
                const err25 = { instancePath: instancePath + "/flexible/format", schemaPath: "#/$defs/FlexibleSettings/properties/format/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
              if (!(data6 === "list" || data6 === "qa")) {
                const err26 = { instancePath: instancePath + "/flexible/format", schemaPath: "#/$defs/FlexibleSettings/properties/format/enum", keyword: "enum", params: { allowedValues: schema44.properties.format.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
            }
            if (data4.amount !== void 0) {
              let data7 = data4.amount;
              if (typeof data7 !== "string") {
                const err27 = { instancePath: instancePath + "/flexible/amount", schemaPath: "#/$defs/FlexibleSettings/properties/amount/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err27];
                } else {
                  vErrors.push(err27);
                }
                errors++;
              }
              if (!(data7 === "short" || data7 === "auto" || data7 === "detailed")) {
                const err28 = { instancePath: instancePath + "/flexible/amount", schemaPath: "#/$defs/FlexibleSettings/properties/amount/enum", keyword: "enum", params: { allowedValues: schema44.properties.amount.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
            }
            if (data4.emoji !== void 0) {
              if (typeof data4.emoji !== "boolean") {
                const err29 = { instancePath: instancePath + "/flexible/emoji", schemaPath: "#/$defs/FlexibleSettings/properties/emoji/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err29];
                } else {
                  vErrors.push(err29);
                }
                errors++;
              }
            }
            if (data4.highlight !== void 0) {
              if (typeof data4.highlight !== "boolean") {
                const err30 = { instancePath: instancePath + "/flexible/highlight", schemaPath: "#/$defs/FlexibleSettings/properties/highlight/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err30];
                } else {
                  vErrors.push(err30);
                }
                errors++;
              }
            }
            if (data4.grouping !== void 0) {
              if (typeof data4.grouping !== "boolean") {
                const err31 = { instancePath: instancePath + "/flexible/grouping", schemaPath: "#/$defs/FlexibleSettings/properties/grouping/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err31];
                } else {
                  vErrors.push(err31);
                }
                errors++;
              }
            }
          } else {
            const err32 = { instancePath: instancePath + "/flexible", schemaPath: "#/$defs/FlexibleSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err32];
            } else {
              vErrors.push(err32);
            }
            errors++;
          }
        }
        if (data.timestamped !== void 0) {
          let data11 = data.timestamped;
          if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
            if (data11.emoji === void 0) {
              const err33 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/required", keyword: "required", params: { missingProperty: "emoji" }, message: "must have required property 'emoji'" };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
            if (data11.timestamps === void 0) {
              const err34 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/required", keyword: "required", params: { missingProperty: "timestamps" }, message: "must have required property 'timestamps'" };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
            if (data11.details === void 0) {
              const err35 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/required", keyword: "required", params: { missingProperty: "details" }, message: "must have required property 'details'" };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
            for (const key2 in data11) {
              if (!(key2 === "emoji" || key2 === "timestamps" || key2 === "details")) {
                const err36 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
            if (data11.emoji !== void 0) {
              if (typeof data11.emoji !== "boolean") {
                const err37 = { instancePath: instancePath + "/timestamped/emoji", schemaPath: "#/$defs/TimestampedSettings/properties/emoji/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
            }
            if (data11.timestamps !== void 0) {
              if (typeof data11.timestamps !== "boolean") {
                const err38 = { instancePath: instancePath + "/timestamped/timestamps", schemaPath: "#/$defs/TimestampedSettings/properties/timestamps/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err38];
                } else {
                  vErrors.push(err38);
                }
                errors++;
              }
            }
            if (data11.details !== void 0) {
              if (typeof data11.details !== "boolean") {
                const err39 = { instancePath: instancePath + "/timestamped/details", schemaPath: "#/$defs/TimestampedSettings/properties/details/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err39];
                } else {
                  vErrors.push(err39);
                }
                errors++;
              }
            }
          } else {
            const err40 = { instancePath: instancePath + "/timestamped", schemaPath: "#/$defs/TimestampedSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err40];
            } else {
              vErrors.push(err40);
            }
            errors++;
          }
        }
        if (data.transcript !== void 0) {
          let data15 = data.transcript;
          if (data15 && typeof data15 == "object" && !Array.isArray(data15)) {
            if (data15.timestamps === void 0) {
              const err41 = { instancePath: instancePath + "/transcript", schemaPath: "#/$defs/TranscriptSettings/required", keyword: "required", params: { missingProperty: "timestamps" }, message: "must have required property 'timestamps'" };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
            for (const key3 in data15) {
              if (!(key3 === "timestamps")) {
                const err42 = { instancePath: instancePath + "/transcript", schemaPath: "#/$defs/TranscriptSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err42];
                } else {
                  vErrors.push(err42);
                }
                errors++;
              }
            }
            if (data15.timestamps !== void 0) {
              if (typeof data15.timestamps !== "boolean") {
                const err43 = { instancePath: instancePath + "/transcript/timestamps", schemaPath: "#/$defs/TranscriptSettings/properties/timestamps/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err43];
                } else {
                  vErrors.push(err43);
                }
                errors++;
              }
            }
          } else {
            const err44 = { instancePath: instancePath + "/transcript", schemaPath: "#/$defs/TranscriptSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        if (data.comments !== void 0) {
          let data17 = data.comments;
          if (data17 && typeof data17 == "object" && !Array.isArray(data17)) {
            if (data17.tldr === void 0) {
              const err45 = { instancePath: instancePath + "/comments", schemaPath: "#/$defs/CommentsSettings/required", keyword: "required", params: { missingProperty: "tldr" }, message: "must have required property 'tldr'" };
              if (vErrors === null) {
                vErrors = [err45];
              } else {
                vErrors.push(err45);
              }
              errors++;
            }
            for (const key4 in data17) {
              if (!(key4 === "tldr")) {
                const err46 = { instancePath: instancePath + "/comments", schemaPath: "#/$defs/CommentsSettings/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key4 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err46];
                } else {
                  vErrors.push(err46);
                }
                errors++;
              }
            }
            if (data17.tldr !== void 0) {
              if (typeof data17.tldr !== "boolean") {
                const err47 = { instancePath: instancePath + "/comments/tldr", schemaPath: "#/$defs/CommentsSettings/properties/tldr/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
            }
          } else {
            const err48 = { instancePath: instancePath + "/comments", schemaPath: "#/$defs/CommentsSettings/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err48];
            } else {
              vErrors.push(err48);
            }
            errors++;
          }
        }
      } else {
        const err49 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
      validate29.errors = vErrors;
      return errors === 0;
    }
    function validate16(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.id === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.video === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "video" }, message: "must have required property 'video'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.state === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "state" }, message: "must have required property 'state'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.stage === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "stage" }, message: "must have required property 'stage'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.completed === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "completed" }, message: "must have required property 'completed'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data.total === void 0) {
          const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "total" }, message: "must have required property 'total'" };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data.revision === void 0) {
          const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "revision" }, message: "must have required property 'revision'" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data.result === void 0) {
          const err7 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "result" }, message: "must have required property 'result'" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data.error === void 0) {
          const err8 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "error" }, message: "must have required property 'error'" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!func4.call(schema25.properties, key0)) {
            const err9 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        if (data.id !== void 0) {
          if (typeof data.id !== "string") {
            const err10 = { instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data.video !== void 0) {
          let data1 = data.video;
          if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
            if (data1.videoId === void 0) {
              const err11 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "videoId" }, message: "must have required property 'videoId'" };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
            if (data1.canonicalUrl === void 0) {
              const err12 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "canonicalUrl" }, message: "must have required property 'canonicalUrl'" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
            if (data1.title === void 0) {
              const err13 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "title" }, message: "must have required property 'title'" };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
            if (data1.durationSeconds === void 0) {
              const err14 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "durationSeconds" }, message: "must have required property 'durationSeconds'" };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
              }
              errors++;
            }
            if (data1.navigationRevision === void 0) {
              const err15 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/required", keyword: "required", params: { missingProperty: "navigationRevision" }, message: "must have required property 'navigationRevision'" };
              if (vErrors === null) {
                vErrors = [err15];
              } else {
                vErrors.push(err15);
              }
              errors++;
            }
            for (const key1 in data1) {
              if (!(key1 === "videoId" || key1 === "canonicalUrl" || key1 === "title" || key1 === "durationSeconds" || key1 === "navigationRevision")) {
                const err16 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
            }
            if (data1.videoId !== void 0) {
              let data2 = data1.videoId;
              if (typeof data2 === "string") {
                if (!pattern0.test(data2)) {
                  const err17 = { instancePath: instancePath + "/video/videoId", schemaPath: "#/$defs/VideoContext/properties/videoId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]{11}$" }, message: 'must match pattern "^[A-Za-z0-9_-]{11}$"' };
                  if (vErrors === null) {
                    vErrors = [err17];
                  } else {
                    vErrors.push(err17);
                  }
                  errors++;
                }
              } else {
                const err18 = { instancePath: instancePath + "/video/videoId", schemaPath: "#/$defs/VideoContext/properties/videoId/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
              }
            }
            if (data1.canonicalUrl !== void 0) {
              let data3 = data1.canonicalUrl;
              if (typeof data3 === "string") {
                if (!pattern1.test(data3)) {
                  const err19 = { instancePath: instancePath + "/video/canonicalUrl", schemaPath: "#/$defs/VideoContext/properties/canonicalUrl/pattern", keyword: "pattern", params: { pattern: "^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$" }, message: 'must match pattern "^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$"' };
                  if (vErrors === null) {
                    vErrors = [err19];
                  } else {
                    vErrors.push(err19);
                  }
                  errors++;
                }
              } else {
                const err20 = { instancePath: instancePath + "/video/canonicalUrl", schemaPath: "#/$defs/VideoContext/properties/canonicalUrl/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err20];
                } else {
                  vErrors.push(err20);
                }
                errors++;
              }
            }
            if (data1.title !== void 0) {
              let data4 = data1.title;
              const _errs13 = errors;
              let valid3 = false;
              const _errs14 = errors;
              if (typeof data4 !== "string") {
                const err21 = { instancePath: instancePath + "/video/title", schemaPath: "#/$defs/VideoContext/properties/title/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
              var _valid0 = _errs14 === errors;
              valid3 = valid3 || _valid0;
              if (!valid3) {
                const _errs16 = errors;
                if (data4 !== null) {
                  const err22 = { instancePath: instancePath + "/video/title", schemaPath: "#/$defs/VideoContext/properties/title/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err22];
                  } else {
                    vErrors.push(err22);
                  }
                  errors++;
                }
                var _valid0 = _errs16 === errors;
                valid3 = valid3 || _valid0;
              }
              if (!valid3) {
                const err23 = { instancePath: instancePath + "/video/title", schemaPath: "#/$defs/VideoContext/properties/title/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              } else {
                errors = _errs13;
                if (vErrors !== null) {
                  if (_errs13) {
                    vErrors.length = _errs13;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.durationSeconds !== void 0) {
              let data5 = data1.durationSeconds;
              const _errs19 = errors;
              let valid4 = false;
              const _errs20 = errors;
              if (typeof data5 == "number" && isFinite(data5)) {
                if (data5 < 0 || isNaN(data5)) {
                  const err24 = { instancePath: instancePath + "/video/durationSeconds", schemaPath: "#/$defs/VideoContext/properties/durationSeconds/anyOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err24];
                  } else {
                    vErrors.push(err24);
                  }
                  errors++;
                }
              } else {
                const err25 = { instancePath: instancePath + "/video/durationSeconds", schemaPath: "#/$defs/VideoContext/properties/durationSeconds/anyOf/0/type", keyword: "type", params: { type: "number" }, message: "must be number" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
              var _valid1 = _errs20 === errors;
              valid4 = valid4 || _valid1;
              if (!valid4) {
                const _errs22 = errors;
                if (data5 !== null) {
                  const err26 = { instancePath: instancePath + "/video/durationSeconds", schemaPath: "#/$defs/VideoContext/properties/durationSeconds/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                  if (vErrors === null) {
                    vErrors = [err26];
                  } else {
                    vErrors.push(err26);
                  }
                  errors++;
                }
                var _valid1 = _errs22 === errors;
                valid4 = valid4 || _valid1;
              }
              if (!valid4) {
                const err27 = { instancePath: instancePath + "/video/durationSeconds", schemaPath: "#/$defs/VideoContext/properties/durationSeconds/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
                if (vErrors === null) {
                  vErrors = [err27];
                } else {
                  vErrors.push(err27);
                }
                errors++;
              } else {
                errors = _errs19;
                if (vErrors !== null) {
                  if (_errs19) {
                    vErrors.length = _errs19;
                  } else {
                    vErrors = null;
                  }
                }
              }
            }
            if (data1.navigationRevision !== void 0) {
              let data6 = data1.navigationRevision;
              if (!(typeof data6 == "number" && (!(data6 % 1) && !isNaN(data6)) && isFinite(data6))) {
                const err28 = { instancePath: instancePath + "/video/navigationRevision", schemaPath: "#/$defs/VideoContext/properties/navigationRevision/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
                if (vErrors === null) {
                  vErrors = [err28];
                } else {
                  vErrors.push(err28);
                }
                errors++;
              }
              if (typeof data6 == "number" && isFinite(data6)) {
                if (data6 < 0 || isNaN(data6)) {
                  const err29 = { instancePath: instancePath + "/video/navigationRevision", schemaPath: "#/$defs/VideoContext/properties/navigationRevision/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
                  if (vErrors === null) {
                    vErrors = [err29];
                  } else {
                    vErrors.push(err29);
                  }
                  errors++;
                }
              }
            }
          } else {
            const err30 = { instancePath: instancePath + "/video", schemaPath: "#/$defs/VideoContext/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err30];
            } else {
              vErrors.push(err30);
            }
            errors++;
          }
        }
        if (data.state !== void 0) {
          let data7 = data.state;
          if (typeof data7 !== "string") {
            const err31 = { instancePath: instancePath + "/state", schemaPath: "#/properties/state/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err31];
            } else {
              vErrors.push(err31);
            }
            errors++;
          }
          if (!(data7 === "queued" || data7 === "running" || data7 === "completed" || data7 === "failed" || data7 === "cancelled" || data7 === "interrupted")) {
            const err32 = { instancePath: instancePath + "/state", schemaPath: "#/properties/state/enum", keyword: "enum", params: { allowedValues: schema25.properties.state.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err32];
            } else {
              vErrors.push(err32);
            }
            errors++;
          }
        }
        if (data.stage !== void 0) {
          if (typeof data.stage !== "string") {
            const err33 = { instancePath: instancePath + "/stage", schemaPath: "#/properties/stage/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err33];
            } else {
              vErrors.push(err33);
            }
            errors++;
          }
        }
        if (data.completed !== void 0) {
          let data9 = data.completed;
          if (!(typeof data9 == "number" && (!(data9 % 1) && !isNaN(data9)) && isFinite(data9))) {
            const err34 = { instancePath: instancePath + "/completed", schemaPath: "#/properties/completed/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err34];
            } else {
              vErrors.push(err34);
            }
            errors++;
          }
          if (typeof data9 == "number" && isFinite(data9)) {
            if (data9 < 0 || isNaN(data9)) {
              const err35 = { instancePath: instancePath + "/completed", schemaPath: "#/properties/completed/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
          }
        }
        if (data.total !== void 0) {
          let data10 = data.total;
          const _errs33 = errors;
          let valid5 = false;
          const _errs34 = errors;
          if (!(typeof data10 == "number" && (!(data10 % 1) && !isNaN(data10)) && isFinite(data10))) {
            const err36 = { instancePath: instancePath + "/total", schemaPath: "#/properties/total/anyOf/0/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err36];
            } else {
              vErrors.push(err36);
            }
            errors++;
          }
          if (typeof data10 == "number" && isFinite(data10)) {
            if (data10 < 0 || isNaN(data10)) {
              const err37 = { instancePath: instancePath + "/total", schemaPath: "#/properties/total/anyOf/0/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err37];
              } else {
                vErrors.push(err37);
              }
              errors++;
            }
          }
          var _valid2 = _errs34 === errors;
          valid5 = valid5 || _valid2;
          if (!valid5) {
            const _errs36 = errors;
            if (data10 !== null) {
              const err38 = { instancePath: instancePath + "/total", schemaPath: "#/properties/total/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err38];
              } else {
                vErrors.push(err38);
              }
              errors++;
            }
            var _valid2 = _errs36 === errors;
            valid5 = valid5 || _valid2;
          }
          if (!valid5) {
            const err39 = { instancePath: instancePath + "/total", schemaPath: "#/properties/total/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err39];
            } else {
              vErrors.push(err39);
            }
            errors++;
          } else {
            errors = _errs33;
            if (vErrors !== null) {
              if (_errs33) {
                vErrors.length = _errs33;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data.revision !== void 0) {
          let data11 = data.revision;
          if (!(typeof data11 == "number" && (!(data11 % 1) && !isNaN(data11)) && isFinite(data11))) {
            const err40 = { instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
            if (vErrors === null) {
              vErrors = [err40];
            } else {
              vErrors.push(err40);
            }
            errors++;
          }
          if (typeof data11 == "number" && isFinite(data11)) {
            if (data11 < 0 || isNaN(data11)) {
              const err41 = { instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
          }
        }
        if (data.result !== void 0) {
          let data12 = data.result;
          const _errs41 = errors;
          let valid6 = false;
          const _errs42 = errors;
          if (!validate17(data12, { instancePath: instancePath + "/result", parentData: data, parentDataProperty: "result", rootData })) {
            vErrors = vErrors === null ? validate17.errors : vErrors.concat(validate17.errors);
            errors = vErrors.length;
          }
          var _valid3 = _errs42 === errors;
          valid6 = valid6 || _valid3;
          if (!valid6) {
            const _errs43 = errors;
            if (!validate21(data12, { instancePath: instancePath + "/result", parentData: data, parentDataProperty: "result", rootData })) {
              vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
              errors = vErrors.length;
            }
            var _valid3 = _errs43 === errors;
            valid6 = valid6 || _valid3;
            if (!valid6) {
              const _errs44 = errors;
              if (!validate23(data12, { instancePath: instancePath + "/result", parentData: data, parentDataProperty: "result", rootData })) {
                vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
                errors = vErrors.length;
              }
              var _valid3 = _errs44 === errors;
              valid6 = valid6 || _valid3;
              if (!valid6) {
                const _errs45 = errors;
                if (!validate25(data12, { instancePath: instancePath + "/result", parentData: data, parentDataProperty: "result", rootData })) {
                  vErrors = vErrors === null ? validate25.errors : vErrors.concat(validate25.errors);
                  errors = vErrors.length;
                }
                var _valid3 = _errs45 === errors;
                valid6 = valid6 || _valid3;
                if (!valid6) {
                  const _errs46 = errors;
                  if (data12 !== null) {
                    const err42 = { instancePath: instancePath + "/result", schemaPath: "#/properties/result/anyOf/4/type", keyword: "type", params: { type: "null" }, message: "must be null" };
                    if (vErrors === null) {
                      vErrors = [err42];
                    } else {
                      vErrors.push(err42);
                    }
                    errors++;
                  }
                  var _valid3 = _errs46 === errors;
                  valid6 = valid6 || _valid3;
                }
              }
            }
          }
          if (!valid6) {
            const err43 = { instancePath: instancePath + "/result", schemaPath: "#/properties/result/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          } else {
            errors = _errs41;
            if (vErrors !== null) {
              if (_errs41) {
                vErrors.length = _errs41;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data.error !== void 0) {
          let data13 = data.error;
          const _errs49 = errors;
          let valid7 = false;
          const _errs50 = errors;
          if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
            if (data13.code === void 0) {
              const err44 = { instancePath: instancePath + "/error", schemaPath: "#/$defs/JobError/required", keyword: "required", params: { missingProperty: "code" }, message: "must have required property 'code'" };
              if (vErrors === null) {
                vErrors = [err44];
              } else {
                vErrors.push(err44);
              }
              errors++;
            }
            if (data13.message === void 0) {
              const err45 = { instancePath: instancePath + "/error", schemaPath: "#/$defs/JobError/required", keyword: "required", params: { missingProperty: "message" }, message: "must have required property 'message'" };
              if (vErrors === null) {
                vErrors = [err45];
              } else {
                vErrors.push(err45);
              }
              errors++;
            }
            for (const key2 in data13) {
              if (!(key2 === "code" || key2 === "message")) {
                const err46 = { instancePath: instancePath + "/error", schemaPath: "#/$defs/JobError/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err46];
                } else {
                  vErrors.push(err46);
                }
                errors++;
              }
            }
            if (data13.code !== void 0) {
              if (typeof data13.code !== "string") {
                const err47 = { instancePath: instancePath + "/error/code", schemaPath: "#/$defs/JobError/properties/code/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
            }
            if (data13.message !== void 0) {
              if (typeof data13.message !== "string") {
                const err48 = { instancePath: instancePath + "/error/message", schemaPath: "#/$defs/JobError/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err48];
                } else {
                  vErrors.push(err48);
                }
                errors++;
              }
            }
          } else {
            const err49 = { instancePath: instancePath + "/error", schemaPath: "#/$defs/JobError/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err49];
            } else {
              vErrors.push(err49);
            }
            errors++;
          }
          var _valid4 = _errs50 === errors;
          valid7 = valid7 || _valid4;
          if (!valid7) {
            const _errs58 = errors;
            if (data13 !== null) {
              const err50 = { instancePath: instancePath + "/error", schemaPath: "#/properties/error/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err50];
              } else {
                vErrors.push(err50);
              }
              errors++;
            }
            var _valid4 = _errs58 === errors;
            valid7 = valid7 || _valid4;
          }
          if (!valid7) {
            const err51 = { instancePath: instancePath + "/error", schemaPath: "#/properties/error/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err51];
            } else {
              vErrors.push(err51);
            }
            errors++;
          } else {
            errors = _errs49;
            if (vErrors !== null) {
              if (_errs49) {
                vErrors.length = _errs49;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data.requestSettings !== void 0) {
          let data16 = data.requestSettings;
          const _errs61 = errors;
          let valid10 = false;
          const _errs62 = errors;
          if (!validate29(data16, { instancePath: instancePath + "/requestSettings", parentData: data, parentDataProperty: "requestSettings", rootData })) {
            vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
            errors = vErrors.length;
          }
          var _valid5 = _errs62 === errors;
          valid10 = valid10 || _valid5;
          if (!valid10) {
            const _errs63 = errors;
            if (data16 !== null) {
              const err52 = { instancePath: instancePath + "/requestSettings", schemaPath: "#/properties/requestSettings/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err52];
              } else {
                vErrors.push(err52);
              }
              errors++;
            }
            var _valid5 = _errs63 === errors;
            valid10 = valid10 || _valid5;
          }
          if (!valid10) {
            const err53 = { instancePath: instancePath + "/requestSettings", schemaPath: "#/properties/requestSettings/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err53];
            } else {
              vErrors.push(err53);
            }
            errors++;
          } else {
            errors = _errs61;
            if (vErrors !== null) {
              if (_errs61) {
                vErrors.length = _errs61;
              } else {
                vErrors = null;
              }
            }
          }
        }
        if (data.modelId !== void 0) {
          let data17 = data.modelId;
          const _errs66 = errors;
          let valid11 = false;
          const _errs67 = errors;
          if (typeof data17 !== "string") {
            const err54 = { instancePath: instancePath + "/modelId", schemaPath: "#/properties/modelId/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err54];
            } else {
              vErrors.push(err54);
            }
            errors++;
          }
          var _valid6 = _errs67 === errors;
          valid11 = valid11 || _valid6;
          if (!valid11) {
            const _errs69 = errors;
            if (data17 !== null) {
              const err55 = { instancePath: instancePath + "/modelId", schemaPath: "#/properties/modelId/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err55];
              } else {
                vErrors.push(err55);
              }
              errors++;
            }
            var _valid6 = _errs69 === errors;
            valid11 = valid11 || _valid6;
          }
          if (!valid11) {
            const err56 = { instancePath: instancePath + "/modelId", schemaPath: "#/properties/modelId/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err56];
            } else {
              vErrors.push(err56);
            }
            errors++;
          } else {
            errors = _errs66;
            if (vErrors !== null) {
              if (_errs66) {
                vErrors.length = _errs66;
              } else {
                vErrors = null;
              }
            }
          }
        }
      } else {
        const err57 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err57];
        } else {
          vErrors.push(err57);
        }
        errors++;
      }
      validate16.errors = vErrors;
      return errors === 0;
    }
    exports.ExportDocument = validate31;
    var schema48 = { "$defs": { "ExportBlock": { "additionalProperties": false, "properties": { "kind": { "enum": ["heading", "paragraph", "bullet"], "title": "Kind", "type": "string" }, "direction": { "default": "auto", "enum": ["ltr", "rtl", "auto"], "title": "Direction", "type": "string" }, "runs": { "items": { "$ref": "#/$defs/ExportRun" }, "title": "Runs", "type": "array" } }, "required": ["kind", "direction", "runs"], "title": "ExportBlock", "type": "object" }, "ExportRun": { "additionalProperties": false, "properties": { "text": { "title": "Text", "type": "string" }, "bold": { "default": false, "title": "Bold", "type": "boolean" }, "italic": { "default": false, "title": "Italic", "type": "boolean" }, "code": { "default": false, "title": "Code", "type": "boolean" } }, "required": ["text", "bold", "italic", "code"], "title": "ExportRun", "type": "object" } }, "additionalProperties": false, "properties": { "title": { "title": "Title", "type": "string" }, "language": { "title": "Language", "type": "string" }, "scope": { "enum": ["summary", "comments"], "title": "Scope", "type": "string" }, "blocks": { "items": { "$ref": "#/$defs/ExportBlock" }, "title": "Blocks", "type": "array" }, "sourceUrl": { "anyOf": [{ "pattern": "^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$", "type": "string" }, { "type": "null" }], "default": null, "title": "Sourceurl" } }, "required": ["title", "language", "scope", "blocks", "sourceUrl"], "title": "ExportDocument", "type": "object" };
    var schema49 = { "additionalProperties": false, "properties": { "kind": { "enum": ["heading", "paragraph", "bullet"], "title": "Kind", "type": "string" }, "direction": { "default": "auto", "enum": ["ltr", "rtl", "auto"], "title": "Direction", "type": "string" }, "runs": { "items": { "$ref": "#/$defs/ExportRun" }, "title": "Runs", "type": "array" } }, "required": ["kind", "direction", "runs"], "title": "ExportBlock", "type": "object" };
    function validate32(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.kind === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.direction === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "direction" }, message: "must have required property 'direction'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.runs === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "runs" }, message: "must have required property 'runs'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "kind" || key0 === "direction" || key0 === "runs")) {
            const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err3];
            } else {
              vErrors.push(err3);
            }
            errors++;
          }
        }
        if (data.kind !== void 0) {
          let data0 = data.kind;
          if (typeof data0 !== "string") {
            const err4 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
          if (!(data0 === "heading" || data0 === "paragraph" || data0 === "bullet")) {
            const err5 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema49.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
        if (data.direction !== void 0) {
          let data1 = data.direction;
          if (typeof data1 !== "string") {
            const err6 = { instancePath: instancePath + "/direction", schemaPath: "#/properties/direction/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
          if (!(data1 === "ltr" || data1 === "rtl" || data1 === "auto")) {
            const err7 = { instancePath: instancePath + "/direction", schemaPath: "#/properties/direction/enum", keyword: "enum", params: { allowedValues: schema49.properties.direction.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
        }
        if (data.runs !== void 0) {
          let data2 = data.runs;
          if (Array.isArray(data2)) {
            const len0 = data2.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data3 = data2[i0];
              if (data3 && typeof data3 == "object" && !Array.isArray(data3)) {
                if (data3.text === void 0) {
                  const err8 = { instancePath: instancePath + "/runs/" + i0, schemaPath: "#/$defs/ExportRun/required", keyword: "required", params: { missingProperty: "text" }, message: "must have required property 'text'" };
                  if (vErrors === null) {
                    vErrors = [err8];
                  } else {
                    vErrors.push(err8);
                  }
                  errors++;
                }
                if (data3.bold === void 0) {
                  const err9 = { instancePath: instancePath + "/runs/" + i0, schemaPath: "#/$defs/ExportRun/required", keyword: "required", params: { missingProperty: "bold" }, message: "must have required property 'bold'" };
                  if (vErrors === null) {
                    vErrors = [err9];
                  } else {
                    vErrors.push(err9);
                  }
                  errors++;
                }
                if (data3.italic === void 0) {
                  const err10 = { instancePath: instancePath + "/runs/" + i0, schemaPath: "#/$defs/ExportRun/required", keyword: "required", params: { missingProperty: "italic" }, message: "must have required property 'italic'" };
                  if (vErrors === null) {
                    vErrors = [err10];
                  } else {
                    vErrors.push(err10);
                  }
                  errors++;
                }
                if (data3.code === void 0) {
                  const err11 = { instancePath: instancePath + "/runs/" + i0, schemaPath: "#/$defs/ExportRun/required", keyword: "required", params: { missingProperty: "code" }, message: "must have required property 'code'" };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
                for (const key1 in data3) {
                  if (!(key1 === "text" || key1 === "bold" || key1 === "italic" || key1 === "code")) {
                    const err12 = { instancePath: instancePath + "/runs/" + i0, schemaPath: "#/$defs/ExportRun/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                    if (vErrors === null) {
                      vErrors = [err12];
                    } else {
                      vErrors.push(err12);
                    }
                    errors++;
                  }
                }
                if (data3.text !== void 0) {
                  if (typeof data3.text !== "string") {
                    const err13 = { instancePath: instancePath + "/runs/" + i0 + "/text", schemaPath: "#/$defs/ExportRun/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                    if (vErrors === null) {
                      vErrors = [err13];
                    } else {
                      vErrors.push(err13);
                    }
                    errors++;
                  }
                }
                if (data3.bold !== void 0) {
                  if (typeof data3.bold !== "boolean") {
                    const err14 = { instancePath: instancePath + "/runs/" + i0 + "/bold", schemaPath: "#/$defs/ExportRun/properties/bold/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                    if (vErrors === null) {
                      vErrors = [err14];
                    } else {
                      vErrors.push(err14);
                    }
                    errors++;
                  }
                }
                if (data3.italic !== void 0) {
                  if (typeof data3.italic !== "boolean") {
                    const err15 = { instancePath: instancePath + "/runs/" + i0 + "/italic", schemaPath: "#/$defs/ExportRun/properties/italic/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                    if (vErrors === null) {
                      vErrors = [err15];
                    } else {
                      vErrors.push(err15);
                    }
                    errors++;
                  }
                }
                if (data3.code !== void 0) {
                  if (typeof data3.code !== "boolean") {
                    const err16 = { instancePath: instancePath + "/runs/" + i0 + "/code", schemaPath: "#/$defs/ExportRun/properties/code/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                    if (vErrors === null) {
                      vErrors = [err16];
                    } else {
                      vErrors.push(err16);
                    }
                    errors++;
                  }
                }
              } else {
                const err17 = { instancePath: instancePath + "/runs/" + i0, schemaPath: "#/$defs/ExportRun/type", keyword: "type", params: { type: "object" }, message: "must be object" };
                if (vErrors === null) {
                  vErrors = [err17];
                } else {
                  vErrors.push(err17);
                }
                errors++;
              }
            }
          } else {
            const err18 = { instancePath: instancePath + "/runs", schemaPath: "#/properties/runs/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
      } else {
        const err19 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
      validate32.errors = vErrors;
      return errors === 0;
    }
    function validate31(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
      let vErrors = null;
      let errors = 0;
      if (data && typeof data == "object" && !Array.isArray(data)) {
        if (data.title === void 0) {
          const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "title" }, message: "must have required property 'title'" };
          if (vErrors === null) {
            vErrors = [err0];
          } else {
            vErrors.push(err0);
          }
          errors++;
        }
        if (data.language === void 0) {
          const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "language" }, message: "must have required property 'language'" };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
          }
          errors++;
        }
        if (data.scope === void 0) {
          const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "scope" }, message: "must have required property 'scope'" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (data.blocks === void 0) {
          const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "blocks" }, message: "must have required property 'blocks'" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (data.sourceUrl === void 0) {
          const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "sourceUrl" }, message: "must have required property 'sourceUrl'" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        for (const key0 in data) {
          if (!(key0 === "title" || key0 === "language" || key0 === "scope" || key0 === "blocks" || key0 === "sourceUrl")) {
            const err5 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
        if (data.title !== void 0) {
          if (typeof data.title !== "string") {
            const err6 = { instancePath: instancePath + "/title", schemaPath: "#/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
        if (data.language !== void 0) {
          if (typeof data.language !== "string") {
            const err7 = { instancePath: instancePath + "/language", schemaPath: "#/properties/language/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
        }
        if (data.scope !== void 0) {
          let data2 = data.scope;
          if (typeof data2 !== "string") {
            const err8 = { instancePath: instancePath + "/scope", schemaPath: "#/properties/scope/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
          if (!(data2 === "summary" || data2 === "comments")) {
            const err9 = { instancePath: instancePath + "/scope", schemaPath: "#/properties/scope/enum", keyword: "enum", params: { allowedValues: schema48.properties.scope.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        if (data.blocks !== void 0) {
          let data3 = data.blocks;
          if (Array.isArray(data3)) {
            const len0 = data3.length;
            for (let i0 = 0; i0 < len0; i0++) {
              if (!validate32(data3[i0], { instancePath: instancePath + "/blocks/" + i0, parentData: data3, parentDataProperty: i0, rootData })) {
                vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
                errors = vErrors.length;
              }
            }
          } else {
            const err10 = { instancePath: instancePath + "/blocks", schemaPath: "#/properties/blocks/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data.sourceUrl !== void 0) {
          let data5 = data.sourceUrl;
          const _errs12 = errors;
          let valid3 = false;
          const _errs13 = errors;
          if (typeof data5 === "string") {
            if (!pattern1.test(data5)) {
              const err11 = { instancePath: instancePath + "/sourceUrl", schemaPath: "#/properties/sourceUrl/anyOf/0/pattern", keyword: "pattern", params: { pattern: "^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$" }, message: 'must match pattern "^https://www\\.youtube\\.com/watch\\?v=[A-Za-z0-9_-]{11}$"' };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
          } else {
            const err12 = { instancePath: instancePath + "/sourceUrl", schemaPath: "#/properties/sourceUrl/anyOf/0/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
          var _valid0 = _errs13 === errors;
          valid3 = valid3 || _valid0;
          if (!valid3) {
            const _errs15 = errors;
            if (data5 !== null) {
              const err13 = { instancePath: instancePath + "/sourceUrl", schemaPath: "#/properties/sourceUrl/anyOf/1/type", keyword: "type", params: { type: "null" }, message: "must be null" };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
            var _valid0 = _errs15 === errors;
            valid3 = valid3 || _valid0;
          }
          if (!valid3) {
            const err14 = { instancePath: instancePath + "/sourceUrl", schemaPath: "#/properties/sourceUrl/anyOf", keyword: "anyOf", params: {}, message: "must match a schema in anyOf" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          } else {
            errors = _errs12;
            if (vErrors !== null) {
              if (_errs12) {
                vErrors.length = _errs12;
              } else {
                vErrors = null;
              }
            }
          }
        }
      } else {
        const err15 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
      validate31.errors = vErrors;
      return errors === 0;
    }
  }
});
export default require_wire();
