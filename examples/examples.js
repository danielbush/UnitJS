
var with_tests  = $dlb_id_au$.unitJS.with$.with_tests;
var with_tests$ = $dlb_id_au$.unitJS.with$.with_tests$;

// Example:

var tests = with_tests('section 1',function(M){
  M.tests('section 1.1',function(M){
    M.test('test a',function(){
      this.assert(true);
    });
  });
  M.test('test 1',function(){
    this.assert(true);
  });
});
//console.log(tests);


// Create your own testing with* function to make testing
// convenient.

var with_my_project = function(fn) {
  var with_tests  = $dlb_id_au$.unitJS.with$.with_tests;
  var L = {
    lib1:{foo:true},
    lib2:{},
    with_tests:function(){
      L.tests = with_tests.apply(null,arguments);
    },
    tests:null
  };
  fn(L);
  return L.tests;
};

tests = with_my_project(function(L){
  L.with_tests('section 1',function(M){

    M.tests('section 1.1',function(M){
      M.test('test b',function(){
        this.assert(L.lib1.foo);
      });
    });

    M.test('test a',function(){
      this.assert(false);
    });

  });
});
console.log(tests);
