/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

ace.define("ace/mode/slick_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function (acequire, exports, module) {
    "use strict";
    
    var oop = acequire("../lib/oop");
    var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
    
    var SlickHighlightRules = function() {
        var escapeRe = /\\(\d+|['"\\&trn])/;
        
        var smallRe = /[a-z_]/.source;
        var largeRe = /[A-Z]/.source;
        var idRe = /[a-zA-Z0-9]/.source;
    
        this.$rules = {
            start: [{
                token: "string.start",
                regex: "'",
                next: "string"
            }, {
                token: "string.character",
                regex: "'(?:" + escapeRe.source + "|.)'?"
            }, {
                regex: /0(?:[xX][0-9A-Fa-f]+|[oO][0-7]+)|\d+(\.\d+)?([eE][-+]?\d*)?/,
                token: "constant.numeric"
            }, {
                token: "comment",
                regex: "#.*"
            }, {
                token : "keyword",
                regex : /\||:|=|\\|'|→|\u2192/
            }, {
                token : "keyword.operator",
                regex : /[-#%&*+.\/<≥≤>⋏⋎ƒ?\\^|~:\u03BB\u2192]+/
            }, {
                token : "operator.punctuation",
                regex : /[,]/
            }, {
                regex : "\\b" + largeRe + idRe + "+\\.?",
                token : function(value) {
                    if (value[value.length - 1] == ".")
                        return "entity.name.function"; 
                    return "constant.language"; 
                }
            }, {
                regex : "^" + smallRe  + idRe + "+\??",
                token : function(value) {
                    return "constant.language"; 
                }
            }, {
                token: "paren.lparen",
                regex: /[\[({]/ 
            }, {
                token: "paren.rparen",
                regex: /[\])}]/
            } ],
            string: [{
                token: "constant.language.escape",
                regex: escapeRe
            }, {
                token: "text",
                regex: /\\(\s|$)/,
                next: "stringGap"
            }, {
                token: "string.end",
                regex: "'",
                next: "start"
            }, {
                defaultToken: "string"
            }],
            stringGap: [{
                token: "text",
                regex: /\\/,
                next: "string"
            }, {
                token: "error",
                regex: "",
                next: "start"
            }]
        };
        
        this.normalizeRules();
    };
    
    oop.inherits(SlickHighlightRules, TextHighlightRules);
    
    exports.SlickHighlightRules = SlickHighlightRules;
    });


ace.define("ace/mode/slick",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/slick_highlight_rules","ace/mode/folding/cstyle"], function(acequire, exports, module) {
    "use strict";
    
    var oop = acequire("../lib/oop");
    var TextMode = acequire("./text").Mode;
    var HighlightRules = acequire("./slick_highlight_rules").SlickHighlightRules;
    
    var Mode = function() {
        this.HighlightRules = HighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    
    (function() {
        this.lineCommentStart = "#";
        this.$id = "ace/mode/slick";
    }).call(Mode.prototype);
    
    exports.Mode = Mode;
});
    