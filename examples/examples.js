
var with_tests  = $dlb_id_au$.unitJS.with$.with_tests;
var with_tests$ = $dlb_id_au$.unitJS.with$.with_tests$;
var print       = $dlb_id_au$.unitJS.print.print;
var printButton = $dlb_id_au$.unitJS.print.printButton;
var toggleButton = $dlb_id_au$.unitJS.print.toggleButton;

// Example:
var tests;

tests = with_tests('section 1',function(M){

  M.setup(function(){
    console.log('setup OUTER called...');
    var o = {
      finished:false
    };
    return o;
  });
  M.teardown(function(o){
    console.log('teardown OUTER called...');
    o.finished = true;
    console.log(o.finished);
  });

  M.test('test 1',function(o){
    console.log('test called: test 1');
    console.log(o.finished);
    this.assert(true);
  });


  M.tests('section 1.1',function(M){
    M.setup(null); // To disable setup inheritance.
    M.teardown(function(){
      console.log('teardown NESTED called...');
    });
    M.test('test a',function(o){
      console.log('test called: test a');
      console.log(o.finished);
      this.assert(true);
    });
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
      return L.tests;
    },
    tests:null
  };
  fn(L);
  return L.tests;
};

tests = with_my_project(function(L){
  L.with_tests('section A',function(M){
    M.test('test a0',function(){
      this.assert(true);
    });

    M.tests('section A.1',function(M){
      M.test('test b',function(){
        this.assert(true);
        this.assert(L.lib1.foo);
      });
      M.tests('when such is the case...',function(M){
        M.test('test-1',function(o){
          this.assertEquals('True is true, right?',true,true);
          throw new Error('whoops');
        });
      });
    });

    M.test('test a',function(){
      this.assert(true);
      this.assert('omg! failure!',false);
      this.assert(true);
    });

    M.tests('section A.2 with passes',function(M){
      M.test('some test',function(){
        this.assert(true);
      });
    });

    M.tests('section A.3 with no assertions',function(M){
      M.test('test with no assertions',function(){
      });
    });


  });
});

console.log(tests);
var o = print(tests);

var wid = window.setInterval(function(){
  if(document.body){
    try {
      document.body.appendChild(
        toggleButton('Tests shown',o.hideTests,'Tests hidden'));
      document.body.appendChild(
        toggleButton('Details shown',o.hideDetails,'Details hidden'));
      document.body.appendChild(
        printButton('Failed only',o.showOnlyFailed));
      document.body.appendChild(o.node);
    } finally {
      window.clearInterval(wid);
    }
  }
},100);
