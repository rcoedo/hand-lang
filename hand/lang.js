const ohm = require("ohm-js");
const { empty, inc, dec, right, left, print, loop } = require("./api.js");

const compose = (...fns) => {
  return fns.reduceRight(
    (prevFn, nextFn) =>
      (...args) =>
        nextFn(prevFn(...args)),
    (value) => value,
  );
};

const handlang = ohm.grammar(`
HandLang {
  Exp = Instruction*
  Operation = "👆" | "👇" | "👉" | "👈" | "👊"
  Instruction = Operation | LoopExp
  LoopExp = "🤜"Instruction+"🤛"
}
`);

const semantics = handlang.createSemantics();

semantics.addOperation("eval", {
  Exp(e) {
    return e.eval();
  },
  Operation(e) {
    switch (e.sourceString) {
      case "👆":
        return inc;
        break;
      case "👇":
        return dec;
        break;
      case "👉":
        return right;
        break;
      case "👈":
        return left;
        break;
      case "👊":
        return print;
        break;
    }
  },
  LoopExp(e1, e2, e3) {
    return loop(e2.eval());
  },
  _iter(...children) {
    return compose(...children.map((c) => c.eval()).reverse());
  },
});

const run = (input) => {
  const state = empty();
  const program = semantics(handlang.match(input)).eval();

  return program(state);
};

module.exports = { handlang, semantics, run };
