// jQuery,$.AdminMy作为实参传给形参$,AdminMy
//不仅引入了jquery，还引入了prototype原型之类，防止变量污染其他作用域，$只作用域这个函数。

(function($, AdminMy) {})(jQuery, $.AdminMy)