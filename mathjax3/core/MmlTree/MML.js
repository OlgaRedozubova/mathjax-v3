"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var MmlNode_js_1 = require("./MmlNode.js");
var math_js_1 = require("./MmlNodes/math.js");
var mi_js_1 = require("./MmlNodes/mi.js");
var mn_js_1 = require("./MmlNodes/mn.js");
var mo_js_1 = require("./MmlNodes/mo.js");
var mtext_js_1 = require("./MmlNodes/mtext.js");
var mspace_js_1 = require("./MmlNodes/mspace.js");
var ms_js_1 = require("./MmlNodes/ms.js");
var mrow_js_1 = require("./MmlNodes/mrow.js");
var mfrac_js_1 = require("./MmlNodes/mfrac.js");
var msqrt_js_1 = require("./MmlNodes/msqrt.js");
var mroot_js_1 = require("./MmlNodes/mroot.js");
var mstyle_js_1 = require("./MmlNodes/mstyle.js");
var merror_js_1 = require("./MmlNodes/merror.js");
var mpadded_js_1 = require("./MmlNodes/mpadded.js");
var mphantom_js_1 = require("./MmlNodes/mphantom.js");
var mfenced_js_1 = require("./MmlNodes/mfenced.js");
var menclose_js_1 = require("./MmlNodes/menclose.js");
var maction_js_1 = require("./MmlNodes/maction.js");
var msubsup_js_1 = require("./MmlNodes/msubsup.js");
var munderover_js_1 = require("./MmlNodes/munderover.js");
var mmultiscripts_js_1 = require("./MmlNodes/mmultiscripts.js");
var mtable_js_1 = require("./MmlNodes/mtable.js");
var mtr_js_1 = require("./MmlNodes/mtr.js");
var mtd_js_1 = require("./MmlNodes/mtd.js");
var maligngroup_js_1 = require("./MmlNodes/maligngroup.js");
var malignmark_js_1 = require("./MmlNodes/malignmark.js");
var mglyph_js_1 = require("./MmlNodes/mglyph.js");
var semantics_js_1 = require("./MmlNodes/semantics.js");
var TeXAtom_js_1 = require("./MmlNodes/TeXAtom.js");
var mathchoice_js_1 = require("./MmlNodes/mathchoice.js");
exports.MML = (_a = {},
    _a[math_js_1.MmlMath.prototype.kind] = math_js_1.MmlMath,
    _a[mi_js_1.MmlMi.prototype.kind] = mi_js_1.MmlMi,
    _a[mn_js_1.MmlMn.prototype.kind] = mn_js_1.MmlMn,
    _a[mo_js_1.MmlMo.prototype.kind] = mo_js_1.MmlMo,
    _a[mtext_js_1.MmlMtext.prototype.kind] = mtext_js_1.MmlMtext,
    _a[mspace_js_1.MmlMspace.prototype.kind] = mspace_js_1.MmlMspace,
    _a[ms_js_1.MmlMs.prototype.kind] = ms_js_1.MmlMs,
    _a[mrow_js_1.MmlMrow.prototype.kind] = mrow_js_1.MmlMrow,
    _a[mrow_js_1.MmlInferredMrow.prototype.kind] = mrow_js_1.MmlInferredMrow,
    _a[mfrac_js_1.MmlMfrac.prototype.kind] = mfrac_js_1.MmlMfrac,
    _a[msqrt_js_1.MmlMsqrt.prototype.kind] = msqrt_js_1.MmlMsqrt,
    _a[mroot_js_1.MmlMroot.prototype.kind] = mroot_js_1.MmlMroot,
    _a[mstyle_js_1.MmlMstyle.prototype.kind] = mstyle_js_1.MmlMstyle,
    _a[merror_js_1.MmlMerror.prototype.kind] = merror_js_1.MmlMerror,
    _a[mpadded_js_1.MmlMpadded.prototype.kind] = mpadded_js_1.MmlMpadded,
    _a[mphantom_js_1.MmlMphantom.prototype.kind] = mphantom_js_1.MmlMphantom,
    _a[mfenced_js_1.MmlMfenced.prototype.kind] = mfenced_js_1.MmlMfenced,
    _a[menclose_js_1.MmlMenclose.prototype.kind] = menclose_js_1.MmlMenclose,
    _a[maction_js_1.MmlMaction.prototype.kind] = maction_js_1.MmlMaction,
    _a[msubsup_js_1.MmlMsub.prototype.kind] = msubsup_js_1.MmlMsub,
    _a[msubsup_js_1.MmlMsup.prototype.kind] = msubsup_js_1.MmlMsup,
    _a[msubsup_js_1.MmlMsubsup.prototype.kind] = msubsup_js_1.MmlMsubsup,
    _a[munderover_js_1.MmlMunder.prototype.kind] = munderover_js_1.MmlMunder,
    _a[munderover_js_1.MmlMover.prototype.kind] = munderover_js_1.MmlMover,
    _a[munderover_js_1.MmlMunderover.prototype.kind] = munderover_js_1.MmlMunderover,
    _a[mmultiscripts_js_1.MmlMmultiscripts.prototype.kind] = mmultiscripts_js_1.MmlMmultiscripts,
    _a[mmultiscripts_js_1.MmlMprescripts.prototype.kind] = mmultiscripts_js_1.MmlMprescripts,
    _a[mmultiscripts_js_1.MmlNone.prototype.kind] = mmultiscripts_js_1.MmlNone,
    _a[mtable_js_1.MmlMtable.prototype.kind] = mtable_js_1.MmlMtable,
    _a[mtr_js_1.MmlMlabeledtr.prototype.kind] = mtr_js_1.MmlMlabeledtr,
    _a[mtr_js_1.MmlMtr.prototype.kind] = mtr_js_1.MmlMtr,
    _a[mtd_js_1.MmlMtd.prototype.kind] = mtd_js_1.MmlMtd,
    _a[maligngroup_js_1.MmlMaligngroup.prototype.kind] = maligngroup_js_1.MmlMaligngroup,
    _a[malignmark_js_1.MmlMalignmark.prototype.kind] = malignmark_js_1.MmlMalignmark,
    _a[mglyph_js_1.MmlMglyph.prototype.kind] = mglyph_js_1.MmlMglyph,
    _a[semantics_js_1.MmlSemantics.prototype.kind] = semantics_js_1.MmlSemantics,
    _a[semantics_js_1.MmlAnnotation.prototype.kind] = semantics_js_1.MmlAnnotation,
    _a[semantics_js_1.MmlAnnotationXML.prototype.kind] = semantics_js_1.MmlAnnotationXML,
    _a[TeXAtom_js_1.TeXAtom.prototype.kind] = TeXAtom_js_1.TeXAtom,
    _a[mathchoice_js_1.mathchoice.prototype.kind] = mathchoice_js_1.mathchoice,
    _a[MmlNode_js_1.TextNode.prototype.kind] = MmlNode_js_1.TextNode,
    _a[MmlNode_js_1.XMLNode.prototype.kind] = MmlNode_js_1.XMLNode,
    _a);
//# sourceMappingURL=MML.js.map