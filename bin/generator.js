function* compute(a, b) {
  var foo = yield a + b;
  return foo;
}

var g = compute(2, 4);
console.log(g.next());
console.log(g.next('hello'));