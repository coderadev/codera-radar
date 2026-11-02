(function () {
  const c = document.createElement("link").relList;
  if (c && c.supports && c.supports("modulepreload")) {
    return;
  }
  for (const a of document.querySelectorAll("link[rel=\"modulepreload\"]")) {
    e(a);
  }
  new MutationObserver(a => {
    for (const b of a) {
      if (b.type === "childList") {
        for (const a of b.addedNodes) {
          if (a.tagName === "LINK" && a.rel === "modulepreload") {
            e(a);
          }
        }
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function d(a) {
    const b = {};
    if (a.integrity) {
      b.integrity = a.integrity;
    }
    if (a.referrerPolicy) {
      b.referrerPolicy = a.referrerPolicy;
    }
    if (a.crossOrigin === "use-credentials") {
      b.credentials = "include";
    } else if (a.crossOrigin === "anonymous") {
      b.credentials = "omit";
    } else {
      b.credentials = "same-origin";
    }
    return b;
  }
  function e(c) {
    if (c.ep) {
      return;
    }
    c.ep = true;
    const g = d(c);
    fetch(c.href, g);
  }
})();
const a = (a, b) => a === b;
const b = Symbol("solid-proxy");
const c = Symbol("solid-track");
const d = {
  equals: a
};
let e = L;
const f = 1;
const g = 2;
const h = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var i = null;
let j = null;
let k = null;
let l = null;
let m = null;
let n = 0;
function o(a, b) {
  const c = k;
  const d = i;
  const e = a.length === 0;
  const f = e ? h : {
    owned: null,
    cleanups: null,
    context: null,
    owner: b === undefined ? d : b
  };
  const g = e ? a : () => a(() => u(() => P(f)));
  i = f;
  k = null;
  try {
    return I(g, true);
  } finally {
    k = c;
    i = d;
  }
}
function p(a, b) {
  b = b ? Object.assign({}, d, b) : d;
  const c = {
    value: a,
    observers: null,
    observerSlots: null,
    comparator: b.equals || undefined
  };
  const e = a => {
    if (typeof a == "function") {
      a = a(c.value);
    }
    return D(c, a);
  };
  return [C.bind(c), e];
}
function q(a, b, c) {
  const d = G(a, b, false, f);
  E(d);
}
function r(a, b, c) {
  e = M;
  const d = G(a, b, false, f);
  if (!c || !c.render) {
    d.user = true;
  }
  if (m) {
    m.push(d);
  } else {
    E(d);
  }
}
function s(a, b, c) {
  c = c ? Object.assign({}, d, c) : d;
  const e = G(a, b, true, 0);
  e.observers = null;
  e.observerSlots = null;
  e.comparator = c.equals || undefined;
  E(e);
  return C.bind(e);
}
function t(a) {
  return I(a, false);
}
function u(a) {
  if (k === null) {
    return a();
  }
  const b = k;
  k = null;
  try {
    return a();
  } finally {
    k = b;
  }
}
function v(a) {
  r(() => u(a));
}
function w(a) {
  if (i !== null) {
    if (i.cleanups === null) {
      i.cleanups = [a];
    } else {
      i.cleanups.push(a);
    }
  }
  return a;
}
function x() {
  return k;
}
function y(a, b) {
  const c = Symbol("context");
  return {
    id: c,
    Provider: U(c),
    defaultValue: a
  };
}
function A(a) {
  let b;
  if ((b = S(i, a.id)) !== undefined) {
    return b;
  } else {
    return a.defaultValue;
  }
}
function B(a) {
  const b = s(a);
  const c = s(() => T(b()));
  c.toArray = () => {
    const a = c();
    if (Array.isArray(a)) {
      return a;
    } else if (a != null) {
      return [a];
    } else {
      return [];
    }
  };
  return c;
}
function C() {
  if (this.sources && this.state) {
    if (this.state === f) {
      E(this);
    } else {
      const a = l;
      l = null;
      I(() => N(this), false);
      l = a;
    }
  }
  if (k) {
    const a = this.observers ? this.observers.length : 0;
    if (k.sources) {
      k.sources.push(this);
      k.sourceSlots.push(a);
    } else {
      k.sources = [this];
      k.sourceSlots = [a];
    }
    if (this.observers) {
      this.observers.push(k);
      this.observerSlots.push(k.sources.length - 1);
    } else {
      this.observers = [k];
      this.observerSlots = [k.sources.length - 1];
    }
  }
  return this.value;
}
function D(a, b, c) {
  let d = a.value;
  if (!a.comparator || !a.comparator(d, b)) {
    a.value = b;
    if (a.observers && a.observers.length) {
      I(() => {
        for (let b = 0; b < a.observers.length; b += 1) {
          const c = a.observers[b];
          const d = j && j.running;
          if (d) {
            j.disposed.has(c);
          }
          if (d ? !c.tState : !c.state) {
            if (c.pure) {
              l.push(c);
            } else {
              m.push(c);
            }
            if (c.observers) {
              O(c);
            }
          }
          if (!d) {
            c.state = f;
          }
        }
        if (l.length > 1000000) {
          l = [];
          throw new Error();
        }
      }, false);
    }
  }
  return b;
}
function E(a) {
  if (!a.fn) {
    return;
  }
  P(a);
  const b = i;
  const c = k;
  const d = n;
  k = i = a;
  F(a, a.value, d);
  k = c;
  i = b;
}
function F(a, b, c) {
  let d;
  try {
    d = a.fn(b);
  } catch (b) {
    if (a.pure) {
      a.state = f;
      if (a.owned) {
        a.owned.forEach(P);
      }
      a.owned = null;
    }
    a.updatedAt = c + 1;
    return R(b);
  }
  if (!a.updatedAt || a.updatedAt <= c) {
    if (a.updatedAt != null && "observers" in a) {
      D(a, d);
    } else {
      a.value = d;
    }
    a.updatedAt = c;
  }
}
function G(a, b, c, d = undefined, e) {
  if (d === undefined) d = f;
  const g = {
    fn: a,
    state: d,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: b,
    owner: i,
    context: null,
    pure: c
  };
  if (i !== null) {
    if (i !== h) {
      if (i.owned) {
        i.owned.push(g);
      } else {
        i.owned = [g];
      }
    }
  }
  return g;
}
function H(a) {
  if (a.state === 0) {
    return;
  }
  if (a.state === g) {
    return N(a);
  }
  if (a.suspense && u(a.suspense.inFallback)) {
    return a.suspense.effects.push(a);
  }
  const b = [a];
  while ((a = a.owner) && (!a.updatedAt || a.updatedAt < n)) {
    if (a.state) {
      b.push(a);
    }
  }
  for (let c = b.length - 1; c >= 0; c--) {
    a = b[c];
    if (a.state === f) {
      E(a);
    } else if (a.state === g) {
      const c = l;
      l = null;
      I(() => N(a, b[0]), false);
      l = c;
    }
  }
}
function I(a, b) {
  if (l) {
    return a();
  }
  let c = false;
  if (!b) {
    l = [];
  }
  if (m) {
    c = true;
  } else {
    m = [];
  }
  n++;
  try {
    const b = a();
    K(c);
    return b;
  } catch (a) {
    if (!c) {
      m = null;
    }
    l = null;
    R(a);
  }
}
function K(a) {
  if (l) {
    L(l);
    l = null;
  }
  if (a) {
    return;
  }
  const b = m;
  m = null;
  if (b.length) {
    I(() => e(b), false);
  }
}
function L(a) {
  for (let b = 0; b < a.length; b++) {
    H(a[b]);
  }
}
function M(a) {
  let b;
  let c = 0;
  for (b = 0; b < a.length; b++) {
    const d = a[b];
    if (d.user) {
      a[c++] = d;
    } else {
      H(d);
    }
  }
  for (b = 0; b < c; b++) {
    H(a[b]);
  }
}
function N(a, b) {
  a.state = 0;
  for (let c = 0; c < a.sources.length; c += 1) {
    const d = a.sources[c];
    if (d.sources) {
      const a = d.state;
      if (a === f) {
        if (d !== b && (!d.updatedAt || d.updatedAt < n)) {
          H(d);
        }
      } else if (a === g) {
        N(d, b);
      }
    }
  }
}
function O(a) {
  for (let b = 0; b < a.observers.length; b += 1) {
    const c = a.observers[b];
    if (!c.state) {
      c.state = g;
      if (c.pure) {
        l.push(c);
      } else {
        m.push(c);
      }
      if (c.observers) {
        O(c);
      }
    }
  }
}
function P(a) {
  let b;
  if (a.sources) {
    while (a.sources.length) {
      const b = a.sources.pop();
      const c = a.sourceSlots.pop();
      const d = b.observers;
      if (d && d.length) {
        const a = d.pop();
        const e = b.observerSlots.pop();
        if (c < d.length) {
          a.sourceSlots[e] = c;
          d[c] = a;
          b.observerSlots[c] = e;
        }
      }
    }
  }
  if (a.owned) {
    for (b = a.owned.length - 1; b >= 0; b--) {
      P(a.owned[b]);
    }
    a.owned = null;
  }
  if (a.cleanups) {
    for (b = a.cleanups.length - 1; b >= 0; b--) {
      a.cleanups[b]();
    }
    a.cleanups = null;
  }
  a.state = 0;
  a.context = null;
}
function R(a) {
  throw a;
}
function S(a, b) {
  if (a) {
    if (a.context && a.context[b] !== undefined) {
      return a.context[b];
    } else {
      return S(a.owner, b);
    }
  } else {
    return undefined;
  }
}
function T(a) {
  if (typeof a == "function" && !a.length) {
    return T(a());
  }
  if (Array.isArray(a)) {
    const b = [];
    for (let c = 0; c < a.length; c++) {
      const d = T(a[c]);
      if (Array.isArray(d)) {
        b.push.apply(b, d);
      } else {
        b.push(d);
      }
    }
    return b;
  }
  return a;
}
function U(a, b) {
  return function (b) {
    let c;
    q(() => c = u(() => {
      i.context = {
        [a]: b.value
      };
      return B(() => b.children);
    }), undefined);
    return c;
  };
}
function V(a, b) {
  return u(() => a(b || {}));
}
const W = a => "Stale read from <" + a + ">.";
function X(a) {
  const b = a.keyed;
  const c = s(() => a.when, undefined, {
    equals: (a, c) => b ? a === c : !a == !c
  });
  return s(() => {
    const d = c();
    if (d) {
      const e = a.children;
      if (typeof e == "function" && e.length > 0) {
        return u(() => e(b ? d : () => {
          if (!u(c)) {
            throw W("Show");
          }
          return a.when;
        }));
      } else {
        return e;
      }
    }
    return a.fallback;
  }, undefined, undefined);
}
function Y(a, b, c) {
  let d = c.length;
  let e = b.length;
  let f = d;
  let g = 0;
  let h = 0;
  let i = b[e - 1].nextSibling;
  let j = null;
  while (g < e || h < f) {
    if (b[g] === c[h]) {
      g++;
      h++;
      continue;
    }
    while (b[e - 1] === c[f - 1]) {
      e--;
      f--;
    }
    if (e === g) {
      const b = f < d ? h ? c[h - 1].nextSibling : c[f - h] : i;
      while (h < f) {
        a.insertBefore(c[h++], b);
      }
    } else if (f === h) {
      while (g < e) {
        if (!j || !j.has(b[g])) {
          b[g].remove();
        }
        g++;
      }
    } else if (b[g] === c[f - 1] && c[h] === b[e - 1]) {
      const d = b[--e].nextSibling;
      a.insertBefore(c[h++], b[g++].nextSibling);
      a.insertBefore(c[--f], d);
      b[e] = c[f];
    } else {
      if (!j) {
        j = new Map();
        let a = h;
        while (a < f) {
          j.set(c[a], a++);
        }
      }
      const d = j.get(b[g]);
      if (d != null) {
        if (h < d && d < f) {
          let i = g;
          let k = 1;
          let l;
          while (++i < e && i < f && (l = j.get(b[i])) != null && l === d + k) {
            k++;
          }
          if (k > d - h) {
            const e = b[g];
            while (h < d) {
              a.insertBefore(c[h++], e);
            }
          } else {
            a.replaceChild(c[h++], b[g++]);
          }
        } else {
          g++;
        }
      } else {
        b[g++].remove();
      }
    }
  }
}
const Z = "_$DX_DELEGATE";
function $(a, b, c, d = undefined) {
  if (d === undefined) d = {};
  let e;
  o(d => {
    e = d;
    if (b === document) {
      a();
    } else {
      Wa(b, a(), b.firstChild ? null : undefined, c);
    }
  }, d.owner);
  return () => {
    e();
    b.textContent = "";
  };
}
function _(a, b, c) {
  let d;
  const e = () => {
    const b = document.createElement("template");
    b.innerHTML = a;
    if (c) {
      return b.content.firstChild.firstChild;
    } else {
      return b.content.firstChild;
    }
  };
  const f = b ? () => u(() => document.importNode(d ||= e(), true)) : () => (d ||= e()).cloneNode(true);
  f.cloneNode = f;
  return f;
}
function ka(a, b = undefined) {
  if (b === undefined) b = window.document;
  const c = b[Z] ||= new Set();
  for (let d = 0, e = a.length; d < e; d++) {
    const e = a[d];
    if (!c.has(e)) {
      c.add(e);
      b.addEventListener(e, ab);
    }
  }
}
function pa(a, b, c) {
  if (c == null) {
    a.removeAttribute(b);
  } else {
    a.setAttribute(b, c);
  }
}
function Ea(a, b) {
  if (b == null) {
    a.removeAttribute("class");
  } else {
    a.className = b;
  }
}
function Pa(a, b, c = undefined) {
  if (c === undefined) c = {};
  const d = Object.keys(b || {});
  const e = Object.keys(c);
  let f;
  let g;
  f = 0;
  g = e.length;
  for (; f < g; f++) {
    const d = e[f];
    if (!!d && d !== "undefined" && !b[d]) {
      _a(a, d, false);
      delete c[d];
    }
  }
  f = 0;
  g = d.length;
  for (; f < g; f++) {
    const e = d[f];
    const g = !!b[e];
    if (!!e && e !== "undefined" && c[e] !== g && !!g) {
      _a(a, e, true);
      c[e] = g;
    }
  }
  return c;
}
function Wa(a, b, c, d) {
  if (c !== undefined && !d) {
    d = [];
  }
  if (typeof b != "function") {
    return bb(a, b, d, c);
  }
  q(d => bb(a, b(), d, c), d);
}
function _a(a, b, c) {
  const d = b.trim().split(/\s+/);
  for (let e = 0, f = d.length; e < f; e++) {
    a.classList.toggle(d[e], c);
  }
}
function ab(a) {
  const b = "$$" + a.type;
  let c = a.composedPath && a.composedPath()[0] || a.target;
  if (a.target !== c) {
    Object.defineProperty(a, "target", {
      configurable: true,
      value: c
    });
  }
  Object.defineProperty(a, "currentTarget", {
    configurable: true,
    get() {
      return c || document;
    }
  });
  while (c) {
    const d = c[b];
    if (d && !c.disabled) {
      const e = c[b + "Data"];
      if (e !== undefined) {
        d.call(c, e, a);
      } else {
        d.call(c, a);
      }
      if (a.cancelBubble) {
        return;
      }
    }
    c = c._$host || c.parentNode || c.host;
  }
}
function bb(a, b, c, d, e) {
  while (typeof c == "function") {
    c = c();
  }
  if (b === c) {
    return c;
  }
  const f = typeof b;
  const g = d !== undefined;
  a = g && c[0] && c[0].parentNode || a;
  if (f === "string" || f === "number") {
    if (f === "number") {
      b = b.toString();
    }
    if (g) {
      let e = c[0];
      if (e && e.nodeType === 3) {
        e.data = b;
      } else {
        e = document.createTextNode(b);
      }
      c = db(a, c, d, e);
    } else if (c !== "" && typeof c == "string") {
      c = a.firstChild.data = b;
    } else {
      c = a.textContent = b;
    }
  } else if (b == null || f === "boolean") {
    c = db(a, c, d);
  } else {
    if (f === "function") {
      q(() => {
        let e = b();
        while (typeof e == "function") {
          e = e();
        }
        c = bb(a, e, c, d);
      });
      return () => c;
    }
    if (Array.isArray(b)) {
      const f = [];
      const h = c && Array.isArray(c);
      if (cb(f, b, c, e)) {
        q(() => c = bb(a, f, c, d, true));
        return () => c;
      }
      if (f.length === 0) {
        c = db(a, c, d);
        if (g) {
          return c;
        }
      } else if (h) {
        if (c.length === 0) {
          Va(a, f, d);
        } else {
          Y(a, c, f);
        }
      } else {
        if (c) {
          db(a);
        }
        Va(a, f);
      }
      c = f;
    } else if (b.nodeType) {
      if (Array.isArray(c)) {
        if (g) {
          return c = db(a, c, d, b);
        }
        db(a, c, null, b);
      } else if (c == null || c === "" || !a.firstChild) {
        a.appendChild(b);
      } else {
        a.replaceChild(b, a.firstChild);
      }
      c = b;
    } else {
      console.warn("Unrecognized value. Skipped inserting", b);
    }
  }
  return c;
}
function cb(a, b, c, d) {
  let e = false;
  for (let f = 0, g = b.length; f < g; f++) {
    let g = b[f];
    let h = c && c[f];
    let i;
    if (g != null && g !== true && g !== false) {
      if ((i = typeof g) == "object" && g.nodeType) {
        a.push(g);
      } else if (Array.isArray(g)) {
        e = cb(a, g, h) || e;
      } else if (i === "function") {
        if (d) {
          while (typeof g == "function") {
            g = g();
          }
          e = cb(a, Array.isArray(g) ? g : [g], Array.isArray(h) ? h : [h]) || e;
        } else {
          a.push(g);
          e = true;
        }
      } else {
        const b = String(g);
        if (h && h.nodeType === 3 && h.data === b) {
          a.push(h);
        } else {
          a.push(document.createTextNode(b));
        }
      }
    }
  }
  return e;
}
function Va(a, b, c = null) {
  for (let d = 0, e = b.length; d < e; d++) {
    a.insertBefore(b[d], c);
  }
}
function db(a, b, c, d) {
  if (c === undefined) {
    return a.textContent = "";
  }
  const e = d || document.createTextNode("");
  if (b.length) {
    let d = false;
    for (let f = b.length - 1; f >= 0; f--) {
      const g = b[f];
      if (e !== g) {
        const b = g.parentNode === a;
        if (!d && !f) {
          if (b) {
            a.replaceChild(e, g);
          } else {
            a.insertBefore(e, c);
          }
        } else if (b) {
          g.remove();
        }
      } else {
        d = true;
      }
    }
  } else {
    a.insertBefore(e, c);
  }
  return [e];
}
const eb = "_App_1r7e7_1";
const fb = {
  App: eb
};
const gb = Symbol("store-raw");
const qa = Symbol("store-node");
function hb(a) {
  let c = a[b];
  if (!c && (Object.defineProperty(a, b, {
    value: c = new Proxy(a, pb)
  }), !Array.isArray(a))) {
    const b = Object.keys(a);
    const d = Object.getOwnPropertyDescriptors(a);
    for (let e = 0, f = b.length; e < f; e++) {
      const f = b[e];
      if (d[f].get) {
        Object.defineProperty(a, f, {
          enumerable: d[f].enumerable,
          get: d[f].get.bind(c)
        });
      }
    }
  }
  return c;
}
function ib(a) {
  let c;
  return a != null && typeof a == "object" && (a[b] || !(c = Object.getPrototypeOf(a)) || c === Object.prototype || Array.isArray(a));
}
function jb(a, b = undefined) {
  if (b === undefined) b = new Set();
  let c;
  let d;
  let e;
  let f;
  if (c = a != null && a[gb]) {
    return c;
  }
  if (!ib(a) || b.has(a)) {
    return a;
  }
  if (Array.isArray(a)) {
    if (Object.isFrozen(a)) {
      a = a.slice(0);
    } else {
      b.add(a);
    }
    for (let c = 0, f = a.length; c < f; c++) {
      e = a[c];
      if ((d = jb(e, b)) !== e) {
        a[c] = d;
      }
    }
  } else {
    if (Object.isFrozen(a)) {
      a = Object.assign({}, a);
    } else {
      b.add(a);
    }
    const c = Object.keys(a);
    const g = Object.getOwnPropertyDescriptors(a);
    for (let h = 0, i = c.length; h < i; h++) {
      f = c[h];
      if (!g[f].get) {
        e = a[f];
        if ((d = jb(e, b)) !== e) {
          a[f] = d;
        }
      }
    }
  }
  return a;
}
function kb(a) {
  let b = a[qa];
  if (!b) {
    Object.defineProperty(a, qa, {
      value: b = Object.create(null)
    });
  }
  return b;
}
function lb(a, b, c) {
  return a[b] ||= ob(c);
}
function Xa(a, c) {
  const d = Reflect.getOwnPropertyDescriptor(a, c);
  if (!!d && !d.get && !!d.configurable && c !== b && c !== qa) {
    delete d.value;
    delete d.writable;
    d.get = () => a[b][c];
  }
  return d;
}
function mb(a) {
  if (x()) {
    const b = kb(a);
    (b._ ||= ob())();
  }
}
function nb(a) {
  mb(a);
  return Reflect.ownKeys(a);
}
function ob(a) {
  const [b, c] = p(a, {
    equals: false,
    internal: true
  });
  b.$ = c;
  return b;
}
const pb = {
  get(a, d, e) {
    if (d === gb) {
      return a;
    }
    if (d === b) {
      return e;
    }
    if (d === c) {
      mb(a);
      return e;
    }
    const f = kb(a);
    const g = f[d];
    let h = g ? g() : a[d];
    if (d === qa || d === "__proto__") {
      return h;
    }
    if (!g) {
      const b = Object.getOwnPropertyDescriptor(a, d);
      if (x() && (typeof h != "function" || a.hasOwnProperty(d)) && (!b || !b.get)) {
        h = lb(f, d, h)();
      }
    }
    if (ib(h)) {
      return hb(h);
    } else {
      return h;
    }
  },
  has(a, d) {
    if (d === gb || d === b || d === c || d === qa || d === "__proto__") {
      return true;
    } else {
      this.get(a, d, a);
      return d in a;
    }
  },
  set() {
    return true;
  },
  deleteProperty() {
    return true;
  },
  ownKeys: nb,
  getOwnPropertyDescriptor: Xa
};
function qb(a, b, c, d = false) {
  if (!d && a[b] === c) {
    return;
  }
  const e = a[b];
  const f = a.length;
  if (c === undefined) {
    delete a[b];
  } else {
    a[b] = c;
  }
  let g = kb(a);
  let h;
  if (h = lb(g, b, e)) {
    h.$(() => c);
  }
  if (Array.isArray(a) && a.length !== f) {
    for (let b = a.length; b < f; b++) {
      if (h = g[b]) {
        h.$();
      }
    }
    if (h = lb(g, "length", f)) {
      h.$(a.length);
    }
  }
  if (h = g._) {
    h.$();
  }
}
function rb(a, b) {
  const c = Object.keys(b);
  for (let d = 0; d < c.length; d += 1) {
    const e = c[d];
    qb(a, e, b[e]);
  }
}
function sb(a, b) {
  if (typeof b == "function") {
    b = b(a);
  }
  b = jb(b);
  if (Array.isArray(b)) {
    if (a === b) {
      return;
    }
    let c = 0;
    let d = b.length;
    for (; c < d; c++) {
      const d = b[c];
      if (a[c] !== d) {
        qb(a, c, d);
      }
    }
    qb(a, "length", d);
  } else {
    rb(a, b);
  }
}
function tb(a, b, c = undefined) {
  if (c === undefined) c = [];
  let d;
  let e = a;
  if (b.length > 1) {
    d = b.shift();
    const f = typeof d;
    const g = Array.isArray(a);
    if (Array.isArray(d)) {
      for (let e = 0; e < d.length; e++) {
        tb(a, [d[e]].concat(b), c);
      }
      return;
    } else if (g && f === "function") {
      for (let e = 0; e < a.length; e++) {
        if (d(a[e], e)) {
          tb(a, [e].concat(b), c);
        }
      }
      return;
    } else if (g && f === "object") {
      const {
        from: e = 0,
        to: f = a.length - 1,
        by: g = 1
      } = d;
      for (let d = e; d <= f; d += g) {
        tb(a, [d].concat(b), c);
      }
      return;
    } else if (b.length > 1) {
      tb(a[d], b, [d].concat(c));
      return;
    }
    e = a[d];
    c = [d].concat(c);
  }
  let f = b[0];
  if ((typeof f != "function" || !(f = f(e, c), f === e)) && (d !== undefined || f != null)) {
    f = jb(f);
    if (d === undefined || ib(e) && ib(f) && !Array.isArray(f)) {
      rb(e, f);
    } else {
      qb(a, d, f);
    }
  }
}
function ub(...[a, b]) {
  const c = jb(a || {});
  const d = Array.isArray(c);
  const e = hb(c);
  function f(...a) {
    t(() => {
      if (d && a.length === 1) {
        sb(c, a[0]);
      } else {
        tb(c, a);
      }
    });
  }
  return [e, f];
}
function vb(a, b) {
  const c = y(b);
  return [b => V(c.Provider, {
    value: a(b),
    get children() {
      return b.children;
    }
  }), () => A(c)];
}
const [wb, xb] = vb(() => {
  const [a, b] = ub({
    radarEnabled: false,
    frontPlate: "1234567",
    rearPlate: "1234567",
    patrolSpeed: 156
  });
  const [c, d] = p("");
  return {
    data: a,
    setData: b,
    transform: c,
    setTransform: d
  };
});
const yb = () => xb();
const zb = "_radar_1b3zc_1";
const Ab = "_container_1b3zc_19";
const Bb = "_section_1b3zc_42";
const Cb = "_text_1b3zc_55";
const Db = "_typeContainer_1b3zc_65";
const Eb = "_typeText_1b3zc_77";
const Fb = "_red_1b3zc_86";
const Gb = "_active_1b3zc_89";
const Hb = "_speedContainer_1b3zc_92";
const Ib = "_speedText_1b3zc_103";
const Jb = "_bottom_1b3zc_117";
const Kb = {
  radar: zb,
  container: Ab,
  section: Bb,
  text: Cb,
  typeContainer: Db,
  typeText: Eb,
  red: Fb,
  active: Gb,
  speedContainer: Hb,
  speedText: Ib,
  bottom: Jb
};
const Lb = "_text_15kt0_1";
const Mb = "_plate_15kt0_12";
const Nb = "_plateText_15kt0_24";
const Ob = {
  text: Lb,
  plate: Mb,
  plateText: Nb
};
const Sa = _("<div class=\"flex flex-col items-center justify-center gap-[1.48vh]\"><div><div></div></div><div class=\"flex justify-center items-center\"><svg width=\"11.85vh\" height=\"0.83vh\" viewBox=\"0 0 128 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1 0V5.58033C1 6.91668 2.08332 8 3.41967 8H32.5M127 0V5.58033C127 6.91668 125.917 8 124.58 8H95.5\" stroke=\"white\" stroke-opacity=\"0.14\" stroke-width=\"0.806557\"></path></svg><div>");
function Pb(a) {
  const {
    data: b
  } = yb();
  return (() => {
    const c = Sa();
    const d = c.firstChild;
    const e = d.firstChild;
    const f = d.nextSibling;
    const g = f.firstChild;
    const h = g.nextSibling;
    Wa(e, () => a.type === "fwd" ? b.frontPlate : b.rearPlate);
    Wa(h, () => a.type === "fwd" ? "FRONT" : "REAR");
    q(a => {
      const b = Ob.plate;
      const c = Ob.plateText;
      const f = Ob.text;
      if (b !== a._v$) {
        Ea(d, a._v$ = b);
      }
      if (c !== a._v$2) {
        Ea(e, a._v$2 = c);
      }
      if (f !== a._v$3) {
        Ea(h, a._v$3 = f);
      }
      return a;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return c;
  })();
}
const Qb = "_text_10wrk_1";
const Rb = "_speedContainer_10wrk_12";
const Sb = "_speedText_10wrk_24";
const Tb = {
  text: Qb,
  speedContainer: Rb,
  speedText: Sb
};
const Ca = _("<div class=\"flex flex-row items-center justify-center pr-[0.74vh]\"><div class=\"flex flex-col items-center justify-center gap-[0.55vh]\"><div class=\"flex flex-col justify-center items-center\"><div><div></div></div></div><div class=\"flex justify-center items-center\"><svg width=\"16.48vh\" height=\"0.83vh\" viewBox=\"0 0 178 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1 0V5.58033C1 6.91668 2.08332 8 3.41967 8H45M177 0V5.58033C177 6.91668 175.917 8 174.58 8H133\" stroke=\"white\" stroke-opacity=\"0.14\" stroke-width=\"0.806557\"></path></svg><div>PATROL SPEED");
function Ub() {
  const {
    data: a
  } = yb();
  return (() => {
    const b = Ca();
    const c = b.firstChild;
    const d = c.firstChild;
    const e = d.firstChild;
    const f = e.firstChild;
    const g = d.nextSibling;
    const h = g.firstChild;
    const i = h.nextSibling;
    Wa(f, () => a.patrolSpeed);
    q(a => {
      const b = Tb.speedContainer;
      const c = Tb.speedText;
      const d = Tb.text;
      if (b !== a._v$) {
        Ea(e, a._v$ = b);
      }
      if (c !== a._v$2) {
        Ea(f, a._v$2 = c);
      }
      if (d !== a._v$3) {
        Ea(i, a._v$3 = d);
      }
      return a;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined
    });
    return b;
  })();
}
const Vb = _("<div class=\"flex flex-row items-center justify-center pl-[0.74vh] pr-[0.74vh] gap-[1.11vh]\"><div class=\"flex flex-col justify-center items-center gap-[0.37vh]\"><div><div>SAME</div><div>OPP</div><div>XMIT</div></div><div><div></div></div></div><div class=\"flex flex-col justify-center items-center gap-[0.37vh]\"><div><div>LOCK</div><div>FAST</div></div><div><div>");
const Wb = _("<div class=\"flex flex-row items-center justify-center\"><div class=\"flex flex-col items-center justify-center gap-[0.55vh]\"><div class=\"flex justify-center items-center\"><svg width=\"21.94vh\" height=\"0.83vh\" viewBox=\"0 0 237 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1 0V5.6459C1 6.98225 2.08332 8.06557 3.41967 8.06557H59.8787H89.318M236.515 0V5.6459C236.515 6.98225 235.431 8.06557 234.095 8.06557H177.636H148.197\" stroke=\"white\" stroke-opacity=\"0.14\" stroke-width=\"0.806557\"></path></svg><div></div></div></div><svg width=\"1.01vh\" height=\"2.96vh\" viewBox=\"0 0 11 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5.75825 0.875427L0.515625 6.11805H11.0009L5.75825 0.875427Z\" fill=\"#F86969\"></path><path d=\"M5.75825 31.1213L0.515625 25.8787H11.0009L5.75825 31.1213Z\" fill=\"#F86969\">");
const Xb = _("<div class=\"flex flex-col items-end justify-end pb-[1.9vh]\"><div><div><div></div><div><div class=\"flex flex-row items-center justify-center gap-[0.74vh]\"></div></div></div></div><div>");
function Yb(a) {
  const {
    data: b
  } = yb();
  return (() => {
    const c = Vb();
    const d = c.firstChild;
    const e = d.firstChild;
    const f = e.firstChild;
    const g = f.nextSibling;
    const h = g.nextSibling;
    const i = e.nextSibling;
    const j = i.firstChild;
    const k = d.nextSibling;
    const l = k.firstChild;
    const m = l.firstChild;
    const n = m.nextSibling;
    const o = l.nextSibling;
    const p = o.firstChild;
    Wa(j, () => b[a.type].Speed);
    Wa(p, () => b[a.type].FastSpeed);
    q(c => {
      const d = Kb.typeContainer;
      const k = Kb.typeText;
      const q = {
        [Kb.active]: b[a.type].Mode === "same"
      };
      const r = Kb.typeText;
      const s = {
        [Kb.active]: b[a.type].Mode === "opp"
      };
      const t = Kb.typeText;
      const u = {
        [Kb.active]: b[a.type].Xmit
      };
      const v = Kb.speedContainer;
      const w = Kb.speedText;
      const x = Kb.typeContainer;
      const y = Kb.typeText;
      const z = {
        [Kb.active]: b[a.type].FastLocked,
        [Kb.red]: true
      };
      const A = Kb.typeText;
      const B = {
        [Kb.active]: b[a.type].Fast !== "",
        [Kb.red]: true
      };
      const C = Kb.speedContainer;
      const D = Kb.speedText;
      const E = {
        [Kb.red]: true
      };
      if (d !== c._v$) {
        Ea(e, c._v$ = d);
      }
      if (k !== c._v$2) {
        Ea(f, c._v$2 = k);
      }
      c._v$3 = Pa(f, q, c._v$3);
      if (r !== c._v$4) {
        Ea(g, c._v$4 = r);
      }
      c._v$5 = Pa(g, s, c._v$5);
      if (t !== c._v$6) {
        Ea(h, c._v$6 = t);
      }
      c._v$7 = Pa(h, u, c._v$7);
      if (v !== c._v$8) {
        Ea(i, c._v$8 = v);
      }
      if (w !== c._v$9) {
        Ea(j, c._v$9 = w);
      }
      if (x !== c._v$10) {
        Ea(l, c._v$10 = x);
      }
      if (y !== c._v$11) {
        Ea(m, c._v$11 = y);
      }
      c._v$12 = Pa(m, z, c._v$12);
      if (A !== c._v$13) {
        Ea(n, c._v$13 = A);
      }
      c._v$14 = Pa(n, B, c._v$14);
      if (C !== c._v$15) {
        Ea(o, c._v$15 = C);
      }
      if (D !== c._v$16) {
        Ea(p, c._v$16 = D);
      }
      c._v$17 = Pa(p, E, c._v$17);
      return c;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined,
      _v$9: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined,
      _v$14: undefined,
      _v$15: undefined,
      _v$16: undefined,
      _v$17: undefined
    });
    return c;
  })();
}
function Zb(a) {
  const {
    data: b
  } = yb();
  return (() => {
    const c = Wb();
    const d = c.firstChild;
    const e = d.firstChild;
    const f = e.firstChild;
    const g = f.nextSibling;
    const h = d.nextSibling;
    const i = h.firstChild;
    const j = i.nextSibling;
    Wa(d, V(Yb, {
      get type() {
        return a.type;
      }
    }), e);
    Wa(g, () => a.type === "fwd" ? "FRONT" : "REAR");
    q(c => {
      const d = Kb.text;
      const e = b[a.type].Dir ? "1" : "0.34";
      const f = b[a.type].Dir ? "0.34" : "1";
      if (d !== c._v$18) {
        Ea(g, c._v$18 = d);
      }
      if (e !== c._v$19) {
        pa(i, "fill-opacity", c._v$19 = e);
      }
      if (f !== c._v$20) {
        pa(j, "fill-opacity", c._v$20 = f);
      }
      return c;
    }, {
      _v$18: undefined,
      _v$19: undefined,
      _v$20: undefined
    });
    return c;
  })();
}
function $b() {
  const {
    transform: a
  } = yb();
  return (() => {
    const b = Xb();
    const c = b.firstChild;
    const d = c.firstChild;
    const e = d.firstChild;
    const f = e.nextSibling;
    const g = f.firstChild;
    const h = c.nextSibling;
    b.style.setProperty("transform-origin", "bottom right");
    b.style.setProperty("transition", "all 0.2s ease-in-out");
    Wa(e, V(Zb, {
      type: "fwd"
    }), null);
    Wa(e, V(Zb, {
      type: "bwd"
    }), null);
    Wa(g, V(Pb, {
      type: "fwd"
    }), null);
    Wa(g, V(Pb, {
      type: "bwd"
    }), null);
    Wa(f, V(Ub, {}), null);
    q(g => {
      const i = a() + " scale(0.8)";
      const j = Kb.radar;
      const k = Kb.container;
      const l = Kb.section;
      const m = Kb.section;
      const n = Kb.bottom;
      if (i !== g._v$21) {
        if ((g._v$21 = i) != null) {
          b.style.setProperty("transform", i);
        } else {
          b.style.removeProperty("transform");
        }
      }
      if (j !== g._v$22) {
        Ea(c, g._v$22 = j);
      }
      if (k !== g._v$23) {
        Ea(d, g._v$23 = k);
      }
      if (l !== g._v$24) {
        Ea(e, g._v$24 = l);
      }
      if (m !== g._v$25) {
        Ea(f, g._v$25 = m);
      }
      if (n !== g._v$26) {
        Ea(h, g._v$26 = n);
      }
      return g;
    }, {
      _v$21: undefined,
      _v$22: undefined,
      _v$23: undefined,
      _v$24: undefined,
      _v$25: undefined,
      _v$26: undefined
    });
    return b;
  })();
}
var _b;
(function (a) {
  a.assertEqual = a => a;
  function b(a) {}
  a.assertIs = b;
  function c(a) {
    throw new Error();
  }
  a.assertNever = c;
  a.arrayToEnum = a => {
    const b = {};
    for (const c of a) {
      b[c] = c;
    }
    return b;
  };
  a.getValidEnumValues = b => {
    const c = a.objectKeys(b).filter(a => typeof b[b[a]] != "number");
    const d = {};
    for (const a of c) {
      d[a] = b[a];
    }
    return a.objectValues(d);
  };
  a.objectValues = b => a.objectKeys(b).map(function (a) {
    return b[a];
  });
  a.objectKeys = typeof Object.keys == "function" ? a => Object.keys(a) : a => {
    const b = [];
    for (const c in a) {
      if (Object.prototype.hasOwnProperty.call(a, c)) {
        b.push(c);
      }
    }
    return b;
  };
  a.find = (a, b) => {
    for (const c of a) {
      if (b(c)) {
        return c;
      }
    }
  };
  a.isInteger = typeof Number.isInteger == "function" ? a => Number.isInteger(a) : a => typeof a == "number" && isFinite(a) && Math.floor(a) === a;
  function d(a, b = " | ") {
    return a.map(a => typeof a == "string" ? "'" + a + "'" : a).join(b);
  }
  a.joinValues = d;
  a.jsonStringifyReplacer = (a, b) => typeof b == "bigint" ? b.toString() : b;
})(_b ||= {});
var jc;
(function (a) {
  a.mergeShapes = (a, b) => ({
    ...a,
    ...b
  });
})(jc ||= {});
const Ga = _b.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]);
const qc = a => {
  switch (typeof a) {
    case "undefined":
      return Ga.undefined;
    case "string":
      return Ga.string;
    case "number":
      if (isNaN(a)) {
        return Ga.nan;
      } else {
        return Ga.number;
      }
    case "boolean":
      return Ga.boolean;
    case "function":
      return Ga.function;
    case "bigint":
      return Ga.bigint;
    case "symbol":
      return Ga.symbol;
    case "object":
      if (Array.isArray(a)) {
        return Ga.array;
      } else if (a === null) {
        return Ga.null;
      } else if (a.then && typeof a.then == "function" && a.catch && typeof a.catch == "function") {
        return Ga.promise;
      } else if (typeof Map !== "undefined" && a instanceof Map) {
        return Ga.map;
      } else if (typeof Set !== "undefined" && a instanceof Set) {
        return Ga.set;
      } else if (typeof Date !== "undefined" && a instanceof Date) {
        return Ga.date;
      } else {
        return Ga.object;
      }
    default:
      return Ga.unknown;
  }
};
const Cc = _b.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
const J = a => JSON.stringify(a, null, 2).replace(/"([^"]+)":/g, "$1:");
class Fc extends Error {
  constructor(a) {
    super();
    this.issues = [];
    this.addIssue = a => {
      this.issues = [...this.issues, a];
    };
    this.addIssues = (a = undefined) => {
      if (a === undefined) a = [];
      this.issues = [...this.issues, ...a];
    };
    const b = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, b);
    } else {
      this.__proto__ = b;
    }
    this.name = "ZodError";
    this.issues = a;
  }
  get errors() {
    return this.issues;
  }
  format(a) {
    const b = a || function (a) {
      return a.message;
    };
    const c = {
      _errors: []
    };
    const d = a => {
      for (const e of a.issues) {
        if (e.code === "invalid_union") {
          e.unionErrors.map(d);
        } else if (e.code === "invalid_return_type") {
          d(e.returnTypeError);
        } else if (e.code === "invalid_arguments") {
          d(e.argumentsError);
        } else if (e.path.length === 0) {
          c._errors.push(b(e));
        } else {
          let a = c;
          let d = 0;
          while (d < e.path.length) {
            const c = e.path[d];
            if (d === e.path.length - 1) {
              a[c] = a[c] || {
                _errors: []
              };
              a[c]._errors.push(b(e));
            } else {
              a[c] = a[c] || {
                _errors: []
              };
            }
            a = a[c];
            d++;
          }
        }
      }
    };
    d(this);
    return c;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, _b.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(a = undefined) {
    if (a === undefined) a = a => a.message;
    const b = {};
    const c = [];
    for (const d of this.issues) {
      if (d.path.length > 0) {
        b[d.path[0]] = b[d.path[0]] || [];
        b[d.path[0]].push(a(d));
      } else {
        c.push(a(d));
      }
    }
    return {
      formErrors: c,
      fieldErrors: b
    };
  }
  get formErrors() {
    return this.flatten();
  }
}
Fc.create = a => new Fc(a);
const Gc = (a, b) => {
  let c;
  switch (a.code) {
    case Cc.invalid_type:
      if (a.received === Ga.undefined) {
        c = "Required";
      } else {
        c = "Expected " + a.expected + ", received " + a.received;
      }
      break;
    case Cc.invalid_literal:
      c = "Invalid literal value, expected " + JSON.stringify(a.expected, _b.jsonStringifyReplacer);
      break;
    case Cc.unrecognized_keys:
      c = "Unrecognized key(s) in object: " + _b.joinValues(a.keys, ", ");
      break;
    case Cc.invalid_union:
      c = "Invalid input";
      break;
    case Cc.invalid_union_discriminator:
      c = "Invalid discriminator value. Expected " + _b.joinValues(a.options);
      break;
    case Cc.invalid_enum_value:
      c = "Invalid enum value. Expected " + _b.joinValues(a.options) + ", received '" + a.received + "'";
      break;
    case Cc.invalid_arguments:
      c = "Invalid function arguments";
      break;
    case Cc.invalid_return_type:
      c = "Invalid function return type";
      break;
    case Cc.invalid_date:
      c = "Invalid date";
      break;
    case Cc.invalid_string:
      if (typeof a.validation == "object") {
        if ("includes" in a.validation) {
          c = "Invalid input: must include \"" + a.validation.includes + "\"";
          if (typeof a.validation.position == "number") {
            c = c + " at one or more positions greater than or equal to " + a.validation.position;
          }
        } else if ("startsWith" in a.validation) {
          c = "Invalid input: must start with \"" + a.validation.startsWith + "\"";
        } else if ("endsWith" in a.validation) {
          c = "Invalid input: must end with \"" + a.validation.endsWith + "\"";
        } else {
          _b.assertNever(a.validation);
        }
      } else if (a.validation !== "regex") {
        c = "Invalid " + a.validation;
      } else {
        c = "Invalid";
      }
      break;
    case Cc.too_small:
      if (a.type === "array") {
        c = "Array must contain " + (a.exact ? "exactly" : a.inclusive ? "at least" : "more than") + " " + a.minimum + " element(s)";
      } else if (a.type === "string") {
        c = "String must contain " + (a.exact ? "exactly" : a.inclusive ? "at least" : "over") + " " + a.minimum + " character(s)";
      } else if (a.type === "number") {
        c = "Number must be " + (a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than ") + a.minimum;
      } else if (a.type === "date") {
        c = "Date must be " + (a.exact ? "exactly equal to " : a.inclusive ? "greater than or equal to " : "greater than ") + new Date(Number(a.minimum));
      } else {
        c = "Invalid input";
      }
      break;
    case Cc.too_big:
      if (a.type === "array") {
        c = "Array must contain " + (a.exact ? "exactly" : a.inclusive ? "at most" : "less than") + " " + a.maximum + " element(s)";
      } else if (a.type === "string") {
        c = "String must contain " + (a.exact ? "exactly" : a.inclusive ? "at most" : "under") + " " + a.maximum + " character(s)";
      } else if (a.type === "number") {
        c = "Number must be " + (a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than") + " " + a.maximum;
      } else if (a.type === "bigint") {
        c = "BigInt must be " + (a.exact ? "exactly" : a.inclusive ? "less than or equal to" : "less than") + " " + a.maximum;
      } else if (a.type === "date") {
        c = "Date must be " + (a.exact ? "exactly" : a.inclusive ? "smaller than or equal to" : "smaller than") + " " + new Date(Number(a.maximum));
      } else {
        c = "Invalid input";
      }
      break;
    case Cc.custom:
      c = "Invalid input";
      break;
    case Cc.invalid_intersection_types:
      c = "Intersection results could not be merged";
      break;
    case Cc.not_multiple_of:
      c = "Number must be a multiple of " + a.multipleOf;
      break;
    case Cc.not_finite:
      c = "Number must be finite";
      break;
    default:
      c = b.defaultError;
      _b.assertNever(a);
  }
  return {
    message: c
  };
};
let Hc = Gc;
function Jc(a) {
  Hc = a;
}
function Kc() {
  return Hc;
}
const Lc = a => {
  const {
    data: b,
    path: c,
    errorMaps: d,
    issueData: e
  } = a;
  const f = [...c, ...(e.path || [])];
  const g = {
    ...e,
    path: f
  };
  let h = "";
  const i = d.filter(a => !!a).slice().reverse();
  for (const c of i) {
    h = c(g, {
      data: b,
      defaultError: h
    }).message;
  }
  return {
    ...e,
    path: f,
    message: e.message || h
  };
};
const Mc = [];
function Nc(a, b) {
  const c = Lc({
    issueData: b,
    data: a.data,
    path: a.path,
    errorMaps: [a.common.contextualErrorMap, a.schemaErrorMap, Kc(), Gc].filter(a => !!a)
  });
  a.common.issues.push(c);
}
class Oc {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid") {
      this.value = "dirty";
    }
  }
  abort() {
    if (this.value !== "aborted") {
      this.value = "aborted";
    }
  }
  static mergeArray(a, b) {
    const c = [];
    for (const d of b) {
      if (d.status === "aborted") {
        return Pc;
      }
      if (d.status === "dirty") {
        a.dirty();
      }
      c.push(d.value);
    }
    return {
      status: a.value,
      value: c
    };
  }
  static async mergeObjectAsync(a, b) {
    const c = [];
    for (const d of b) {
      c.push({
        key: await d.key,
        value: await d.value
      });
    }
    return Oc.mergeObjectSync(a, c);
  }
  static mergeObjectSync(a, b) {
    const c = {};
    for (const d of b) {
      const {
        key: b,
        value: e
      } = d;
      if (b.status === "aborted" || e.status === "aborted") {
        return Pc;
      }
      if (b.status === "dirty") {
        a.dirty();
      }
      if (e.status === "dirty") {
        a.dirty();
      }
      if (typeof e.value !== "undefined" || d.alwaysSet) {
        c[b.value] = e.value;
      }
    }
    return {
      status: a.value,
      value: c
    };
  }
}
const Pc = Object.freeze({
  status: "aborted"
});
const Qc = a => ({
  status: "dirty",
  value: a
});
const Uc = a => ({
  status: "valid",
  value: a
});
const Vc = a => a.status === "aborted";
const Ka = a => a.status === "dirty";
const Ya = a => a.status === "valid";
const Wc = a => typeof Promise !== "undefined" && a instanceof Promise;
var Xc;
(function (a) {
  a.errToObj = a => typeof a == "string" ? {
    message: a
  } : a || {};
  a.toString = a => typeof a == "string" ? a : a?.message;
})(Xc ||= {});
class Yc {
  constructor(a, b, c, d) {
    this._cachedPath = [];
    this.parent = a;
    this.data = b;
    this._path = c;
    this._key = d;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const Zc = (a, b) => {
  if (Ya(b)) {
    return {
      success: true,
      data: b.value
    };
  }
  if (!a.common.issues.length) {
    throw new Error("Validation failed but no issues detected.");
  }
  return {
    success: false,
    get error() {
      if (this._error) {
        return this._error;
      }
      const b = new Fc(a.common.issues);
      this._error = b;
      return this._error;
    }
  };
};
function ae(a) {
  if (!a) {
    return {};
  }
  const {
    errorMap: b,
    invalid_type_error: c,
    required_error: d,
    description: e
  } = a;
  if (b && (c || d)) {
    throw new Error("Can't use \"invalid_type_error\" or \"required_error\" in conjunction with custom error map.");
  }
  if (b) {
    return {
      errorMap: b,
      description: e
    };
  } else {
    return {
      errorMap: (a, b) => a.code !== "invalid_type" ? {
        message: b.defaultError
      } : typeof b.data === "undefined" ? {
        message: d ?? b.defaultError
      } : {
        message: c ?? b.defaultError
      },
      description: e
    };
  }
}
class ce {
  constructor(a) {
    this.spa = this.safeParseAsync;
    this._def = a;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(a) {
    return qc(a.data);
  }
  _getOrReturnCtx(a, b) {
    return b || {
      common: a.parent.common,
      data: a.data,
      parsedType: qc(a.data),
      schemaErrorMap: this._def.errorMap,
      path: a.path,
      parent: a.parent
    };
  }
  _processInputParams(a) {
    return {
      status: new Oc(),
      ctx: {
        common: a.parent.common,
        data: a.data,
        parsedType: qc(a.data),
        schemaErrorMap: this._def.errorMap,
        path: a.path,
        parent: a.parent
      }
    };
  }
  _parseSync(a) {
    const b = this._parse(a);
    if (Wc(b)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return b;
  }
  _parseAsync(a) {
    const b = this._parse(a);
    return Promise.resolve(b);
  }
  parse(a, b) {
    const c = this.safeParse(a, b);
    if (c.success) {
      return c.data;
    }
    throw c.error;
  }
  safeParse(a, b) {
    const c = {
      common: {
        issues: [],
        async: b?.async ?? false,
        contextualErrorMap: b?.errorMap
      },
      path: b?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: a,
      parsedType: qc(a)
    };
    const d = this._parseSync({
      data: a,
      path: c.path,
      parent: c
    });
    return Zc(c, d);
  }
  async parseAsync(a, b) {
    const c = await this.safeParseAsync(a, b);
    if (c.success) {
      return c.data;
    }
    throw c.error;
  }
  async safeParseAsync(a, b) {
    const c = {
      common: {
        issues: [],
        contextualErrorMap: b?.errorMap,
        async: true
      },
      path: b?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: a,
      parsedType: qc(a)
    };
    const d = this._parse({
      data: a,
      path: c.path,
      parent: c
    });
    const e = await (Wc(d) ? d : Promise.resolve(d));
    return Zc(c, e);
  }
  refine(a, b) {
    const c = a => typeof b == "string" || typeof b === "undefined" ? {
      message: b
    } : typeof b == "function" ? b(a) : b;
    return this._refinement((b, d) => {
      const e = a(b);
      const f = () => d.addIssue({
        code: Cc.custom,
        ...c(b)
      });
      if (typeof Promise !== "undefined" && e instanceof Promise) {
        return e.then(a => a ? true : (f(), false));
      } else if (e) {
        return true;
      } else {
        f();
        return false;
      }
    });
  }
  refinement(a, b) {
    return this._refinement((c, d) => a(c) ? true : (d.addIssue(typeof b == "function" ? b(c, d) : b), false));
  }
  _refinement(a) {
    return new jf({
      schema: this,
      typeName: sf.ZodEffects,
      effect: {
        type: "refinement",
        refinement: a
      }
    });
  }
  superRefine(a) {
    return this._refinement(a);
  }
  optional() {
    return kf.create(this, this._def);
  }
  nullable() {
    return lf.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Se.create(this, this._def);
  }
  promise() {
    return hf.create(this, this._def);
  }
  or(a) {
    return Ie.create([this, a], this._def);
  }
  and(a) {
    return Ja.create(this, a, this._def);
  }
  transform(a) {
    return new jf({
      ...ae(this._def),
      schema: this,
      typeName: sf.ZodEffects,
      effect: {
        type: "transform",
        transform: a
      }
    });
  }
  default(a) {
    const b = typeof a == "function" ? a : () => a;
    return new mf({
      ...ae(this._def),
      innerType: this,
      defaultValue: b,
      typeName: sf.ZodDefault
    });
  }
  brand() {
    return new of({
      typeName: sf.ZodBranded,
      type: this,
      ...ae(this._def)
    });
  }
  catch(a) {
    const b = typeof a == "function" ? a : () => a;
    return new nf({
      ...ae(this._def),
      innerType: this,
      catchValue: b,
      typeName: sf.ZodCatch
    });
  }
  describe(a) {
    const b = this.constructor;
    return new b({
      ...this._def,
      description: a
    });
  }
  pipe(a) {
    return pf.create(this, a);
  }
  isOptional() {
    return this.safeParse(undefined).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const ee = /^c[^\s-]{8,}$/i;
const fe = /^[a-z][a-z0-9]*$/;
const ge = /[0-9A-HJKMNP-TV-Z]{26}/;
const he = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const le = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
const ne = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;
const pe = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
const re = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const se = a => a.precision ? a.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{" + a.precision + "}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{" + a.precision + "}Z$") : a.precision === 0 ? a.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : a.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function te(a, b) {
  return (b === "v4" || !!!b) && !!pe.test(a) || (b === "v6" || !!!b) && !!re.test(a);
}
class ve extends ce {
  constructor() {
    super(...arguments);
    this._regex = (a, b, c) => this.refinement(b => a.test(b), {
      validation: b,
      code: Cc.invalid_string,
      ...Xc.errToObj(c)
    });
    this.nonempty = a => this.min(1, Xc.errToObj(a));
    this.trim = () => new ve({
      ...this._def,
      checks: [...this._def.checks, {
        kind: "trim"
      }]
    });
    this.toLowerCase = () => new ve({
      ...this._def,
      checks: [...this._def.checks, {
        kind: "toLowerCase"
      }]
    });
    this.toUpperCase = () => new ve({
      ...this._def,
      checks: [...this._def.checks, {
        kind: "toUpperCase"
      }]
    });
  }
  _parse(a) {
    if (this._def.coerce) {
      a.data = String(a.data);
    }
    if (this._getType(a) !== Ga.string) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.string,
        received: b.parsedType
      });
      return Pc;
    }
    const b = new Oc();
    let c;
    for (const d of this._def.checks) {
      if (d.kind === "min") {
        if (a.data.length < d.value) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            code: Cc.too_small,
            minimum: d.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "max") {
        if (a.data.length > d.value) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            code: Cc.too_big,
            maximum: d.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "length") {
        const e = a.data.length > d.value;
        const f = a.data.length < d.value;
        if (e || f) {
          c = this._getOrReturnCtx(a, c);
          if (e) {
            Nc(c, {
              code: Cc.too_big,
              maximum: d.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: d.message
            });
          } else if (f) {
            Nc(c, {
              code: Cc.too_small,
              minimum: d.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: d.message
            });
          }
          b.dirty();
        }
      } else if (d.kind === "email") {
        if (!le.test(a.data)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            validation: "email",
            code: Cc.invalid_string,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "emoji") {
        if (!ne.test(a.data)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            validation: "emoji",
            code: Cc.invalid_string,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "uuid") {
        if (!he.test(a.data)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            validation: "uuid",
            code: Cc.invalid_string,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "cuid") {
        if (!ee.test(a.data)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            validation: "cuid",
            code: Cc.invalid_string,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "cuid2") {
        if (!fe.test(a.data)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            validation: "cuid2",
            code: Cc.invalid_string,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "ulid") {
        if (!ge.test(a.data)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            validation: "ulid",
            code: Cc.invalid_string,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "url") {
        try {
          new URL(a.data);
        } catch {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            validation: "url",
            code: Cc.invalid_string,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "regex") {
        d.regex.lastIndex = 0;
        if (!d.regex.test(a.data)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            validation: "regex",
            code: Cc.invalid_string,
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "trim") {
        a.data = a.data.trim();
      } else if (d.kind === "includes") {
        if (!a.data.includes(d.value, d.position)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            code: Cc.invalid_string,
            validation: {
              includes: d.value,
              position: d.position
            },
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "toLowerCase") {
        a.data = a.data.toLowerCase();
      } else if (d.kind === "toUpperCase") {
        a.data = a.data.toUpperCase();
      } else if (d.kind === "startsWith") {
        if (!a.data.startsWith(d.value)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            code: Cc.invalid_string,
            validation: {
              startsWith: d.value
            },
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "endsWith") {
        if (!a.data.endsWith(d.value)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            code: Cc.invalid_string,
            validation: {
              endsWith: d.value
            },
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "datetime") {
        if (!se(d).test(a.data)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            code: Cc.invalid_string,
            validation: "datetime",
            message: d.message
          });
          b.dirty();
        }
      } else if (d.kind === "ip") {
        if (!te(a.data, d.version)) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            validation: "ip",
            code: Cc.invalid_string,
            message: d.message
          });
          b.dirty();
        }
      } else {
        _b.assertNever(d);
      }
    }
    return {
      status: b.value,
      value: a.data
    };
  }
  _addCheck(a) {
    return new ve({
      ...this._def,
      checks: [...this._def.checks, a]
    });
  }
  email(a) {
    return this._addCheck({
      kind: "email",
      ...Xc.errToObj(a)
    });
  }
  url(a) {
    return this._addCheck({
      kind: "url",
      ...Xc.errToObj(a)
    });
  }
  emoji(a) {
    return this._addCheck({
      kind: "emoji",
      ...Xc.errToObj(a)
    });
  }
  uuid(a) {
    return this._addCheck({
      kind: "uuid",
      ...Xc.errToObj(a)
    });
  }
  cuid(a) {
    return this._addCheck({
      kind: "cuid",
      ...Xc.errToObj(a)
    });
  }
  cuid2(a) {
    return this._addCheck({
      kind: "cuid2",
      ...Xc.errToObj(a)
    });
  }
  ulid(a) {
    return this._addCheck({
      kind: "ulid",
      ...Xc.errToObj(a)
    });
  }
  ip(a) {
    return this._addCheck({
      kind: "ip",
      ...Xc.errToObj(a)
    });
  }
  datetime(a) {
    if (typeof a == "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        message: a
      });
    } else {
      return this._addCheck({
        kind: "datetime",
        precision: typeof a?.precision === "undefined" ? null : a?.precision,
        offset: a?.offset ?? false,
        ...Xc.errToObj(a?.message)
      });
    }
  }
  regex(a, b) {
    return this._addCheck({
      kind: "regex",
      regex: a,
      ...Xc.errToObj(b)
    });
  }
  includes(a, b) {
    return this._addCheck({
      kind: "includes",
      value: a,
      position: b?.position,
      ...Xc.errToObj(b?.message)
    });
  }
  startsWith(a, b) {
    return this._addCheck({
      kind: "startsWith",
      value: a,
      ...Xc.errToObj(b)
    });
  }
  endsWith(a, b) {
    return this._addCheck({
      kind: "endsWith",
      value: a,
      ...Xc.errToObj(b)
    });
  }
  min(a, b) {
    return this._addCheck({
      kind: "min",
      value: a,
      ...Xc.errToObj(b)
    });
  }
  max(a, b) {
    return this._addCheck({
      kind: "max",
      value: a,
      ...Xc.errToObj(b)
    });
  }
  length(a, b) {
    return this._addCheck({
      kind: "length",
      value: a,
      ...Xc.errToObj(b)
    });
  }
  get isDatetime() {
    return !!this._def.checks.find(a => a.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find(a => a.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find(a => a.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find(a => a.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find(a => a.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find(a => a.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find(a => a.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find(a => a.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find(a => a.kind === "ip");
  }
  get minLength() {
    let a = null;
    for (const b of this._def.checks) {
      if (b.kind === "min" && (a === null || b.value > a)) {
        a = b.value;
      }
    }
    return a;
  }
  get maxLength() {
    let a = null;
    for (const b of this._def.checks) {
      if (b.kind === "max" && (a === null || b.value < a)) {
        a = b.value;
      }
    }
    return a;
  }
}
ve.create = a => {
  return new ve({
    checks: [],
    typeName: sf.ZodString,
    coerce: a?.coerce ?? false,
    ...ae(a)
  });
};
function xe(a, b) {
  const c = (a.toString().split(".")[1] || "").length;
  const d = (b.toString().split(".")[1] || "").length;
  const e = c > d ? c : d;
  const f = parseInt(a.toFixed(e).replace(".", ""));
  const g = parseInt(b.toFixed(e).replace(".", ""));
  return f % g / Math.pow(10, e);
}
class ye extends ce {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(a) {
    if (this._def.coerce) {
      a.data = Number(a.data);
    }
    if (this._getType(a) !== Ga.number) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.number,
        received: b.parsedType
      });
      return Pc;
    }
    let b;
    const c = new Oc();
    for (const d of this._def.checks) {
      if (d.kind === "int") {
        if (!_b.isInteger(a.data)) {
          b = this._getOrReturnCtx(a, b);
          Nc(b, {
            code: Cc.invalid_type,
            expected: "integer",
            received: "float",
            message: d.message
          });
          c.dirty();
        }
      } else if (d.kind === "min") {
        if (d.inclusive ? a.data < d.value : a.data <= d.value) {
          b = this._getOrReturnCtx(a, b);
          Nc(b, {
            code: Cc.too_small,
            minimum: d.value,
            type: "number",
            inclusive: d.inclusive,
            exact: false,
            message: d.message
          });
          c.dirty();
        }
      } else if (d.kind === "max") {
        if (d.inclusive ? a.data > d.value : a.data >= d.value) {
          b = this._getOrReturnCtx(a, b);
          Nc(b, {
            code: Cc.too_big,
            maximum: d.value,
            type: "number",
            inclusive: d.inclusive,
            exact: false,
            message: d.message
          });
          c.dirty();
        }
      } else if (d.kind === "multipleOf") {
        if (xe(a.data, d.value) !== 0) {
          b = this._getOrReturnCtx(a, b);
          Nc(b, {
            code: Cc.not_multiple_of,
            multipleOf: d.value,
            message: d.message
          });
          c.dirty();
        }
      } else if (d.kind === "finite") {
        if (!Number.isFinite(a.data)) {
          b = this._getOrReturnCtx(a, b);
          Nc(b, {
            code: Cc.not_finite,
            message: d.message
          });
          c.dirty();
        }
      } else {
        _b.assertNever(d);
      }
    }
    return {
      status: c.value,
      value: a.data
    };
  }
  gte(a, b) {
    return this.setLimit("min", a, true, Xc.toString(b));
  }
  gt(a, b) {
    return this.setLimit("min", a, false, Xc.toString(b));
  }
  lte(a, b) {
    return this.setLimit("max", a, true, Xc.toString(b));
  }
  lt(a, b) {
    return this.setLimit("max", a, false, Xc.toString(b));
  }
  setLimit(a, b, c, d) {
    return new ye({
      ...this._def,
      checks: [...this._def.checks, {
        kind: a,
        value: b,
        inclusive: c,
        message: Xc.toString(d)
      }]
    });
  }
  _addCheck(a) {
    return new ye({
      ...this._def,
      checks: [...this._def.checks, a]
    });
  }
  int(a) {
    return this._addCheck({
      kind: "int",
      message: Xc.toString(a)
    });
  }
  positive(a) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: Xc.toString(a)
    });
  }
  negative(a) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: Xc.toString(a)
    });
  }
  nonpositive(a) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: Xc.toString(a)
    });
  }
  nonnegative(a) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: Xc.toString(a)
    });
  }
  multipleOf(a, b) {
    return this._addCheck({
      kind: "multipleOf",
      value: a,
      message: Xc.toString(b)
    });
  }
  finite(a) {
    return this._addCheck({
      kind: "finite",
      message: Xc.toString(a)
    });
  }
  safe(a) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: Xc.toString(a)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: Xc.toString(a)
    });
  }
  get minValue() {
    let a = null;
    for (const b of this._def.checks) {
      if (b.kind === "min" && (a === null || b.value > a)) {
        a = b.value;
      }
    }
    return a;
  }
  get maxValue() {
    let a = null;
    for (const b of this._def.checks) {
      if (b.kind === "max" && (a === null || b.value < a)) {
        a = b.value;
      }
    }
    return a;
  }
  get isInt() {
    return !!this._def.checks.find(a => a.kind === "int" || a.kind === "multipleOf" && _b.isInteger(a.value));
  }
  get isFinite() {
    let a = null;
    let b = null;
    for (const c of this._def.checks) {
      if (c.kind === "finite" || c.kind === "int" || c.kind === "multipleOf") {
        return true;
      }
      if (c.kind === "min") {
        if (b === null || c.value > b) {
          b = c.value;
        }
      } else if (c.kind === "max" && (a === null || c.value < a)) {
        a = c.value;
      }
    }
    return Number.isFinite(b) && Number.isFinite(a);
  }
}
ye.create = a => new ye({
  checks: [],
  typeName: sf.ZodNumber,
  coerce: a?.coerce || false,
  ...ae(a)
});
class Ae extends ce {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(a) {
    if (this._def.coerce) {
      a.data = BigInt(a.data);
    }
    if (this._getType(a) !== Ga.bigint) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.bigint,
        received: b.parsedType
      });
      return Pc;
    }
    let b;
    const c = new Oc();
    for (const d of this._def.checks) {
      if (d.kind === "min") {
        if (d.inclusive ? a.data < d.value : a.data <= d.value) {
          b = this._getOrReturnCtx(a, b);
          Nc(b, {
            code: Cc.too_small,
            type: "bigint",
            minimum: d.value,
            inclusive: d.inclusive,
            message: d.message
          });
          c.dirty();
        }
      } else if (d.kind === "max") {
        if (d.inclusive ? a.data > d.value : a.data >= d.value) {
          b = this._getOrReturnCtx(a, b);
          Nc(b, {
            code: Cc.too_big,
            type: "bigint",
            maximum: d.value,
            inclusive: d.inclusive,
            message: d.message
          });
          c.dirty();
        }
      } else if (d.kind === "multipleOf") {
        if (a.data % d.value !== BigInt(0)) {
          b = this._getOrReturnCtx(a, b);
          Nc(b, {
            code: Cc.not_multiple_of,
            multipleOf: d.value,
            message: d.message
          });
          c.dirty();
        }
      } else {
        _b.assertNever(d);
      }
    }
    return {
      status: c.value,
      value: a.data
    };
  }
  gte(a, b) {
    return this.setLimit("min", a, true, Xc.toString(b));
  }
  gt(a, b) {
    return this.setLimit("min", a, false, Xc.toString(b));
  }
  lte(a, b) {
    return this.setLimit("max", a, true, Xc.toString(b));
  }
  lt(a, b) {
    return this.setLimit("max", a, false, Xc.toString(b));
  }
  setLimit(a, b, c, d) {
    return new Ae({
      ...this._def,
      checks: [...this._def.checks, {
        kind: a,
        value: b,
        inclusive: c,
        message: Xc.toString(d)
      }]
    });
  }
  _addCheck(a) {
    return new Ae({
      ...this._def,
      checks: [...this._def.checks, a]
    });
  }
  positive(a) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: Xc.toString(a)
    });
  }
  negative(a) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: Xc.toString(a)
    });
  }
  nonpositive(a) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: Xc.toString(a)
    });
  }
  nonnegative(a) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: Xc.toString(a)
    });
  }
  multipleOf(a, b) {
    return this._addCheck({
      kind: "multipleOf",
      value: a,
      message: Xc.toString(b)
    });
  }
  get minValue() {
    let a = null;
    for (const b of this._def.checks) {
      if (b.kind === "min" && (a === null || b.value > a)) {
        a = b.value;
      }
    }
    return a;
  }
  get maxValue() {
    let a = null;
    for (const b of this._def.checks) {
      if (b.kind === "max" && (a === null || b.value < a)) {
        a = b.value;
      }
    }
    return a;
  }
}
Ae.create = a => {
  return new Ae({
    checks: [],
    typeName: sf.ZodBigInt,
    coerce: a?.coerce ?? false,
    ...ae(a)
  });
};
class De extends ce {
  _parse(a) {
    if (this._def.coerce) {
      a.data = !!a.data;
    }
    if (this._getType(a) !== Ga.boolean) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.boolean,
        received: b.parsedType
      });
      return Pc;
    }
    return Uc(a.data);
  }
}
De.create = a => new De({
  typeName: sf.ZodBoolean,
  coerce: a?.coerce || false,
  ...ae(a)
});
class Ee extends ce {
  _parse(a) {
    if (this._def.coerce) {
      a.data = new Date(a.data);
    }
    if (this._getType(a) !== Ga.date) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.date,
        received: b.parsedType
      });
      return Pc;
    }
    if (isNaN(a.data.getTime())) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_date
      });
      return Pc;
    }
    const b = new Oc();
    let c;
    for (const d of this._def.checks) {
      if (d.kind === "min") {
        if (a.data.getTime() < d.value) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            code: Cc.too_small,
            message: d.message,
            inclusive: true,
            exact: false,
            minimum: d.value,
            type: "date"
          });
          b.dirty();
        }
      } else if (d.kind === "max") {
        if (a.data.getTime() > d.value) {
          c = this._getOrReturnCtx(a, c);
          Nc(c, {
            code: Cc.too_big,
            message: d.message,
            inclusive: true,
            exact: false,
            maximum: d.value,
            type: "date"
          });
          b.dirty();
        }
      } else {
        _b.assertNever(d);
      }
    }
    return {
      status: b.value,
      value: new Date(a.data.getTime())
    };
  }
  _addCheck(a) {
    return new Ee({
      ...this._def,
      checks: [...this._def.checks, a]
    });
  }
  min(a, b) {
    return this._addCheck({
      kind: "min",
      value: a.getTime(),
      message: Xc.toString(b)
    });
  }
  max(a, b) {
    return this._addCheck({
      kind: "max",
      value: a.getTime(),
      message: Xc.toString(b)
    });
  }
  get minDate() {
    let a = null;
    for (const b of this._def.checks) {
      if (b.kind === "min" && (a === null || b.value > a)) {
        a = b.value;
      }
    }
    if (a != null) {
      return new Date(a);
    } else {
      return null;
    }
  }
  get maxDate() {
    let a = null;
    for (const b of this._def.checks) {
      if (b.kind === "max" && (a === null || b.value < a)) {
        a = b.value;
      }
    }
    if (a != null) {
      return new Date(a);
    } else {
      return null;
    }
  }
}
Ee.create = a => new Ee({
  checks: [],
  coerce: a?.coerce || false,
  typeName: sf.ZodDate,
  ...ae(a)
});
class He extends ce {
  _parse(a) {
    if (this._getType(a) !== Ga.symbol) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.symbol,
        received: b.parsedType
      });
      return Pc;
    }
    return Uc(a.data);
  }
}
He.create = a => new He({
  typeName: sf.ZodSymbol,
  ...ae(a)
});
class Ke extends ce {
  _parse(a) {
    if (this._getType(a) !== Ga.undefined) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.undefined,
        received: b.parsedType
      });
      return Pc;
    }
    return Uc(a.data);
  }
}
Ke.create = a => new Ke({
  typeName: sf.ZodUndefined,
  ...ae(a)
});
class Me extends ce {
  _parse(a) {
    if (this._getType(a) !== Ga.null) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.null,
        received: b.parsedType
      });
      return Pc;
    }
    return Uc(a.data);
  }
}
Me.create = a => new Me({
  typeName: sf.ZodNull,
  ...ae(a)
});
class Ne extends ce {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(a) {
    return Uc(a.data);
  }
}
Ne.create = a => new Ne({
  typeName: sf.ZodAny,
  ...ae(a)
});
class Pe extends ce {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(a) {
    return Uc(a.data);
  }
}
Pe.create = a => new Pe({
  typeName: sf.ZodUnknown,
  ...ae(a)
});
class Qe extends ce {
  _parse(a) {
    const b = this._getOrReturnCtx(a);
    Nc(b, {
      code: Cc.invalid_type,
      expected: Ga.never,
      received: b.parsedType
    });
    return Pc;
  }
}
Qe.create = a => new Qe({
  typeName: sf.ZodNever,
  ...ae(a)
});
class Re extends ce {
  _parse(a) {
    if (this._getType(a) !== Ga.undefined) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.void,
        received: b.parsedType
      });
      return Pc;
    }
    return Uc(a.data);
  }
}
Re.create = a => new Re({
  typeName: sf.ZodVoid,
  ...ae(a)
});
class Se extends ce {
  _parse(a) {
    const {
      ctx: b,
      status: c
    } = this._processInputParams(a);
    const d = this._def;
    if (b.parsedType !== Ga.array) {
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.array,
        received: b.parsedType
      });
      return Pc;
    }
    if (d.exactLength !== null) {
      const a = b.data.length > d.exactLength.value;
      const e = b.data.length < d.exactLength.value;
      if (a || e) {
        Nc(b, {
          code: a ? Cc.too_big : Cc.too_small,
          minimum: e ? d.exactLength.value : undefined,
          maximum: a ? d.exactLength.value : undefined,
          type: "array",
          inclusive: true,
          exact: true,
          message: d.exactLength.message
        });
        c.dirty();
      }
    }
    if (d.minLength !== null && b.data.length < d.minLength.value) {
      Nc(b, {
        code: Cc.too_small,
        minimum: d.minLength.value,
        type: "array",
        inclusive: true,
        exact: false,
        message: d.minLength.message
      });
      c.dirty();
    }
    if (d.maxLength !== null && b.data.length > d.maxLength.value) {
      Nc(b, {
        code: Cc.too_big,
        maximum: d.maxLength.value,
        type: "array",
        inclusive: true,
        exact: false,
        message: d.maxLength.message
      });
      c.dirty();
    }
    if (b.common.async) {
      return Promise.all([...b.data].map((a, c) => d.type._parseAsync(new Yc(b, a, b.path, c)))).then(a => Oc.mergeArray(c, a));
    }
    const e = [...b.data].map((a, c) => d.type._parseSync(new Yc(b, a, b.path, c)));
    return Oc.mergeArray(c, e);
  }
  get element() {
    return this._def.type;
  }
  min(a, b) {
    return new Se({
      ...this._def,
      minLength: {
        value: a,
        message: Xc.toString(b)
      }
    });
  }
  max(a, b) {
    return new Se({
      ...this._def,
      maxLength: {
        value: a,
        message: Xc.toString(b)
      }
    });
  }
  length(a, b) {
    return new Se({
      ...this._def,
      exactLength: {
        value: a,
        message: Xc.toString(b)
      }
    });
  }
  nonempty(a) {
    return this.min(1, a);
  }
}
Se.create = (a, b) => new Se({
  type: a,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: sf.ZodArray,
  ...ae(b)
});
function Te(a) {
  if (a instanceof Ve) {
    const b = {};
    for (const c in a.shape) {
      const d = a.shape[c];
      b[c] = kf.create(Te(d));
    }
    return new Ve({
      ...a._def,
      shape: () => b
    });
  } else if (a instanceof Se) {
    return new Se({
      ...a._def,
      type: Te(a.element)
    });
  } else if (a instanceof kf) {
    return kf.create(Te(a.unwrap()));
  } else if (a instanceof lf) {
    return lf.create(Te(a.unwrap()));
  } else if (a instanceof $e) {
    return $e.create(a.items.map(a => Te(a)));
  } else {
    return a;
  }
}
class Ve extends ce {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null) {
      return this._cached;
    }
    const a = this._def.shape();
    const b = _b.objectKeys(a);
    return this._cached = {
      shape: a,
      keys: b
    };
  }
  _parse(a) {
    if (this._getType(a) !== Ga.object) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.object,
        received: b.parsedType
      });
      return Pc;
    }
    const {
      status: b,
      ctx: c
    } = this._processInputParams(a);
    const {
      shape: d,
      keys: e
    } = this._getCached();
    const f = [];
    if (!(this._def.catchall instanceof Qe) || this._def.unknownKeys !== "strip") {
      for (const a in c.data) {
        if (!e.includes(a)) {
          f.push(a);
        }
      }
    }
    const g = [];
    for (const b of e) {
      const a = d[b];
      const e = c.data[b];
      g.push({
        key: {
          status: "valid",
          value: b
        },
        value: a._parse(new Yc(c, e, c.path, b)),
        alwaysSet: b in c.data
      });
    }
    if (this._def.catchall instanceof Qe) {
      const a = this._def.unknownKeys;
      if (a === "passthrough") {
        for (const a of f) {
          g.push({
            key: {
              status: "valid",
              value: a
            },
            value: {
              status: "valid",
              value: c.data[a]
            }
          });
        }
      } else if (a === "strict") {
        if (f.length > 0) {
          Nc(c, {
            code: Cc.unrecognized_keys,
            keys: f
          });
          b.dirty();
        }
      } else if (a !== "strip") {
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      }
    } else {
      const a = this._def.catchall;
      for (const b of f) {
        const d = c.data[b];
        g.push({
          key: {
            status: "valid",
            value: b
          },
          value: a._parse(new Yc(c, d, c.path, b)),
          alwaysSet: b in c.data
        });
      }
    }
    if (c.common.async) {
      return Promise.resolve().then(async () => {
        const a = [];
        for (const b of g) {
          const c = await b.key;
          a.push({
            key: c,
            value: await b.value,
            alwaysSet: b.alwaysSet
          });
        }
        return a;
      }).then(a => Oc.mergeObjectSync(b, a));
    } else {
      return Oc.mergeObjectSync(b, g);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(a) {
    Xc.errToObj;
    return new Ve({
      ...this._def,
      unknownKeys: "strict",
      ...(a !== undefined ? {
        errorMap: (b, c) => {
          var d;
          var e;
          const f = ((e = (d = this._def).errorMap) === null || e === undefined ? undefined : e.call(d, b, c).message) ?? c.defaultError;
          if (b.code === "unrecognized_keys") {
            return {
              message: Xc.errToObj(a).message ?? f
            };
          } else {
            return {
              message: f
            };
          }
        }
      } : {})
    });
  }
  strip() {
    return new Ve({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new Ve({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(a) {
    return new Ve({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...a
      })
    });
  }
  merge(a) {
    return new Ve({
      unknownKeys: a._def.unknownKeys,
      catchall: a._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...a._def.shape()
      }),
      typeName: sf.ZodObject
    });
  }
  setKey(a, b) {
    return this.augment({
      [a]: b
    });
  }
  catchall(a) {
    return new Ve({
      ...this._def,
      catchall: a
    });
  }
  pick(a) {
    const b = {};
    _b.objectKeys(a).forEach(c => {
      if (a[c] && this.shape[c]) {
        b[c] = this.shape[c];
      }
    });
    return new Ve({
      ...this._def,
      shape: () => b
    });
  }
  omit(a) {
    const b = {};
    _b.objectKeys(this.shape).forEach(c => {
      if (!a[c]) {
        b[c] = this.shape[c];
      }
    });
    return new Ve({
      ...this._def,
      shape: () => b
    });
  }
  deepPartial() {
    return Te(this);
  }
  partial(a) {
    const b = {};
    _b.objectKeys(this.shape).forEach(c => {
      const d = this.shape[c];
      if (a && !a[c]) {
        b[c] = d;
      } else {
        b[c] = d.optional();
      }
    });
    return new Ve({
      ...this._def,
      shape: () => b
    });
  }
  required(a) {
    const b = {};
    _b.objectKeys(this.shape).forEach(c => {
      if (a && !a[c]) {
        b[c] = this.shape[c];
      } else {
        let a = this.shape[c];
        while (a instanceof kf) {
          a = a._def.innerType;
        }
        b[c] = a;
      }
    });
    return new Ve({
      ...this._def,
      shape: () => b
    });
  }
  keyof() {
    return ef(_b.objectKeys(this.shape));
  }
}
Ve.create = (a, b) => new Ve({
  shape: () => a,
  unknownKeys: "strip",
  catchall: Qe.create(),
  typeName: sf.ZodObject,
  ...ae(b)
});
Ve.strictCreate = (a, b) => new Ve({
  shape: () => a,
  unknownKeys: "strict",
  catchall: Qe.create(),
  typeName: sf.ZodObject,
  ...ae(b)
});
Ve.lazycreate = (a, b) => new Ve({
  shape: a,
  unknownKeys: "strip",
  catchall: Qe.create(),
  typeName: sf.ZodObject,
  ...ae(b)
});
class Ie extends ce {
  _parse(a) {
    const {
      ctx: b
    } = this._processInputParams(a);
    const c = this._def.options;
    function d(a) {
      for (const b of a) {
        if (b.result.status === "valid") {
          return b.result;
        }
      }
      for (const c of a) {
        if (c.result.status === "dirty") {
          b.common.issues.push(...c.ctx.common.issues);
          return c.result;
        }
      }
      const c = a.map(a => new Fc(a.ctx.common.issues));
      Nc(b, {
        code: Cc.invalid_union,
        unionErrors: c
      });
      return Pc;
    }
    if (b.common.async) {
      return Promise.all(c.map(async a => {
        const c = {
          ...b,
          common: {
            ...b.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: b.data,
            path: b.path,
            parent: c
          }),
          ctx: c
        };
      })).then(d);
    }
    {
      let a;
      const d = [];
      for (const e of c) {
        const c = {
          ...b,
          common: {
            ...b.common,
            issues: []
          },
          parent: null
        };
        const f = e._parseSync({
          data: b.data,
          path: b.path,
          parent: c
        });
        if (f.status === "valid") {
          return f;
        }
        if (f.status === "dirty" && !a) {
          a = {
            result: f,
            ctx: c
          };
        }
        if (c.common.issues.length) {
          d.push(c.common.issues);
        }
      }
      if (a) {
        b.common.issues.push(...a.ctx.common.issues);
        return a.result;
      }
      const e = d.map(a => new Fc(a));
      Nc(b, {
        code: Cc.invalid_union,
        unionErrors: e
      });
      return Pc;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ie.create = (a, b) => new Ie({
  options: a,
  typeName: sf.ZodUnion,
  ...ae(b)
});
const Ye = a => a instanceof cf ? Ye(a.schema) : a instanceof jf ? Ye(a.innerType()) : a instanceof df ? [a.value] : a instanceof ff ? a.options : a instanceof gf ? Object.keys(a.enum) : a instanceof mf ? Ye(a._def.innerType) : a instanceof Ke ? [undefined] : a instanceof Me ? [null] : null;
class Ze extends ce {
  _parse(a) {
    const {
      ctx: b
    } = this._processInputParams(a);
    if (b.parsedType !== Ga.object) {
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.object,
        received: b.parsedType
      });
      return Pc;
    }
    const c = this.discriminator;
    const d = b.data[c];
    const e = this.optionsMap.get(d);
    if (e) {
      if (b.common.async) {
        return e._parseAsync({
          data: b.data,
          path: b.path,
          parent: b
        });
      } else {
        return e._parseSync({
          data: b.data,
          path: b.path,
          parent: b
        });
      }
    } else {
      Nc(b, {
        code: Cc.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [c]
      });
      return Pc;
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(a, b, c) {
    const d = new Map();
    for (const e of b) {
      const b = Ye(e.shape[a]);
      if (!b) {
        throw new Error("A discriminator value for key `" + a + "` could not be extracted from all schema options");
      }
      for (const c of b) {
        if (d.has(c)) {
          throw new Error("Discriminator property " + String(a) + " has duplicate value " + String(c));
        }
        d.set(c, e);
      }
    }
    return new Ze({
      typeName: sf.ZodDiscriminatedUnion,
      discriminator: a,
      options: b,
      optionsMap: d,
      ...ae(c)
    });
  }
}
function ya(a, b) {
  const c = qc(a);
  const d = qc(b);
  if (a === b) {
    return {
      valid: true,
      data: a
    };
  }
  if (c === Ga.object && d === Ga.object) {
    const c = _b.objectKeys(b);
    const d = _b.objectKeys(a).filter(a => c.indexOf(a) !== -1);
    const e = {
      ...a,
      ...b
    };
    for (const c of d) {
      const d = ya(a[c], b[c]);
      if (!d.valid) {
        return {
          valid: false
        };
      }
      e[c] = d.data;
    }
    return {
      valid: true,
      data: e
    };
  } else if (c === Ga.array && d === Ga.array) {
    if (a.length !== b.length) {
      return {
        valid: false
      };
    }
    const c = [];
    for (let d = 0; d < a.length; d++) {
      const e = a[d];
      const f = b[d];
      const g = ya(e, f);
      if (!g.valid) {
        return {
          valid: false
        };
      }
      c.push(g.data);
    }
    return {
      valid: true,
      data: c
    };
  } else if (c === Ga.date && d === Ga.date && +a == +b) {
    return {
      valid: true,
      data: a
    };
  } else {
    return {
      valid: false
    };
  }
}
class Ja extends ce {
  _parse(a) {
    const {
      status: b,
      ctx: c
    } = this._processInputParams(a);
    const d = (a, d) => {
      if (Vc(a) || Vc(d)) {
        return Pc;
      }
      const e = ya(a.value, d.value);
      if (e.valid) {
        if (Ka(a) || Ka(d)) {
          b.dirty();
        }
        return {
          status: b.value,
          value: e.data
        };
      } else {
        Nc(c, {
          code: Cc.invalid_intersection_types
        });
        return Pc;
      }
    };
    if (c.common.async) {
      return Promise.all([this._def.left._parseAsync({
        data: c.data,
        path: c.path,
        parent: c
      }), this._def.right._parseAsync({
        data: c.data,
        path: c.path,
        parent: c
      })]).then(([a, b]) => d(a, b));
    } else {
      return d(this._def.left._parseSync({
        data: c.data,
        path: c.path,
        parent: c
      }), this._def.right._parseSync({
        data: c.data,
        path: c.path,
        parent: c
      }));
    }
  }
}
Ja.create = (a, b, c) => new Ja({
  left: a,
  right: b,
  typeName: sf.ZodIntersection,
  ...ae(c)
});
class $e extends ce {
  _parse(a) {
    const {
      status: b,
      ctx: c
    } = this._processInputParams(a);
    if (c.parsedType !== Ga.array) {
      Nc(c, {
        code: Cc.invalid_type,
        expected: Ga.array,
        received: c.parsedType
      });
      return Pc;
    }
    if (c.data.length < this._def.items.length) {
      Nc(c, {
        code: Cc.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return Pc;
    }
    if (!this._def.rest && c.data.length > this._def.items.length) {
      Nc(c, {
        code: Cc.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      b.dirty();
    }
    const d = [...c.data].map((a, b) => {
      const d = this._def.items[b] || this._def.rest;
      if (d) {
        return d._parse(new Yc(c, a, c.path, b));
      } else {
        return null;
      }
    }).filter(a => !!a);
    if (c.common.async) {
      return Promise.all(d).then(a => Oc.mergeArray(b, a));
    } else {
      return Oc.mergeArray(b, d);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(a) {
    return new $e({
      ...this._def,
      rest: a
    });
  }
}
$e.create = (a, b) => {
  if (!Array.isArray(a)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new $e({
    items: a,
    typeName: sf.ZodTuple,
    rest: null,
    ...ae(b)
  });
};
class _e extends ce {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(a) {
    const {
      status: b,
      ctx: c
    } = this._processInputParams(a);
    if (c.parsedType !== Ga.object) {
      Nc(c, {
        code: Cc.invalid_type,
        expected: Ga.object,
        received: c.parsedType
      });
      return Pc;
    }
    const d = [];
    const e = this._def.keyType;
    const f = this._def.valueType;
    for (const b in c.data) {
      d.push({
        key: e._parse(new Yc(c, b, c.path, b)),
        value: f._parse(new Yc(c, c.data[b], c.path, b))
      });
    }
    if (c.common.async) {
      return Oc.mergeObjectAsync(b, d);
    } else {
      return Oc.mergeObjectSync(b, d);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(a, b, c) {
    if (b instanceof ce) {
      return new _e({
        keyType: a,
        valueType: b,
        typeName: sf.ZodRecord,
        ...ae(c)
      });
    } else {
      return new _e({
        keyType: ve.create(),
        valueType: a,
        typeName: sf.ZodRecord,
        ...ae(b)
      });
    }
  }
}
class af extends ce {
  _parse(a) {
    const {
      status: b,
      ctx: c
    } = this._processInputParams(a);
    if (c.parsedType !== Ga.map) {
      Nc(c, {
        code: Cc.invalid_type,
        expected: Ga.map,
        received: c.parsedType
      });
      return Pc;
    }
    const d = this._def.keyType;
    const e = this._def.valueType;
    const f = [...c.data.entries()].map(([a, b], f) => ({
      key: d._parse(new Yc(c, a, c.path, [f, "key"])),
      value: e._parse(new Yc(c, b, c.path, [f, "value"]))
    }));
    if (c.common.async) {
      const a = new Map();
      return Promise.resolve().then(async () => {
        for (const c of f) {
          const d = await c.key;
          const e = await c.value;
          if (d.status === "aborted" || e.status === "aborted") {
            return Pc;
          }
          if (d.status === "dirty" || e.status === "dirty") {
            b.dirty();
          }
          a.set(d.value, e.value);
        }
        return {
          status: b.value,
          value: a
        };
      });
    } else {
      const a = new Map();
      for (const c of f) {
        const d = c.key;
        const e = c.value;
        if (d.status === "aborted" || e.status === "aborted") {
          return Pc;
        }
        if (d.status === "dirty" || e.status === "dirty") {
          b.dirty();
        }
        a.set(d.value, e.value);
      }
      return {
        status: b.value,
        value: a
      };
    }
  }
}
af.create = (a, b, c) => new af({
  valueType: b,
  keyType: a,
  typeName: sf.ZodMap,
  ...ae(c)
});
class ea extends ce {
  _parse(a) {
    const {
      status: b,
      ctx: c
    } = this._processInputParams(a);
    if (c.parsedType !== Ga.set) {
      Nc(c, {
        code: Cc.invalid_type,
        expected: Ga.set,
        received: c.parsedType
      });
      return Pc;
    }
    const d = this._def;
    if (d.minSize !== null && c.data.size < d.minSize.value) {
      Nc(c, {
        code: Cc.too_small,
        minimum: d.minSize.value,
        type: "set",
        inclusive: true,
        exact: false,
        message: d.minSize.message
      });
      b.dirty();
    }
    if (d.maxSize !== null && c.data.size > d.maxSize.value) {
      Nc(c, {
        code: Cc.too_big,
        maximum: d.maxSize.value,
        type: "set",
        inclusive: true,
        exact: false,
        message: d.maxSize.message
      });
      b.dirty();
    }
    const e = this._def.valueType;
    function f(a) {
      const c = new Set();
      for (const d of a) {
        if (d.status === "aborted") {
          return Pc;
        }
        if (d.status === "dirty") {
          b.dirty();
        }
        c.add(d.value);
      }
      return {
        status: b.value,
        value: c
      };
    }
    const g = [...c.data.values()].map((a, b) => e._parse(new Yc(c, a, c.path, b)));
    if (c.common.async) {
      return Promise.all(g).then(a => f(a));
    } else {
      return f(g);
    }
  }
  min(a, b) {
    return new ea({
      ...this._def,
      minSize: {
        value: a,
        message: Xc.toString(b)
      }
    });
  }
  max(a, b) {
    return new ea({
      ...this._def,
      maxSize: {
        value: a,
        message: Xc.toString(b)
      }
    });
  }
  size(a, b) {
    return this.min(a, b).max(a, b);
  }
  nonempty(a) {
    return this.min(1, a);
  }
}
ea.create = (a, b) => new ea({
  valueType: a,
  minSize: null,
  maxSize: null,
  typeName: sf.ZodSet,
  ...ae(b)
});
class bf extends ce {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(a) {
    const {
      ctx: b
    } = this._processInputParams(a);
    if (b.parsedType !== Ga.function) {
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.function,
        received: b.parsedType
      });
      return Pc;
    }
    function c(a, c) {
      return Lc({
        data: a,
        path: b.path,
        errorMaps: [b.common.contextualErrorMap, b.schemaErrorMap, Kc(), Gc].filter(a => !!a),
        issueData: {
          code: Cc.invalid_arguments,
          argumentsError: c
        }
      });
    }
    function d(a, c) {
      return Lc({
        data: a,
        path: b.path,
        errorMaps: [b.common.contextualErrorMap, b.schemaErrorMap, Kc(), Gc].filter(a => !!a),
        issueData: {
          code: Cc.invalid_return_type,
          returnTypeError: c
        }
      });
    }
    const e = {
      errorMap: b.common.contextualErrorMap
    };
    const f = b.data;
    if (this._def.returns instanceof hf) {
      return Uc(async (...a) => {
        const b = new Fc([]);
        const g = await this._def.args.parseAsync(a, e).catch(d => {
          b.addIssue(c(a, d));
          throw b;
        });
        const h = await f(...g);
        return await this._def.returns._def.type.parseAsync(h, e).catch(a => {
          b.addIssue(d(h, a));
          throw b;
        });
      });
    } else {
      return Uc((...a) => {
        const b = this._def.args.safeParse(a, e);
        if (!b.success) {
          throw new Fc([c(a, b.error)]);
        }
        const g = f(...b.data);
        const h = this._def.returns.safeParse(g, e);
        if (!h.success) {
          throw new Fc([d(g, h.error)]);
        }
        return h.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...a) {
    return new bf({
      ...this._def,
      args: $e.create(a).rest(Pe.create())
    });
  }
  returns(a) {
    return new bf({
      ...this._def,
      returns: a
    });
  }
  implement(a) {
    return this.parse(a);
  }
  strictImplement(a) {
    return this.parse(a);
  }
  static create(a, b, c) {
    return new bf({
      args: a || $e.create([]).rest(Pe.create()),
      returns: b || Pe.create(),
      typeName: sf.ZodFunction,
      ...ae(c)
    });
  }
}
class cf extends ce {
  get schema() {
    return this._def.getter();
  }
  _parse(a) {
    const {
      ctx: b
    } = this._processInputParams(a);
    return this._def.getter()._parse({
      data: b.data,
      path: b.path,
      parent: b
    });
  }
}
cf.create = (a, b) => new cf({
  getter: a,
  typeName: sf.ZodLazy,
  ...ae(b)
});
class df extends ce {
  _parse(a) {
    if (a.data !== this._def.value) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        received: b.data,
        code: Cc.invalid_literal,
        expected: this._def.value
      });
      return Pc;
    }
    return {
      status: "valid",
      value: a.data
    };
  }
  get value() {
    return this._def.value;
  }
}
df.create = (a, b) => new df({
  value: a,
  typeName: sf.ZodLiteral,
  ...ae(b)
});
function ef(a, b) {
  return new ff({
    values: a,
    typeName: sf.ZodEnum,
    ...ae(b)
  });
}
class ff extends ce {
  _parse(a) {
    if (typeof a.data != "string") {
      const b = this._getOrReturnCtx(a);
      const c = this._def.values;
      Nc(b, {
        expected: _b.joinValues(c),
        received: b.parsedType,
        code: Cc.invalid_type
      });
      return Pc;
    }
    if (this._def.values.indexOf(a.data) === -1) {
      const b = this._getOrReturnCtx(a);
      const c = this._def.values;
      Nc(b, {
        received: b.data,
        code: Cc.invalid_enum_value,
        options: c
      });
      return Pc;
    }
    return Uc(a.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const a = {};
    for (const b of this._def.values) {
      a[b] = b;
    }
    return a;
  }
  get Values() {
    const a = {};
    for (const b of this._def.values) {
      a[b] = b;
    }
    return a;
  }
  get Enum() {
    const a = {};
    for (const b of this._def.values) {
      a[b] = b;
    }
    return a;
  }
  extract(a) {
    return ff.create(a);
  }
  exclude(a) {
    return ff.create(this.options.filter(b => !a.includes(b)));
  }
}
ff.create = ef;
class gf extends ce {
  _parse(a) {
    const b = _b.getValidEnumValues(this._def.values);
    const c = this._getOrReturnCtx(a);
    if (c.parsedType !== Ga.string && c.parsedType !== Ga.number) {
      const a = _b.objectValues(b);
      Nc(c, {
        expected: _b.joinValues(a),
        received: c.parsedType,
        code: Cc.invalid_type
      });
      return Pc;
    }
    if (b.indexOf(a.data) === -1) {
      const a = _b.objectValues(b);
      Nc(c, {
        received: c.data,
        code: Cc.invalid_enum_value,
        options: a
      });
      return Pc;
    }
    return Uc(a.data);
  }
  get enum() {
    return this._def.values;
  }
}
gf.create = (a, b) => new gf({
  values: a,
  typeName: sf.ZodNativeEnum,
  ...ae(b)
});
class hf extends ce {
  unwrap() {
    return this._def.type;
  }
  _parse(a) {
    const {
      ctx: b
    } = this._processInputParams(a);
    if (b.parsedType !== Ga.promise && b.common.async === false) {
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.promise,
        received: b.parsedType
      });
      return Pc;
    }
    const c = b.parsedType === Ga.promise ? b.data : Promise.resolve(b.data);
    return Uc(c.then(a => this._def.type.parseAsync(a, {
      path: b.path,
      errorMap: b.common.contextualErrorMap
    })));
  }
}
hf.create = (a, b) => new hf({
  type: a,
  typeName: sf.ZodPromise,
  ...ae(b)
});
class jf extends ce {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    if (this._def.schema._def.typeName === sf.ZodEffects) {
      return this._def.schema.sourceType();
    } else {
      return this._def.schema;
    }
  }
  _parse(a) {
    const {
      status: b,
      ctx: c
    } = this._processInputParams(a);
    const d = this._def.effect || null;
    if (d.type === "preprocess") {
      const a = d.transform(c.data);
      if (c.common.async) {
        return Promise.resolve(a).then(a => this._def.schema._parseAsync({
          data: a,
          path: c.path,
          parent: c
        }));
      } else {
        return this._def.schema._parseSync({
          data: a,
          path: c.path,
          parent: c
        });
      }
    }
    const e = {
      addIssue: a => {
        Nc(c, a);
        if (a.fatal) {
          b.abort();
        } else {
          b.dirty();
        }
      },
      get path() {
        return c.path;
      }
    };
    e.addIssue = e.addIssue.bind(e);
    if (d.type === "refinement") {
      const a = a => {
        const b = d.refinement(a, e);
        if (c.common.async) {
          return Promise.resolve(b);
        }
        if (b instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return a;
      };
      if (c.common.async === false) {
        const d = this._def.schema._parseSync({
          data: c.data,
          path: c.path,
          parent: c
        });
        if (d.status === "aborted") {
          return Pc;
        } else {
          if (d.status === "dirty") {
            b.dirty();
          }
          a(d.value);
          return {
            status: b.value,
            value: d.value
          };
        }
      } else {
        return this._def.schema._parseAsync({
          data: c.data,
          path: c.path,
          parent: c
        }).then(c => c.status === "aborted" ? Pc : (c.status === "dirty" && b.dirty(), a(c.value).then(() => ({
          status: b.value,
          value: c.value
        }))));
      }
    }
    if (d.type === "transform") {
      if (c.common.async === false) {
        const a = this._def.schema._parseSync({
          data: c.data,
          path: c.path,
          parent: c
        });
        if (!Ya(a)) {
          return a;
        }
        const f = d.transform(a.value, e);
        if (f instanceof Promise) {
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return {
          status: b.value,
          value: f
        };
      } else {
        return this._def.schema._parseAsync({
          data: c.data,
          path: c.path,
          parent: c
        }).then(a => Ya(a) ? Promise.resolve(d.transform(a.value, e)).then(a => ({
          status: b.value,
          value: a
        })) : a);
      }
    }
    _b.assertNever(d);
  }
}
jf.create = (a, b, c) => new jf({
  schema: a,
  typeName: sf.ZodEffects,
  effect: b,
  ...ae(c)
});
jf.createWithPreprocess = (a, b, c) => new jf({
  schema: b,
  effect: {
    type: "preprocess",
    transform: a
  },
  typeName: sf.ZodEffects,
  ...ae(c)
});
class kf extends ce {
  _parse(a) {
    if (this._getType(a) === Ga.undefined) {
      return Uc(undefined);
    } else {
      return this._def.innerType._parse(a);
    }
  }
  unwrap() {
    return this._def.innerType;
  }
}
kf.create = (a, b) => new kf({
  innerType: a,
  typeName: sf.ZodOptional,
  ...ae(b)
});
class lf extends ce {
  _parse(a) {
    if (this._getType(a) === Ga.null) {
      return Uc(null);
    } else {
      return this._def.innerType._parse(a);
    }
  }
  unwrap() {
    return this._def.innerType;
  }
}
lf.create = (a, b) => new lf({
  innerType: a,
  typeName: sf.ZodNullable,
  ...ae(b)
});
class mf extends ce {
  _parse(a) {
    const {
      ctx: b
    } = this._processInputParams(a);
    let c = b.data;
    if (b.parsedType === Ga.undefined) {
      c = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data: c,
      path: b.path,
      parent: b
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
mf.create = (a, b) => new mf({
  innerType: a,
  typeName: sf.ZodDefault,
  defaultValue: typeof b.default == "function" ? b.default : () => b.default,
  ...ae(b)
});
class nf extends ce {
  _parse(a) {
    const {
      ctx: b
    } = this._processInputParams(a);
    const c = {
      ...b,
      common: {
        ...b.common,
        issues: []
      }
    };
    const d = this._def.innerType._parse({
      data: c.data,
      path: c.path,
      parent: {
        ...c
      }
    });
    if (Wc(d)) {
      return d.then(a => ({
        status: "valid",
        value: a.status === "valid" ? a.value : this._def.catchValue({
          get error() {
            return new Fc(c.common.issues);
          },
          input: c.data
        })
      }));
    } else {
      return {
        status: "valid",
        value: d.status === "valid" ? d.value : this._def.catchValue({
          get error() {
            return new Fc(c.common.issues);
          },
          input: c.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
nf.create = (a, b) => new nf({
  innerType: a,
  typeName: sf.ZodCatch,
  catchValue: typeof b.catch == "function" ? b.catch : () => b.catch,
  ...ae(b)
});
class ta extends ce {
  _parse(a) {
    if (this._getType(a) !== Ga.nan) {
      const b = this._getOrReturnCtx(a);
      Nc(b, {
        code: Cc.invalid_type,
        expected: Ga.nan,
        received: b.parsedType
      });
      return Pc;
    }
    return {
      status: "valid",
      value: a.data
    };
  }
}
ta.create = a => new ta({
  typeName: sf.ZodNaN,
  ...ae(a)
});
const ra = Symbol("zod_brand");
class of extends ce {
  _parse(a) {
    const {
      ctx: b
    } = this._processInputParams(a);
    const c = b.data;
    return this._def.type._parse({
      data: c,
      path: b.path,
      parent: b
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class pf extends ce {
  _parse(a) {
    const {
      status: b,
      ctx: c
    } = this._processInputParams(a);
    if (c.common.async) {
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: c.data,
          path: c.path,
          parent: c
        });
        if (a.status === "aborted") {
          return Pc;
        } else if (a.status === "dirty") {
          b.dirty();
          return Qc(a.value);
        } else {
          return this._def.out._parseAsync({
            data: a.value,
            path: c.path,
            parent: c
          });
        }
      })();
    }
    {
      const a = this._def.in._parseSync({
        data: c.data,
        path: c.path,
        parent: c
      });
      if (a.status === "aborted") {
        return Pc;
      } else if (a.status === "dirty") {
        b.dirty();
        return {
          status: "dirty",
          value: a.value
        };
      } else {
        return this._def.out._parseSync({
          data: a.value,
          path: c.path,
          parent: c
        });
      }
    }
  }
  static create(a, b) {
    return new pf({
      in: a,
      out: b,
      typeName: sf.ZodPipeline
    });
  }
}
const qf = (a, b = undefined, c) => {
  if (b === undefined) b = {};
  return a ? Ne.create().superRefine((d, e) => {
    if (!a(d)) {
      const a = typeof b == "function" ? b(d) : typeof b == "string" ? {
        message: b
      } : b;
      const f = a.fatal ?? c ?? true;
      const g = typeof a == "string" ? {
        message: a
      } : a;
      e.addIssue({
        code: "custom",
        ...g,
        fatal: f
      });
    }
  }) : Ne.create();
};
const rf = {
  object: Ve.lazycreate
};
var sf;
(function (a) {
  a.ZodString = "ZodString";
  a.ZodNumber = "ZodNumber";
  a.ZodNaN = "ZodNaN";
  a.ZodBigInt = "ZodBigInt";
  a.ZodBoolean = "ZodBoolean";
  a.ZodDate = "ZodDate";
  a.ZodSymbol = "ZodSymbol";
  a.ZodUndefined = "ZodUndefined";
  a.ZodNull = "ZodNull";
  a.ZodAny = "ZodAny";
  a.ZodUnknown = "ZodUnknown";
  a.ZodNever = "ZodNever";
  a.ZodVoid = "ZodVoid";
  a.ZodArray = "ZodArray";
  a.ZodObject = "ZodObject";
  a.ZodUnion = "ZodUnion";
  a.ZodDiscriminatedUnion = "ZodDiscriminatedUnion";
  a.ZodIntersection = "ZodIntersection";
  a.ZodTuple = "ZodTuple";
  a.ZodRecord = "ZodRecord";
  a.ZodMap = "ZodMap";
  a.ZodSet = "ZodSet";
  a.ZodFunction = "ZodFunction";
  a.ZodLazy = "ZodLazy";
  a.ZodLiteral = "ZodLiteral";
  a.ZodEnum = "ZodEnum";
  a.ZodEffects = "ZodEffects";
  a.ZodNativeEnum = "ZodNativeEnum";
  a.ZodOptional = "ZodOptional";
  a.ZodNullable = "ZodNullable";
  a.ZodDefault = "ZodDefault";
  a.ZodCatch = "ZodCatch";
  a.ZodPromise = "ZodPromise";
  a.ZodBranded = "ZodBranded";
  a.ZodPipeline = "ZodPipeline";
})(sf ||= {});
const de = (a, b = undefined) => {
  if (b === undefined) b = {
    message: "Input not instance of " + a.name
  };
  return qf(b => b instanceof a, b);
};
const tf = ve.create;
const uf = ye.create;
const vf = ta.create;
const wf = Ae.create;
const xf = De.create;
const yf = Ee.create;
const zf = He.create;
const Af = Ke.create;
const Bf = Me.create;
const Cf = Ne.create;
const Df = Pe.create;
const Ef = Qe.create;
const Ff = Re.create;
const Gf = Se.create;
const Hf = Ve.create;
const If = Ve.strictCreate;
const Jf = Ie.create;
const Kf = Ze.create;
const Lf = Ja.create;
const Mf = $e.create;
const Nf = _e.create;
const Of = af.create;
const Pf = ea.create;
const Qf = bf.create;
const Rf = cf.create;
const Sf = df.create;
const Tf = ff.create;
const Uf = gf.create;
const Vf = hf.create;
const Wf = jf.create;
const Xf = kf.create;
const Yf = lf.create;
const Zf = jf.createWithPreprocess;
const $f = pf.create;
const _f = () => tf().optional();
const ag = () => uf().optional();
const bg = () => xf().optional();
const cg = {
  string: a => ve.create({
    ...a,
    coerce: true
  }),
  number: a => ye.create({
    ...a,
    coerce: true
  }),
  boolean: a => De.create({
    ...a,
    coerce: true
  }),
  bigint: a => Ae.create({
    ...a,
    coerce: true
  }),
  date: a => Ee.create({
    ...a,
    coerce: true
  })
};
const dg = Pc;
var eg = Object.freeze({
  "__proto__": null,
  defaultErrorMap: Gc,
  setErrorMap: Jc,
  getErrorMap: Kc,
  makeIssue: Lc,
  EMPTY_PATH: Mc,
  addIssueToContext: Nc,
  ParseStatus: Oc,
  INVALID: Pc,
  DIRTY: Qc,
  OK: Uc,
  isAborted: Vc,
  isDirty: Ka,
  isValid: Ya,
  isAsync: Wc,
  get util() {
    return _b;
  },
  get objectUtil() {
    return jc;
  },
  ZodParsedType: Ga,
  getParsedType: qc,
  ZodType: ce,
  ZodString: ve,
  ZodNumber: ye,
  ZodBigInt: Ae,
  ZodBoolean: De,
  ZodDate: Ee,
  ZodSymbol: He,
  ZodUndefined: Ke,
  ZodNull: Me,
  ZodAny: Ne,
  ZodUnknown: Pe,
  ZodNever: Qe,
  ZodVoid: Re,
  ZodArray: Se,
  ZodObject: Ve,
  ZodUnion: Ie,
  ZodDiscriminatedUnion: Ze,
  ZodIntersection: Ja,
  ZodTuple: $e,
  ZodRecord: _e,
  ZodMap: af,
  ZodSet: ea,
  ZodFunction: bf,
  ZodLazy: cf,
  ZodLiteral: df,
  ZodEnum: ff,
  ZodNativeEnum: gf,
  ZodPromise: hf,
  ZodEffects: jf,
  ZodTransformer: jf,
  ZodOptional: kf,
  ZodNullable: lf,
  ZodDefault: mf,
  ZodCatch: nf,
  ZodNaN: ta,
  BRAND: ra,
  ZodBranded: of,
  ZodPipeline: pf,
  custom: qf,
  Schema: ce,
  ZodSchema: ce,
  late: rf,
  get ZodFirstPartyTypeKind() {
    return sf;
  },
  coerce: cg,
  any: Cf,
  array: Gf,
  bigint: wf,
  boolean: xf,
  date: yf,
  discriminatedUnion: Kf,
  effect: Wf,
  enum: Tf,
  function: Qf,
  instanceof: de,
  intersection: Lf,
  lazy: Rf,
  literal: Sf,
  map: Of,
  nan: vf,
  nativeEnum: Uf,
  never: Ef,
  null: Bf,
  nullable: Yf,
  number: uf,
  object: Hf,
  oboolean: bg,
  onumber: ag,
  optional: Xf,
  ostring: _f,
  pipeline: $f,
  preprocess: Zf,
  promise: Vf,
  record: Nf,
  set: Pf,
  strictObject: If,
  string: tf,
  symbol: zf,
  transformer: Wf,
  tuple: Mf,
  undefined: Af,
  union: Jf,
  unknown: Df,
  void: Ff,
  NEVER: dg,
  ZodIssueCode: Cc,
  quotelessJson: J,
  ZodError: Fc
});
var me = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
var fg = eg.object({
  codename: eg.string(),
  version: eg.string().regex(me),
  permissions: eg.string().array()
});
fg.omit({
  permissions: true
});
eg.object({
  API_URL: eg.string().url(),
  API_KEY: eg.string(),
  KEYS: eg.string().array()
});
eg.object({
  id: eg.number(),
  origin: eg.string()
});
eg.tuple([eg.boolean(), eg.any()]);
eg.object({
  resolve: eg.function().args(eg.any()).returns(eg.void()),
  reject: eg.function().args(eg.any()).returns(eg.void()),
  timeout: eg.number()
});
eg.object({
  id: eg.number(),
  resource: eg.string()
});
eg.tuple([eg.boolean(), eg.any()]);
eg.object({
  resolve: eg.function().args(eg.any()).returns(eg.void()),
  reject: eg.function().args(eg.any()).returns(eg.void()),
  timeout: eg.number()
});
let gg;
const hg = new Uint8Array(16);
function ig() {
  if (!gg && (gg = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !gg)) {
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  }
  return gg(hg);
}
const jg = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function kg(a) {
  return typeof a == "string" && jg.test(a);
}
const lg = [];
for (let a = 0; a < 256; ++a) {
  lg.push((a + 256).toString(16).slice(1));
}
function Oe(a, b = 0) {
  return (lg[a[b + 0]] + lg[a[b + 1]] + lg[a[b + 2]] + lg[a[b + 3]] + "-" + lg[a[b + 4]] + lg[a[b + 5]] + "-" + lg[a[b + 6]] + lg[a[b + 7]] + "-" + lg[a[b + 8]] + lg[a[b + 9]] + "-" + lg[a[b + 10]] + lg[a[b + 11]] + lg[a[b + 12]] + lg[a[b + 13]] + lg[a[b + 14]] + lg[a[b + 15]]).toLowerCase();
}
function mg(a) {
  if (!kg(a)) {
    throw TypeError("Invalid UUID");
  }
  let b;
  const c = new Uint8Array(16);
  c[0] = (b = parseInt(a.slice(0, 8), 16)) >>> 24;
  c[1] = b >>> 16 & 255;
  c[2] = b >>> 8 & 255;
  c[3] = b & 255;
  c[4] = (b = parseInt(a.slice(9, 13), 16)) >>> 8;
  c[5] = b & 255;
  c[6] = (b = parseInt(a.slice(14, 18), 16)) >>> 8;
  c[7] = b & 255;
  c[8] = (b = parseInt(a.slice(19, 23), 16)) >>> 8;
  c[9] = b & 255;
  c[10] = (b = parseInt(a.slice(24, 36), 16)) / 1099511627776 & 255;
  c[11] = b / 4294967296 & 255;
  c[12] = b >>> 24 & 255;
  c[13] = b >>> 16 & 255;
  c[14] = b >>> 8 & 255;
  c[15] = b & 255;
  return c;
}
function ng(a) {
  a = unescape(encodeURIComponent(a));
  const b = [];
  for (let c = 0; c < a.length; ++c) {
    b.push(a.charCodeAt(c));
  }
  return b;
}
const og = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
const pg = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function qg(a, b, c) {
  function d(a, d, e, f) {
    if (typeof a == "string") {
      a = ng(a);
    }
    if (typeof d == "string") {
      d = mg(d);
    }
    if (d?.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let g = new Uint8Array(16 + a.length);
    g.set(d);
    g.set(a, d.length);
    g = c(g);
    g[6] = g[6] & 15 | b;
    g[8] = g[8] & 63 | 128;
    if (e) {
      f = f || 0;
      for (let a = 0; a < 16; ++a) {
        e[f + a] = g[a];
      }
      return e;
    }
    return Oe(g);
  }
  try {
    d.name = a;
  } catch {}
  d.DNS = og;
  d.URL = pg;
  return d;
}
const rg = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const sg = {
  randomUUID: rg
};
function tg(a, b, c) {
  if (sg.randomUUID && !b && !a) {
    return sg.randomUUID();
  }
  a = a || {};
  const d = a.random || (a.rng || ig)();
  d[6] = d[6] & 15 | 64;
  d[8] = d[8] & 63 | 128;
  if (b) {
    c = c || 0;
    for (let a = 0; a < 16; ++a) {
      b[c + a] = d[a];
    }
    return b;
  }
  return Oe(d);
}
function ug(a, b, c, d) {
  switch (a) {
    case 0:
      return b & c ^ ~b & d;
    case 1:
      return b ^ c ^ d;
    case 2:
      return b & c ^ b & d ^ c & d;
    case 3:
      return b ^ c ^ d;
  }
}
function vg(a, b) {
  return a << b | a >>> 32 - b;
}
function Aa(a) {
  const b = [1518500249, 1859775393, 2400959708, 3395469782];
  const c = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof a == "string") {
    const b = unescape(encodeURIComponent(a));
    a = [];
    for (let c = 0; c < b.length; ++c) {
      a.push(b.charCodeAt(c));
    }
  } else if (!Array.isArray(a)) {
    a = Array.prototype.slice.call(a);
  }
  a.push(128);
  const d = a.length / 4 + 2;
  const e = Math.ceil(d / 16);
  const f = new Array(e);
  for (let b = 0; b < e; ++b) {
    const c = new Uint32Array(16);
    for (let d = 0; d < 16; ++d) {
      c[d] = a[b * 64 + d * 4] << 24 | a[b * 64 + d * 4 + 1] << 16 | a[b * 64 + d * 4 + 2] << 8 | a[b * 64 + d * 4 + 3];
    }
    f[b] = c;
  }
  f[e - 1][14] = (a.length - 1) * 8 / Math.pow(2, 32);
  f[e - 1][14] = Math.floor(f[e - 1][14]);
  f[e - 1][15] = (a.length - 1) * 8 & 4294967295;
  for (let d = 0; d < e; ++d) {
    const a = new Uint32Array(80);
    for (let b = 0; b < 16; ++b) {
      a[b] = f[d][b];
    }
    for (let b = 16; b < 80; ++b) {
      a[b] = vg(a[b - 3] ^ a[b - 8] ^ a[b - 14] ^ a[b - 16], 1);
    }
    let e = c[0];
    let g = c[1];
    let h = c[2];
    let i = c[3];
    let j = c[4];
    for (let c = 0; c < 80; ++c) {
      const d = Math.floor(c / 20);
      const f = vg(e, 5) + ug(d, g, h, i) + j + b[d] + a[c] >>> 0;
      j = i;
      i = h;
      h = vg(g, 30) >>> 0;
      g = e;
      e = f;
    }
    c[0] = c[0] + e >>> 0;
    c[1] = c[1] + g >>> 0;
    c[2] = c[2] + h >>> 0;
    c[3] = c[3] + i >>> 0;
    c[4] = c[4] + j >>> 0;
  }
  return [c[0] >> 24 & 255, c[0] >> 16 & 255, c[0] >> 8 & 255, c[0] & 255, c[1] >> 24 & 255, c[1] >> 16 & 255, c[1] >> 8 & 255, c[1] & 255, c[2] >> 24 & 255, c[2] >> 16 & 255, c[2] >> 8 & 255, c[2] & 255, c[3] >> 24 & 255, c[3] >> 16 & 255, c[3] >> 8 & 255, c[3] & 255, c[4] >> 24 & 255, c[4] >> 16 & 255, c[4] >> 8 & 255, c[4] & 255];
}
const wg = qg("v5", 80, Aa);
const xg = wg;
const yg = 4;
const zg = 0;
const Ag = 1;
const Bg = 2;
function Cg(a) {
  let b = a.length;
  while (--b >= 0) {
    a[b] = 0;
  }
}
const Dg = 0;
const Eg = 1;
const Fg = 2;
const Gg = 3;
const Hg = 258;
const ed = 29;
const Ig = 256;
const Jg = Ig + 1 + ed;
const Kg = 30;
const Lg = 19;
const Mg = Jg * 2 + 1;
const Ng = 15;
const Og = 16;
const Ta = 7;
const td = 256;
const Pg = 16;
const Qg = 17;
const Rg = 18;
const Sg = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
const Qa = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
const Tg = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
const rd = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
const Ug = 512;
const nd = new Array((Jg + 2) * 2);
Cg(nd);
const Vg = new Array(Kg * 2);
Cg(Vg);
const Wg = new Array(Ug);
Cg(Wg);
const Xg = new Array(Hg - Gg + 1);
Cg(Xg);
const Yg = new Array(ed);
Cg(Yg);
const Zg = new Array(Kg);
Cg(Zg);
function na(a, b, c, d, e) {
  this.static_tree = a;
  this.extra_bits = b;
  this.extra_base = c;
  this.elems = d;
  this.max_length = e;
  this.has_stree = a && a.length;
}
let $a;
let $g;
let _g;
function ai(a, b) {
  this.dyn_tree = a;
  this.max_code = 0;
  this.stat_desc = b;
}
const Ba = a => a < 256 ? Wg[a] : Wg[256 + (a >>> 7)];
const di = (a, b) => {
  a.pending_buf[a.pending++] = b & 255;
  a.pending_buf[a.pending++] = b >>> 8 & 255;
};
const gi = (a, b, c) => {
  if (a.bi_valid > Og - c) {
    a.bi_buf |= b << a.bi_valid & 65535;
    di(a, a.bi_buf);
    a.bi_buf = b >> Og - a.bi_valid;
    a.bi_valid += c - Og;
  } else {
    a.bi_buf |= b << a.bi_valid & 65535;
    a.bi_valid += c;
  }
};
const Ge = (a, b, c) => {
  gi(a, c[b * 2], c[b * 2 + 1]);
};
const hi = (a, b) => {
  let c = 0;
  do {
    c |= a & 1;
    a >>>= 1;
    c <<= 1;
  } while (--b > 0);
  return c >>> 1;
};
const ii = a => {
  if (a.bi_valid === 16) {
    di(a, a.bi_buf);
    a.bi_buf = 0;
    a.bi_valid = 0;
  } else if (a.bi_valid >= 8) {
    a.pending_buf[a.pending++] = a.bi_buf & 255;
    a.bi_buf >>= 8;
    a.bi_valid -= 8;
  }
};
const id = (a, b) => {
  const c = b.dyn_tree;
  const d = b.max_code;
  const e = b.stat_desc.static_tree;
  const f = b.stat_desc.has_stree;
  const g = b.stat_desc.extra_bits;
  const h = b.stat_desc.extra_base;
  const i = b.stat_desc.max_length;
  let j;
  let k;
  let l;
  let m;
  let n;
  let o;
  let p = 0;
  for (m = 0; m <= Ng; m++) {
    a.bl_count[m] = 0;
  }
  c[a.heap[a.heap_max] * 2 + 1] = 0;
  j = a.heap_max + 1;
  for (; j < Mg; j++) {
    k = a.heap[j];
    m = c[c[k * 2 + 1] * 2 + 1] + 1;
    if (m > i) {
      m = i;
      p++;
    }
    c[k * 2 + 1] = m;
    if (k <= d) {
      a.bl_count[m]++;
      n = 0;
      if (k >= h) {
        n = g[k - h];
      }
      o = c[k * 2];
      a.opt_len += o * (m + n);
      if (f) {
        a.static_len += o * (e[k * 2 + 1] + n);
      }
    }
  }
  if (p !== 0) {
    do {
      for (m = i - 1; a.bl_count[m] === 0;) {
        m--;
      }
      a.bl_count[m]--;
      a.bl_count[m + 1] += 2;
      a.bl_count[i]--;
      p -= 2;
    } while (p > 0);
    for (m = i; m !== 0; m--) {
      for (k = a.bl_count[m]; k !== 0;) {
        l = a.heap[--j];
        if (l <= d) {
          if (c[l * 2 + 1] !== m) {
            a.opt_len += (m - c[l * 2 + 1]) * c[l * 2];
            c[l * 2 + 1] = m;
          }
          k--;
        }
      }
    }
  }
};
const ad = (a, b, c) => {
  const d = new Array(Ng + 1);
  let e = 0;
  let f;
  let g;
  for (f = 1; f <= Ng; f++) {
    e = e + c[f - 1] << 1;
    d[f] = e;
  }
  for (g = 0; g <= b; g++) {
    let b = a[g * 2 + 1];
    if (b !== 0) {
      a[g * 2] = hi(d[b]++, b);
    }
  }
};
const mi = () => {
  let a;
  let b;
  let c;
  let d;
  let e;
  const f = new Array(Ng + 1);
  c = 0;
  d = 0;
  for (; d < ed - 1; d++) {
    Yg[d] = c;
    a = 0;
    for (; a < 1 << Sg[d]; a++) {
      Xg[c++] = d;
    }
  }
  Xg[c - 1] = d;
  e = 0;
  d = 0;
  for (; d < 16; d++) {
    Zg[d] = e;
    a = 0;
    for (; a < 1 << Qa[d]; a++) {
      Wg[e++] = d;
    }
  }
  for (e >>= 7; d < Kg; d++) {
    Zg[d] = e << 7;
    a = 0;
    for (; a < 1 << Qa[d] - 7; a++) {
      Wg[256 + e++] = d;
    }
  }
  for (b = 0; b <= Ng; b++) {
    f[b] = 0;
  }
  for (a = 0; a <= 143;) {
    nd[a * 2 + 1] = 8;
    a++;
    f[8]++;
  }
  while (a <= 255) {
    nd[a * 2 + 1] = 9;
    a++;
    f[9]++;
  }
  while (a <= 279) {
    nd[a * 2 + 1] = 7;
    a++;
    f[7]++;
  }
  while (a <= 287) {
    nd[a * 2 + 1] = 8;
    a++;
    f[8]++;
  }
  ad(nd, Jg + 1, f);
  a = 0;
  for (; a < Kg; a++) {
    Vg[a * 2 + 1] = 5;
    Vg[a * 2] = hi(a, 5);
  }
  $a = new na(nd, Sg, Ig + 1, Jg, Ng);
  $g = new na(Vg, Qa, 0, Kg, Ng);
  _g = new na(new Array(0), Tg, 0, Lg, Ta);
};
const sd = a => {
  let b;
  for (b = 0; b < Jg; b++) {
    a.dyn_ltree[b * 2] = 0;
  }
  for (b = 0; b < Kg; b++) {
    a.dyn_dtree[b * 2] = 0;
  }
  for (b = 0; b < Lg; b++) {
    a.bl_tree[b * 2] = 0;
  }
  a.dyn_ltree[td * 2] = 1;
  a.opt_len = a.static_len = 0;
  a.sym_next = a.matches = 0;
};
const pi = a => {
  if (a.bi_valid > 8) {
    di(a, a.bi_buf);
  } else if (a.bi_valid > 0) {
    a.pending_buf[a.pending++] = a.bi_buf;
  }
  a.bi_buf = 0;
  a.bi_valid = 0;
};
const qi = (a, b, c, d) => {
  const e = b * 2;
  const f = c * 2;
  return a[e] < a[f] || a[e] === a[f] && d[b] <= d[c];
};
const si = (a, b, c) => {
  const d = a.heap[c];
  let e = c << 1;
  while (e <= a.heap_len && (e < a.heap_len && qi(b, a.heap[e + 1], a.heap[e], a.depth) && e++, !qi(b, d, a.heap[e], a.depth))) {
    a.heap[c] = a.heap[e];
    c = e;
    e <<= 1;
  }
  a.heap[c] = d;
};
const Ia = (a, b, c) => {
  let d;
  let e;
  let f = 0;
  let g;
  let h;
  if (a.sym_next !== 0) {
    do {
      d = a.pending_buf[a.sym_buf + f++] & 255;
      d += (a.pending_buf[a.sym_buf + f++] & 255) << 8;
      e = a.pending_buf[a.sym_buf + f++];
      if (d === 0) {
        Ge(a, e, b);
      } else {
        g = Xg[e];
        Ge(a, g + Ig + 1, b);
        h = Sg[g];
        if (h !== 0) {
          e -= Yg[g];
          gi(a, e, h);
        }
        d--;
        g = Ba(d);
        Ge(a, g, c);
        h = Qa[g];
        if (h !== 0) {
          d -= Zg[g];
          gi(a, d, h);
        }
      }
    } while (f < a.sym_next);
  }
  Ge(a, td, b);
};
const ui = (a, b) => {
  const c = b.dyn_tree;
  const d = b.stat_desc.static_tree;
  const e = b.stat_desc.has_stree;
  const f = b.stat_desc.elems;
  let g;
  let h;
  let i = -1;
  let j;
  a.heap_len = 0;
  a.heap_max = Mg;
  g = 0;
  for (; g < f; g++) {
    if (c[g * 2] !== 0) {
      a.heap[++a.heap_len] = i = g;
      a.depth[g] = 0;
    } else {
      c[g * 2 + 1] = 0;
    }
  }
  while (a.heap_len < 2) {
    j = a.heap[++a.heap_len] = i < 2 ? ++i : 0;
    c[j * 2] = 1;
    a.depth[j] = 0;
    a.opt_len--;
    if (e) {
      a.static_len -= d[j * 2 + 1];
    }
  }
  b.max_code = i;
  g = a.heap_len >> 1;
  for (; g >= 1; g--) {
    si(a, c, g);
  }
  j = f;
  do {
    g = a.heap[1];
    a.heap[1] = a.heap[a.heap_len--];
    si(a, c, 1);
    h = a.heap[1];
    a.heap[--a.heap_max] = g;
    a.heap[--a.heap_max] = h;
    c[j * 2] = c[g * 2] + c[h * 2];
    a.depth[j] = (a.depth[g] >= a.depth[h] ? a.depth[g] : a.depth[h]) + 1;
    c[g * 2 + 1] = c[h * 2 + 1] = j;
    a.heap[1] = j++;
    si(a, c, 1);
  } while (a.heap_len >= 2);
  a.heap[--a.heap_max] = a.heap[1];
  id(a, b);
  ad(c, i, a.bl_count);
};
const vi = (a, b, c) => {
  let d;
  let e = -1;
  let f;
  let g = b[1];
  let h = 0;
  let i = 7;
  let j = 4;
  if (g === 0) {
    i = 138;
    j = 3;
  }
  b[(c + 1) * 2 + 1] = 65535;
  d = 0;
  for (; d <= c; d++) {
    f = g;
    g = b[(d + 1) * 2 + 1];
    if (++h >= i || f !== g) {
      if (h < j) {
        a.bl_tree[f * 2] += h;
      } else if (f !== 0) {
        if (f !== e) {
          a.bl_tree[f * 2]++;
        }
        a.bl_tree[Pg * 2]++;
      } else if (h <= 10) {
        a.bl_tree[Qg * 2]++;
      } else {
        a.bl_tree[Rg * 2]++;
      }
      h = 0;
      e = f;
      if (g === 0) {
        i = 138;
        j = 3;
      } else if (f === g) {
        i = 6;
        j = 3;
      } else {
        i = 7;
        j = 4;
      }
    }
  }
};
const wi = (a, b, c) => {
  let d;
  let e = -1;
  let f;
  let g = b[1];
  let h = 0;
  let i = 7;
  let j = 4;
  if (g === 0) {
    i = 138;
    j = 3;
  }
  d = 0;
  for (; d <= c; d++) {
    f = g;
    g = b[(d + 1) * 2 + 1];
    if (++h >= i || f !== g) {
      if (h < j) {
        do {
          Ge(a, f, a.bl_tree);
        } while (--h !== 0);
      } else if (f !== 0) {
        if (f !== e) {
          Ge(a, f, a.bl_tree);
          h--;
        }
        Ge(a, Pg, a.bl_tree);
        gi(a, h - 3, 2);
      } else if (h <= 10) {
        Ge(a, Qg, a.bl_tree);
        gi(a, h - 3, 3);
      } else {
        Ge(a, Rg, a.bl_tree);
        gi(a, h - 11, 7);
      }
      h = 0;
      e = f;
      if (g === 0) {
        i = 138;
        j = 3;
      } else if (f === g) {
        i = 6;
        j = 3;
      } else {
        i = 7;
        j = 4;
      }
    }
  }
};
const xi = a => {
  let b;
  vi(a, a.dyn_ltree, a.l_desc.max_code);
  vi(a, a.dyn_dtree, a.d_desc.max_code);
  ui(a, a.bl_desc);
  b = Lg - 1;
  for (; b >= 3 && a.bl_tree[rd[b] * 2 + 1] === 0; b--);
  a.opt_len += (b + 1) * 3 + 5 + 5 + 4;
  return b;
};
const od = (a, b, c, d) => {
  let e;
  gi(a, b - 257, 5);
  gi(a, c - 1, 5);
  gi(a, d - 4, 4);
  e = 0;
  for (; e < d; e++) {
    gi(a, a.bl_tree[rd[e] * 2 + 1], 3);
  }
  wi(a, a.dyn_ltree, b - 1);
  wi(a, a.dyn_dtree, c - 1);
};
const ld = a => {
  let b = 4093624447;
  let c;
  for (c = 0; c <= 31; c++, b >>>= 1) {
    if (b & 1 && a.dyn_ltree[c * 2] !== 0) {
      return zg;
    }
  }
  if (a.dyn_ltree[18] !== 0 || a.dyn_ltree[20] !== 0 || a.dyn_ltree[26] !== 0) {
    return Ag;
  }
  for (c = 32; c < Ig; c++) {
    if (a.dyn_ltree[c * 2] !== 0) {
      return Ag;
    }
  }
  return zg;
};
let cd = false;
const yi = a => {
  if (!cd) {
    mi();
    cd = true;
  }
  a.l_desc = new ai(a.dyn_ltree, $a);
  a.d_desc = new ai(a.dyn_dtree, $g);
  a.bl_desc = new ai(a.bl_tree, _g);
  a.bi_buf = 0;
  a.bi_valid = 0;
  sd(a);
};
const fd = (a, b, c, d) => {
  gi(a, (Dg << 1) + (d ? 1 : 0), 3);
  pi(a);
  di(a, c);
  di(a, ~c);
  if (c) {
    a.pending_buf.set(a.window.subarray(b, b + c), a.pending);
  }
  a.pending += c;
};
const Gi = a => {
  gi(a, Eg << 1, 3);
  Ge(a, td, nd);
  ii(a);
};
const ud = (a, b, c, d) => {
  let e;
  let f;
  let g = 0;
  if (a.level > 0) {
    if (a.strm.data_type === Bg) {
      a.strm.data_type = ld(a);
    }
    ui(a, a.l_desc);
    ui(a, a.d_desc);
    g = xi(a);
    e = a.opt_len + 3 + 7 >>> 3;
    f = a.static_len + 3 + 7 >>> 3;
    if (f <= e) {
      e = f;
    }
  } else {
    e = f = c + 5;
  }
  if (c + 4 <= e && b !== -1) {
    fd(a, b, c, d);
  } else if (a.strategy === yg || f === e) {
    gi(a, (Eg << 1) + (d ? 1 : 0), 3);
    Ia(a, nd, Vg);
  } else {
    gi(a, (Fg << 1) + (d ? 1 : 0), 3);
    od(a, a.l_desc.max_code + 1, a.d_desc.max_code + 1, g + 1);
    Ia(a, a.dyn_ltree, a.dyn_dtree);
  }
  sd(a);
  if (d) {
    pi(a);
  }
};
const dd = (a, b, c) => {
  a.pending_buf[a.sym_buf + a.sym_next++] = b;
  a.pending_buf[a.sym_buf + a.sym_next++] = b >> 8;
  a.pending_buf[a.sym_buf + a.sym_next++] = c;
  if (b === 0) {
    a.dyn_ltree[c * 2]++;
  } else {
    a.matches++;
    b--;
    a.dyn_ltree[(Xg[c] + Ig + 1) * 2]++;
    a.dyn_dtree[Ba(b) * 2]++;
  }
  return a.sym_next === a.sym_end;
};
var hd = yi;
var vd = fd;
var _d = ud;
var pd = dd;
var yd = Gi;
var gd = {
  _tr_init: hd,
  _tr_stored_block: vd,
  _tr_flush_block: _d,
  _tr_tally: pd,
  _tr_align: yd
};
const md = (a, b, c, d) => {
  let e = a & 65535 | 0;
  let f = a >>> 16 & 65535 | 0;
  let g = 0;
  while (c !== 0) {
    g = c > 2000 ? 2000 : c;
    c -= g;
    do {
      e = e + b[d++] | 0;
      f = f + e | 0;
    } while (--g);
    e %= 65521;
    f %= 65521;
  }
  return e | f << 16 | 0;
};
var wd = md;
const Hi = () => {
  let a;
  let b = [];
  for (var c = 0; c < 256; c++) {
    a = c;
    for (var d = 0; d < 8; d++) {
      a = a & 1 ? a >>> 1 ^ 3988292384 : a >>> 1;
    }
    b[c] = a;
  }
  return b;
};
const xd = new Uint32Array(Hi());
const bd = (a, b, c, d) => {
  const e = xd;
  const f = d + c;
  a ^= -1;
  for (let g = d; g < f; g++) {
    a = a >>> 8 ^ e[(a ^ b[g]) & 255];
  }
  return a ^ -1;
};
var kd = bd;
var Ue = {
  2: "need dictionary",
  1: "stream end",
  0: "",
  "-1": "file error",
  "-2": "stream error",
  "-3": "data error",
  "-4": "insufficient memory",
  "-5": "buffer error",
  "-6": "incompatible version"
};
var Ji = {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  Z_BINARY: 0,
  Z_TEXT: 1,
  Z_UNKNOWN: 2,
  Z_DEFLATED: 8
};
const {
  _tr_init: Ki,
  _tr_stored_block: Ed,
  _tr_flush_block: Li,
  _tr_tally: Sd,
  _tr_align: Mi
} = gd;
const {
  Z_NO_FLUSH: Cd,
  Z_PARTIAL_FLUSH: Pi,
  Z_FULL_FLUSH: Ad,
  Z_FINISH: Td,
  Z_BLOCK: Qi,
  Z_OK: Ti,
  Z_STREAM_END: je,
  Z_STREAM_ERROR: Vi,
  Z_DATA_ERROR: Wi,
  Z_BUF_ERROR: $d,
  Z_DEFAULT_COMPRESSION: Ra,
  Z_FILTERED: Bd,
  Z_HUFFMAN_ONLY: Id,
  Z_RLE: bi,
  Z_FIXED: Rd,
  Z_DEFAULT_STRATEGY: zd,
  Z_UNKNOWN: Dd,
  Z_DEFLATED: Fd
} = Ji;
const ga = 9;
const Ud = 15;
const Nd = 8;
const Od = 29;
const jd = 256;
const Md = jd + 1 + Od;
const Xi = 30;
const Zd = 19;
const Ld = Md * 2 + 1;
const Hd = 15;
const Pd = 3;
const we = 258;
const Yi = we + Pd + 1;
const Zi = 32;
const Wd = 42;
const $i = 57;
const _i = 69;
const aj = 73;
const bj = 91;
const cj = 103;
const dj = 113;
const ej = 666;
const fj = 1;
const We = 2;
const gj = 3;
const hj = 4;
const ij = 3;
const Vd = (a, b) => {
  a.msg = Ue[b];
  return b;
};
const jj = a => a * 2 - (a > 4 ? 9 : 0);
const kj = a => {
  let b = a.length;
  while (--b >= 0) {
    a[b] = 0;
  }
};
const lj = a => {
  let b;
  let c;
  let d;
  let e = a.w_size;
  b = a.hash_size;
  d = b;
  do {
    c = a.head[--d];
    a.head[d] = c >= e ? c - e : 0;
  } while (--b);
  b = e;
  d = b;
  do {
    c = a.prev[--d];
    a.prev[d] = c >= e ? c - e : 0;
  } while (--b);
};
let qd = (a, b, c) => (b << a.hash_shift ^ c) & a.hash_mask;
let Xd = qd;
const mj = a => {
  const b = a.state;
  let c = b.pending;
  if (c > a.avail_out) {
    c = a.avail_out;
  }
  if (c !== 0) {
    a.output.set(b.pending_buf.subarray(b.pending_out, b.pending_out + c), a.next_out);
    a.next_out += c;
    b.pending_out += c;
    a.total_out += c;
    a.avail_out -= c;
    b.pending -= c;
    if (b.pending === 0) {
      b.pending_out = 0;
    }
  }
};
const nj = (a, b) => {
  Li(a, a.block_start >= 0 ? a.block_start : -1, a.strstart - a.block_start, b);
  a.block_start = a.strstart;
  mj(a.strm);
};
const oj = (a, b) => {
  a.pending_buf[a.pending++] = b;
};
const Ce = (a, b) => {
  a.pending_buf[a.pending++] = b >>> 8 & 255;
  a.pending_buf[a.pending++] = b & 255;
};
const pj = (a, b, c, d) => {
  let e = a.avail_in;
  if (e > d) {
    e = d;
  }
  if (e === 0) {
    return 0;
  } else {
    a.avail_in -= e;
    b.set(a.input.subarray(a.next_in, a.next_in + e), c);
    if (a.state.wrap === 1) {
      a.adler = wd(a.adler, b, e, c);
    } else if (a.state.wrap === 2) {
      a.adler = kd(a.adler, b, e, c);
    }
    a.next_in += e;
    a.total_in += e;
    return e;
  }
};
const qj = (a, b) => {
  let c = a.max_chain_length;
  let d = a.strstart;
  let e;
  let f;
  let g = a.prev_length;
  let h = a.nice_match;
  const i = a.strstart > a.w_size - Yi ? a.strstart - (a.w_size - Yi) : 0;
  const j = a.window;
  const k = a.w_mask;
  const l = a.prev;
  const m = a.strstart + we;
  let n = j[d + g - 1];
  let o = j[d + g];
  if (a.prev_length >= a.good_match) {
    c >>= 2;
  }
  if (h > a.lookahead) {
    h = a.lookahead;
  }
  do {
    e = b;
    if (j[e + g] === o && j[e + g - 1] === n && j[e] === j[d] && j[++e] === j[d + 1]) {
      d += 2;
      e++;
      do ; while (j[++d] === j[++e] && j[++d] === j[++e] && j[++d] === j[++e] && j[++d] === j[++e] && j[++d] === j[++e] && j[++d] === j[++e] && j[++d] === j[++e] && j[++d] === j[++e] && d < m);
      f = we - (m - d);
      d = m - we;
      if (f > g) {
        a.match_start = b;
        g = f;
        if (f >= h) {
          break;
        }
        n = j[d + g - 1];
        o = j[d + g];
      }
    }
  } while ((b = l[b & k]) > i && --c !== 0);
  if (g <= a.lookahead) {
    return g;
  } else {
    return a.lookahead;
  }
};
const rj = a => {
  const b = a.w_size;
  let c;
  let d;
  let e;
  do {
    d = a.window_size - a.lookahead - a.strstart;
    if (a.strstart >= b + (b - Yi)) {
      a.window.set(a.window.subarray(b, b + b - d), 0);
      a.match_start -= b;
      a.strstart -= b;
      a.block_start -= b;
      if (a.insert > a.strstart) {
        a.insert = a.strstart;
      }
      lj(a);
      d += b;
    }
    if (a.strm.avail_in === 0) {
      break;
    }
    c = pj(a.strm, a.window, a.strstart + a.lookahead, d);
    a.lookahead += c;
    if (a.lookahead + a.insert >= Pd) {
      e = a.strstart - a.insert;
      a.ins_h = a.window[e];
      a.ins_h = Xd(a, a.ins_h, a.window[e + 1]);
      while (a.insert && (a.ins_h = Xd(a, a.ins_h, a.window[e + Pd - 1]), a.prev[e & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = e, e++, a.insert--, a.lookahead + a.insert >= Pd));
    }
  } while (a.lookahead < Yi && a.strm.avail_in !== 0);
};
const sj = (a, b) => {
  let c = a.pending_buf_size - 5 > a.w_size ? a.w_size : a.pending_buf_size - 5;
  let d;
  let e;
  let f;
  let g = 0;
  let h = a.strm.avail_in;
  do {
    d = 65535;
    f = a.bi_valid + 42 >> 3;
    if (a.strm.avail_out < f || (f = a.strm.avail_out - f, e = a.strstart - a.block_start, d > e + a.strm.avail_in && (d = e + a.strm.avail_in), d > f && (d = f), d < c && (d === 0 && b !== Td || b === Cd || d !== e + a.strm.avail_in))) {
      break;
    }
    g = b === Td && d === e + a.strm.avail_in ? 1 : 0;
    Ed(a, 0, 0, g);
    a.pending_buf[a.pending - 4] = d;
    a.pending_buf[a.pending - 3] = d >> 8;
    a.pending_buf[a.pending - 2] = ~d;
    a.pending_buf[a.pending - 1] = ~d >> 8;
    mj(a.strm);
    if (e) {
      if (e > d) {
        e = d;
      }
      a.strm.output.set(a.window.subarray(a.block_start, a.block_start + e), a.strm.next_out);
      a.strm.next_out += e;
      a.strm.avail_out -= e;
      a.strm.total_out += e;
      a.block_start += e;
      d -= e;
    }
    if (d) {
      pj(a.strm, a.strm.output, a.strm.next_out, d);
      a.strm.next_out += d;
      a.strm.avail_out -= d;
      a.strm.total_out += d;
    }
  } while (g === 0);
  h -= a.strm.avail_in;
  if (h) {
    if (h >= a.w_size) {
      a.matches = 2;
      a.window.set(a.strm.input.subarray(a.strm.next_in - a.w_size, a.strm.next_in), 0);
      a.strstart = a.w_size;
      a.insert = a.strstart;
    } else {
      if (a.window_size - a.strstart <= h) {
        a.strstart -= a.w_size;
        a.window.set(a.window.subarray(a.w_size, a.w_size + a.strstart), 0);
        if (a.matches < 2) {
          a.matches++;
        }
        if (a.insert > a.strstart) {
          a.insert = a.strstart;
        }
      }
      a.window.set(a.strm.input.subarray(a.strm.next_in - h, a.strm.next_in), a.strstart);
      a.strstart += h;
      a.insert += h > a.w_size - a.insert ? a.w_size - a.insert : h;
    }
    a.block_start = a.strstart;
  }
  if (a.high_water < a.strstart) {
    a.high_water = a.strstart;
  }
  if (g) {
    return hj;
  } else if (b !== Cd && b !== Td && a.strm.avail_in === 0 && a.strstart === a.block_start) {
    return We;
  } else {
    f = a.window_size - a.strstart;
    if (a.strm.avail_in > f && a.block_start >= a.w_size) {
      a.block_start -= a.w_size;
      a.strstart -= a.w_size;
      a.window.set(a.window.subarray(a.w_size, a.w_size + a.strstart), 0);
      if (a.matches < 2) {
        a.matches++;
      }
      f += a.w_size;
      if (a.insert > a.strstart) {
        a.insert = a.strstart;
      }
    }
    if (f > a.strm.avail_in) {
      f = a.strm.avail_in;
    }
    if (f) {
      pj(a.strm, a.window, a.strstart, f);
      a.strstart += f;
      a.insert += f > a.w_size - a.insert ? a.w_size - a.insert : f;
    }
    if (a.high_water < a.strstart) {
      a.high_water = a.strstart;
    }
    f = a.bi_valid + 42 >> 3;
    f = a.pending_buf_size - f > 65535 ? 65535 : a.pending_buf_size - f;
    c = f > a.w_size ? a.w_size : f;
    e = a.strstart - a.block_start;
    if (e >= c || (e || b === Td) && b !== Cd && a.strm.avail_in === 0 && e <= f) {
      d = e > f ? f : e;
      g = b === Td && a.strm.avail_in === 0 && d === e ? 1 : 0;
      Ed(a, a.block_start, d, g);
      a.block_start += d;
      mj(a.strm);
    }
    if (g) {
      return gj;
    } else {
      return fj;
    }
  }
};
const tj = (a, b) => {
  let c;
  let d;
  while (true) {
    if (a.lookahead < Yi) {
      rj(a);
      if (a.lookahead < Yi && b === Cd) {
        return fj;
      }
      if (a.lookahead === 0) {
        break;
      }
    }
    c = 0;
    if (a.lookahead >= Pd) {
      a.ins_h = Xd(a, a.ins_h, a.window[a.strstart + Pd - 1]);
      c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h];
      a.head[a.ins_h] = a.strstart;
    }
    if (c !== 0 && a.strstart - c <= a.w_size - Yi) {
      a.match_length = qj(a, c);
    }
    if (a.match_length >= Pd) {
      d = Sd(a, a.strstart - a.match_start, a.match_length - Pd);
      a.lookahead -= a.match_length;
      if (a.match_length <= a.max_lazy_match && a.lookahead >= Pd) {
        a.match_length--;
        do {
          a.strstart++;
          a.ins_h = Xd(a, a.ins_h, a.window[a.strstart + Pd - 1]);
          c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h];
          a.head[a.ins_h] = a.strstart;
        } while (--a.match_length !== 0);
        a.strstart++;
      } else {
        a.strstart += a.match_length;
        a.match_length = 0;
        a.ins_h = a.window[a.strstart];
        a.ins_h = Xd(a, a.ins_h, a.window[a.strstart + 1]);
      }
    } else {
      d = Sd(a, 0, a.window[a.strstart]);
      a.lookahead--;
      a.strstart++;
    }
    if (d && (nj(a, false), a.strm.avail_out === 0)) {
      return fj;
    }
  }
  a.insert = a.strstart < Pd - 1 ? a.strstart : Pd - 1;
  if (b === Td) {
    nj(a, true);
    if (a.strm.avail_out === 0) {
      return gj;
    } else {
      return hj;
    }
  } else if (a.sym_next && (nj(a, false), a.strm.avail_out === 0)) {
    return fj;
  } else {
    return We;
  }
};
const za = (a, b) => {
  let c;
  let d;
  let e;
  while (true) {
    if (a.lookahead < Yi) {
      rj(a);
      if (a.lookahead < Yi && b === Cd) {
        return fj;
      }
      if (a.lookahead === 0) {
        break;
      }
    }
    c = 0;
    if (a.lookahead >= Pd) {
      a.ins_h = Xd(a, a.ins_h, a.window[a.strstart + Pd - 1]);
      c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h];
      a.head[a.ins_h] = a.strstart;
    }
    a.prev_length = a.match_length;
    a.prev_match = a.match_start;
    a.match_length = Pd - 1;
    if (c !== 0 && a.prev_length < a.max_lazy_match && a.strstart - c <= a.w_size - Yi) {
      a.match_length = qj(a, c);
      if (a.match_length <= 5 && (a.strategy === Bd || a.match_length === Pd && a.strstart - a.match_start > 4096)) {
        a.match_length = Pd - 1;
      }
    }
    if (a.prev_length >= Pd && a.match_length <= a.prev_length) {
      e = a.strstart + a.lookahead - Pd;
      d = Sd(a, a.strstart - 1 - a.prev_match, a.prev_length - Pd);
      a.lookahead -= a.prev_length - 1;
      a.prev_length -= 2;
      do {
        if (++a.strstart <= e) {
          a.ins_h = Xd(a, a.ins_h, a.window[a.strstart + Pd - 1]);
          c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h];
          a.head[a.ins_h] = a.strstart;
        }
      } while (--a.prev_length !== 0);
      a.match_available = 0;
      a.match_length = Pd - 1;
      a.strstart++;
      if (d && (nj(a, false), a.strm.avail_out === 0)) {
        return fj;
      }
    } else if (a.match_available) {
      d = Sd(a, 0, a.window[a.strstart - 1]);
      if (d) {
        nj(a, false);
      }
      a.strstart++;
      a.lookahead--;
      if (a.strm.avail_out === 0) {
        return fj;
      }
    } else {
      a.match_available = 1;
      a.strstart++;
      a.lookahead--;
    }
  }
  if (a.match_available) {
    d = Sd(a, 0, a.window[a.strstart - 1]);
    a.match_available = 0;
  }
  a.insert = a.strstart < Pd - 1 ? a.strstart : Pd - 1;
  if (b === Td) {
    nj(a, true);
    if (a.strm.avail_out === 0) {
      return gj;
    } else {
      return hj;
    }
  } else if (a.sym_next && (nj(a, false), a.strm.avail_out === 0)) {
    return fj;
  } else {
    return We;
  }
};
const uj = (a, b) => {
  let c;
  let d;
  let e;
  let f;
  const g = a.window;
  while (true) {
    if (a.lookahead <= we) {
      rj(a);
      if (a.lookahead <= we && b === Cd) {
        return fj;
      }
      if (a.lookahead === 0) {
        break;
      }
    }
    a.match_length = 0;
    if (a.lookahead >= Pd && a.strstart > 0 && (e = a.strstart - 1, d = g[e], d === g[++e] && d === g[++e] && d === g[++e])) {
      f = a.strstart + we;
      do ; while (d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && e < f);
      a.match_length = we - (f - e);
      if (a.match_length > a.lookahead) {
        a.match_length = a.lookahead;
      }
    }
    if (a.match_length >= Pd) {
      c = Sd(a, 1, a.match_length - Pd);
      a.lookahead -= a.match_length;
      a.strstart += a.match_length;
      a.match_length = 0;
    } else {
      c = Sd(a, 0, a.window[a.strstart]);
      a.lookahead--;
      a.strstart++;
    }
    if (c && (nj(a, false), a.strm.avail_out === 0)) {
      return fj;
    }
  }
  a.insert = 0;
  if (b === Td) {
    nj(a, true);
    if (a.strm.avail_out === 0) {
      return gj;
    } else {
      return hj;
    }
  } else if (a.sym_next && (nj(a, false), a.strm.avail_out === 0)) {
    return fj;
  } else {
    return We;
  }
};
const Gd = (a, b) => {
  let c;
  while (true) {
    if (a.lookahead === 0 && (rj(a), a.lookahead === 0)) {
      if (b === Cd) {
        return fj;
      }
      break;
    }
    a.match_length = 0;
    c = Sd(a, 0, a.window[a.strstart]);
    a.lookahead--;
    a.strstart++;
    if (c && (nj(a, false), a.strm.avail_out === 0)) {
      return fj;
    }
  }
  a.insert = 0;
  if (b === Td) {
    nj(a, true);
    if (a.strm.avail_out === 0) {
      return gj;
    } else {
      return hj;
    }
  } else if (a.sym_next && (nj(a, false), a.strm.avail_out === 0)) {
    return fj;
  } else {
    return We;
  }
};
function Kd(a, b, c, d, e) {
  this.good_length = a;
  this.max_lazy = b;
  this.nice_length = c;
  this.max_chain = d;
  this.func = e;
}
const vj = [new Kd(0, 0, 0, 0, sj), new Kd(4, 4, 8, 4, tj), new Kd(4, 5, 16, 8, tj), new Kd(4, 6, 32, 32, tj), new Kd(4, 4, 16, 16, za), new Kd(8, 16, 32, 32, za), new Kd(8, 16, 128, 128, za), new Kd(8, 32, 128, 256, za), new Kd(32, 128, 258, 1024, za), new Kd(32, 258, 258, 4096, za)];
const wj = a => {
  a.window_size = a.w_size * 2;
  kj(a.head);
  a.max_lazy_match = vj[a.level].max_lazy;
  a.good_match = vj[a.level].good_length;
  a.nice_match = vj[a.level].nice_length;
  a.max_chain_length = vj[a.level].max_chain;
  a.strstart = 0;
  a.block_start = 0;
  a.lookahead = 0;
  a.insert = 0;
  a.match_length = a.prev_length = Pd - 1;
  a.match_available = 0;
  a.ins_h = 0;
};
function Yd() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Fd;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(Ld * 2);
  this.dyn_dtree = new Uint16Array((Xi * 2 + 1) * 2);
  this.bl_tree = new Uint16Array((Zd * 2 + 1) * 2);
  kj(this.dyn_ltree);
  kj(this.dyn_dtree);
  kj(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(Hd + 1);
  this.heap = new Uint16Array(Md * 2 + 1);
  kj(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(Md * 2 + 1);
  kj(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
const Jd = a => {
  if (!a) {
    return 1;
  }
  const b = a.state;
  if (!b || b.strm !== a || b.status !== Wd && b.status !== $i && b.status !== _i && b.status !== aj && b.status !== bj && b.status !== cj && b.status !== dj && b.status !== ej) {
    return 1;
  } else {
    return 0;
  }
};
const oi = a => {
  if (Jd(a)) {
    return Vd(a, Vi);
  }
  a.total_in = a.total_out = 0;
  a.data_type = Dd;
  const b = a.state;
  b.pending = 0;
  b.pending_out = 0;
  if (b.wrap < 0) {
    b.wrap = -b.wrap;
  }
  b.status = b.wrap === 2 ? $i : b.wrap ? Wd : dj;
  a.adler = b.wrap === 2 ? 0 : 1;
  b.last_flush = -2;
  Ki(b);
  return Ti;
};
const xj = a => {
  const b = oi(a);
  if (b === Ti) {
    wj(a.state);
  }
  return b;
};
const yj = (a, b) => Jd(a) || a.state.wrap !== 2 ? Vi : (a.state.gzhead = b, Ti);
const Qd = (a, b, c, d, e, f) => {
  if (!a) {
    return Vi;
  }
  let g = 1;
  if (b === Ra) {
    b = 6;
  }
  if (d < 0) {
    g = 0;
    d = -d;
  } else if (d > 15) {
    g = 2;
    d -= 16;
  }
  if (e < 1 || e > ga || c !== Fd || d < 8 || d > 15 || b < 0 || b > 9 || f < 0 || f > Rd || d === 8 && g !== 1) {
    return Vd(a, Vi);
  }
  if (d === 8) {
    d = 9;
  }
  const h = new Yd();
  a.state = h;
  h.strm = a;
  h.status = Wd;
  h.wrap = g;
  h.gzhead = null;
  h.w_bits = d;
  h.w_size = 1 << h.w_bits;
  h.w_mask = h.w_size - 1;
  h.hash_bits = e + 7;
  h.hash_size = 1 << h.hash_bits;
  h.hash_mask = h.hash_size - 1;
  h.hash_shift = ~~((h.hash_bits + Pd - 1) / Pd);
  h.window = new Uint8Array(h.w_size * 2);
  h.head = new Uint16Array(h.hash_size);
  h.prev = new Uint16Array(h.w_size);
  h.lit_bufsize = 1 << e + 6;
  h.pending_buf_size = h.lit_bufsize * 4;
  h.pending_buf = new Uint8Array(h.pending_buf_size);
  h.sym_buf = h.lit_bufsize;
  h.sym_end = (h.lit_bufsize - 1) * 3;
  h.level = b;
  h.strategy = f;
  h.method = c;
  return xj(a);
};
const zj = (a, b) => Qd(a, b, Fd, Ud, Nd, zd);
const Aj = (a, b) => {
  if (Jd(a) || b > Qi || b < 0) {
    if (a) {
      return Vd(a, Vi);
    } else {
      return Vi;
    }
  }
  const c = a.state;
  if (!a.output || a.avail_in !== 0 && !a.input || c.status === ej && b !== Td) {
    return Vd(a, a.avail_out === 0 ? $d : Vi);
  }
  const d = c.last_flush;
  c.last_flush = b;
  if (c.pending !== 0) {
    mj(a);
    if (a.avail_out === 0) {
      c.last_flush = -1;
      return Ti;
    }
  } else if (a.avail_in === 0 && jj(b) <= jj(d) && b !== Td) {
    return Vd(a, $d);
  }
  if (c.status === ej && a.avail_in !== 0) {
    return Vd(a, $d);
  }
  if (c.status === Wd && c.wrap === 0) {
    c.status = dj;
  }
  if (c.status === Wd) {
    let b = Fd + (c.w_bits - 8 << 4) << 8;
    let d = -1;
    if (c.strategy >= Id || c.level < 2) {
      d = 0;
    } else if (c.level < 6) {
      d = 1;
    } else if (c.level === 6) {
      d = 2;
    } else {
      d = 3;
    }
    b |= d << 6;
    if (c.strstart !== 0) {
      b |= Zi;
    }
    b += 31 - b % 31;
    Ce(c, b);
    if (c.strstart !== 0) {
      Ce(c, a.adler >>> 16);
      Ce(c, a.adler & 65535);
    }
    a.adler = 1;
    c.status = dj;
    mj(a);
    if (c.pending !== 0) {
      c.last_flush = -1;
      return Ti;
    }
  }
  if (c.status === $i) {
    a.adler = 0;
    oj(c, 31);
    oj(c, 139);
    oj(c, 8);
    if (c.gzhead) {
      oj(c, (c.gzhead.text ? 1 : 0) + (c.gzhead.hcrc ? 2 : 0) + (c.gzhead.extra ? 4 : 0) + (c.gzhead.name ? 8 : 0) + (c.gzhead.comment ? 16 : 0));
      oj(c, c.gzhead.time & 255);
      oj(c, c.gzhead.time >> 8 & 255);
      oj(c, c.gzhead.time >> 16 & 255);
      oj(c, c.gzhead.time >> 24 & 255);
      oj(c, c.level === 9 ? 2 : c.strategy >= Id || c.level < 2 ? 4 : 0);
      oj(c, c.gzhead.os & 255);
      if (c.gzhead.extra && c.gzhead.extra.length) {
        oj(c, c.gzhead.extra.length & 255);
        oj(c, c.gzhead.extra.length >> 8 & 255);
      }
      if (c.gzhead.hcrc) {
        a.adler = kd(a.adler, c.pending_buf, c.pending, 0);
      }
      c.gzindex = 0;
      c.status = _i;
    } else {
      oj(c, 0);
      oj(c, 0);
      oj(c, 0);
      oj(c, 0);
      oj(c, 0);
      oj(c, c.level === 9 ? 2 : c.strategy >= Id || c.level < 2 ? 4 : 0);
      oj(c, ij);
      c.status = dj;
      mj(a);
      if (c.pending !== 0) {
        c.last_flush = -1;
        return Ti;
      }
    }
  }
  if (c.status === _i) {
    if (c.gzhead.extra) {
      let b = c.pending;
      let d = (c.gzhead.extra.length & 65535) - c.gzindex;
      while (c.pending + d > c.pending_buf_size) {
        let e = c.pending_buf_size - c.pending;
        c.pending_buf.set(c.gzhead.extra.subarray(c.gzindex, c.gzindex + e), c.pending);
        c.pending = c.pending_buf_size;
        if (c.gzhead.hcrc && c.pending > b) {
          a.adler = kd(a.adler, c.pending_buf, c.pending - b, b);
        }
        c.gzindex += e;
        mj(a);
        if (c.pending !== 0) {
          c.last_flush = -1;
          return Ti;
        }
        b = 0;
        d -= e;
      }
      let e = new Uint8Array(c.gzhead.extra);
      c.pending_buf.set(e.subarray(c.gzindex, c.gzindex + d), c.pending);
      c.pending += d;
      if (c.gzhead.hcrc && c.pending > b) {
        a.adler = kd(a.adler, c.pending_buf, c.pending - b, b);
      }
      c.gzindex = 0;
    }
    c.status = aj;
  }
  if (c.status === aj) {
    if (c.gzhead.name) {
      let b = c.pending;
      let d;
      do {
        if (c.pending === c.pending_buf_size) {
          if (c.gzhead.hcrc && c.pending > b) {
            a.adler = kd(a.adler, c.pending_buf, c.pending - b, b);
          }
          mj(a);
          if (c.pending !== 0) {
            c.last_flush = -1;
            return Ti;
          }
          b = 0;
        }
        if (c.gzindex < c.gzhead.name.length) {
          d = c.gzhead.name.charCodeAt(c.gzindex++) & 255;
        } else {
          d = 0;
        }
        oj(c, d);
      } while (d !== 0);
      if (c.gzhead.hcrc && c.pending > b) {
        a.adler = kd(a.adler, c.pending_buf, c.pending - b, b);
      }
      c.gzindex = 0;
    }
    c.status = bj;
  }
  if (c.status === bj) {
    if (c.gzhead.comment) {
      let b = c.pending;
      let d;
      do {
        if (c.pending === c.pending_buf_size) {
          if (c.gzhead.hcrc && c.pending > b) {
            a.adler = kd(a.adler, c.pending_buf, c.pending - b, b);
          }
          mj(a);
          if (c.pending !== 0) {
            c.last_flush = -1;
            return Ti;
          }
          b = 0;
        }
        if (c.gzindex < c.gzhead.comment.length) {
          d = c.gzhead.comment.charCodeAt(c.gzindex++) & 255;
        } else {
          d = 0;
        }
        oj(c, d);
      } while (d !== 0);
      if (c.gzhead.hcrc && c.pending > b) {
        a.adler = kd(a.adler, c.pending_buf, c.pending - b, b);
      }
    }
    c.status = cj;
  }
  if (c.status === cj) {
    if (c.gzhead.hcrc) {
      if (c.pending + 2 > c.pending_buf_size && (mj(a), c.pending !== 0)) {
        c.last_flush = -1;
        return Ti;
      }
      oj(c, a.adler & 255);
      oj(c, a.adler >> 8 & 255);
      a.adler = 0;
    }
    c.status = dj;
    mj(a);
    if (c.pending !== 0) {
      c.last_flush = -1;
      return Ti;
    }
  }
  if (a.avail_in !== 0 || c.lookahead !== 0 || b !== Cd && c.status !== ej) {
    let d = c.level === 0 ? sj(c, b) : c.strategy === Id ? Gd(c, b) : c.strategy === bi ? uj(c, b) : vj[c.level].func(c, b);
    if (d === gj || d === hj) {
      c.status = ej;
    }
    if (d === fj || d === gj) {
      if (a.avail_out === 0) {
        c.last_flush = -1;
      }
      return Ti;
    }
    if (d === We && (b === Pi ? Mi(c) : b !== Qi && (Ed(c, 0, 0, false), b === Ad && (kj(c.head), c.lookahead === 0 && (c.strstart = 0, c.block_start = 0, c.insert = 0))), mj(a), a.avail_out === 0)) {
      c.last_flush = -1;
      return Ti;
    }
  }
  if (b !== Td) {
    return Ti;
  } else if (c.wrap <= 0) {
    return je;
  } else {
    if (c.wrap === 2) {
      oj(c, a.adler & 255);
      oj(c, a.adler >> 8 & 255);
      oj(c, a.adler >> 16 & 255);
      oj(c, a.adler >> 24 & 255);
      oj(c, a.total_in & 255);
      oj(c, a.total_in >> 8 & 255);
      oj(c, a.total_in >> 16 & 255);
      oj(c, a.total_in >> 24 & 255);
    } else {
      Ce(c, a.adler >>> 16);
      Ce(c, a.adler & 65535);
    }
    mj(a);
    if (c.wrap > 0) {
      c.wrap = -c.wrap;
    }
    if (c.pending !== 0) {
      return Ti;
    } else {
      return je;
    }
  }
};
const Bj = a => {
  if (Jd(a)) {
    return Vi;
  }
  const b = a.state.status;
  a.state = null;
  if (b === dj) {
    return Vd(a, Wi);
  } else {
    return Ti;
  }
};
const Cj = (a, b) => {
  let c = b.length;
  if (Jd(a)) {
    return Vi;
  }
  const d = a.state;
  const e = d.wrap;
  if (e === 2 || e === 1 && d.status !== Wd || d.lookahead) {
    return Vi;
  }
  if (e === 1) {
    a.adler = wd(a.adler, b, c, 0);
  }
  d.wrap = 0;
  if (c >= d.w_size) {
    if (e === 0) {
      kj(d.head);
      d.strstart = 0;
      d.block_start = 0;
      d.insert = 0;
    }
    let a = new Uint8Array(d.w_size);
    a.set(b.subarray(c - d.w_size, c), 0);
    b = a;
    c = d.w_size;
  }
  const f = a.avail_in;
  const g = a.next_in;
  const h = a.input;
  a.avail_in = c;
  a.next_in = 0;
  a.input = b;
  rj(d);
  while (d.lookahead >= Pd) {
    let a = d.strstart;
    let b = d.lookahead - (Pd - 1);
    do {
      d.ins_h = Xd(d, d.ins_h, d.window[a + Pd - 1]);
      d.prev[a & d.w_mask] = d.head[d.ins_h];
      d.head[d.ins_h] = a;
      a++;
    } while (--b);
    d.strstart = a;
    d.lookahead = Pd - 1;
    rj(d);
  }
  d.strstart += d.lookahead;
  d.block_start = d.strstart;
  d.insert = d.lookahead;
  d.lookahead = 0;
  d.match_length = d.prev_length = Pd - 1;
  d.match_available = 0;
  a.next_in = g;
  a.input = h;
  a.avail_in = f;
  d.wrap = e;
  return Ti;
};
var Dj = zj;
var Ej = Qd;
var Fj = xj;
var Gj = oi;
var Hj = yj;
var Ij = Aj;
var Jj = Bj;
var Kj = Cj;
var Lj = "pako deflate (from Nodeca project)";
var Mj = {
  deflateInit: Dj,
  deflateInit2: Ej,
  deflateReset: Fj,
  deflateResetKeep: Gj,
  deflateSetHeader: Hj,
  deflate: Ij,
  deflateEnd: Jj,
  deflateSetDictionary: Kj,
  deflateInfo: Lj
};
const Nj = (a, b) => Object.prototype.hasOwnProperty.call(a, b);
function Oj(a) {
  const b = Array.prototype.slice.call(arguments, 1);
  while (b.length) {
    const c = b.shift();
    if (c) {
      if (typeof c != "object") {
        throw new TypeError(c + "must be non-object");
      }
      for (const b in c) {
        if (Nj(c, b)) {
          a[b] = c[b];
        }
      }
    }
  }
  return a;
}
var Pj = a => {
  let b = 0;
  for (let c = 0, d = a.length; c < d; c++) {
    b += a[c].length;
  }
  const c = new Uint8Array(b);
  for (let b = 0, d = 0, e = a.length; b < e; b++) {
    let e = a[b];
    c.set(e, d);
    d += e.length;
  }
  return c;
};
var Qj = {
  assign: Oj,
  flattenChunks: Pj
};
let ma = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  ma = false;
}
const Rj = new Uint8Array(256);
for (let a = 0; a < 256; a++) {
  Rj[a] = a >= 252 ? 6 : a >= 248 ? 5 : a >= 240 ? 4 : a >= 224 ? 3 : a >= 192 ? 2 : 1;
}
Rj[254] = Rj[254] = 1;
var Sj = a => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(a);
  }
  let b;
  let c;
  let d;
  let e;
  let f;
  let g = a.length;
  let h = 0;
  for (e = 0; e < g; e++) {
    c = a.charCodeAt(e);
    if ((c & 64512) === 55296 && e + 1 < g) {
      d = a.charCodeAt(e + 1);
      if ((d & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (d - 56320);
        e++;
      }
    }
    h += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  b = new Uint8Array(h);
  f = 0;
  e = 0;
  for (; f < h; e++) {
    c = a.charCodeAt(e);
    if ((c & 64512) === 55296 && e + 1 < g) {
      d = a.charCodeAt(e + 1);
      if ((d & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (d - 56320);
        e++;
      }
    }
    if (c < 128) {
      b[f++] = c;
    } else if (c < 2048) {
      b[f++] = c >>> 6 | 192;
      b[f++] = c & 63 | 128;
    } else if (c < 65536) {
      b[f++] = c >>> 12 | 224;
      b[f++] = c >>> 6 & 63 | 128;
      b[f++] = c & 63 | 128;
    } else {
      b[f++] = c >>> 18 | 240;
      b[f++] = c >>> 12 & 63 | 128;
      b[f++] = c >>> 6 & 63 | 128;
      b[f++] = c & 63 | 128;
    }
  }
  return b;
};
const Tj = (a, b) => {
  if (b < 65534 && a.subarray && ma) {
    return String.fromCharCode.apply(null, a.length === b ? a : a.subarray(0, b));
  }
  let c = "";
  for (let d = 0; d < b; d++) {
    c += String.fromCharCode(a[d]);
  }
  return c;
};
var Uj = (a, b) => {
  const c = b || a.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(a.subarray(0, b));
  }
  let d;
  let e;
  const f = new Array(c * 2);
  e = 0;
  d = 0;
  while (d < c) {
    let b = a[d++];
    if (b < 128) {
      f[e++] = b;
      continue;
    }
    let g = Rj[b];
    if (g > 4) {
      f[e++] = 65533;
      d += g - 1;
      continue;
    }
    for (b &= g === 2 ? 31 : g === 3 ? 15 : 7; g > 1 && d < c;) {
      b = b << 6 | a[d++] & 63;
      g--;
    }
    if (g > 1) {
      f[e++] = 65533;
      continue;
    }
    if (b < 65536) {
      f[e++] = b;
    } else {
      b -= 65536;
      f[e++] = b >> 10 & 1023 | 55296;
      f[e++] = b & 1023 | 56320;
    }
  }
  return Tj(f, e);
};
var Vj = (a, b) => {
  b = b || a.length;
  if (b > a.length) {
    b = a.length;
  }
  let c = b - 1;
  while (c >= 0 && (a[c] & 192) === 128) {
    c--;
  }
  if (c < 0 || c === 0) {
    return b;
  } else if (c + Rj[a[c]] > b) {
    return c;
  } else {
    return b;
  }
};
var Wj = {
  string2buf: Sj,
  buf2string: Uj,
  utf8border: Vj
};
function Xj() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var Yj = Xj;
const Zj = Object.prototype.toString;
const {
  Z_NO_FLUSH: $j,
  Z_SYNC_FLUSH: _j,
  Z_FULL_FLUSH: ak,
  Z_FINISH: bk,
  Z_OK: ck,
  Z_STREAM_END: ia,
  Z_DEFAULT_COMPRESSION: dk,
  Z_DEFAULT_STRATEGY: ek,
  Z_DEFLATED: fk
} = Ji;
function gk(a) {
  this.options = Qj.assign({
    level: dk,
    method: fk,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: ek
  }, a || {});
  let b = this.options;
  if (b.raw && b.windowBits > 0) {
    b.windowBits = -b.windowBits;
  } else if (b.gzip && b.windowBits > 0 && b.windowBits < 16) {
    b.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new Yj();
  this.strm.avail_out = 0;
  let c = Mj.deflateInit2(this.strm, b.level, b.method, b.windowBits, b.memLevel, b.strategy);
  if (c !== ck) {
    throw new Error(Ue[c]);
  }
  if (b.header) {
    Mj.deflateSetHeader(this.strm, b.header);
  }
  if (b.dictionary) {
    let a;
    if (typeof b.dictionary == "string") {
      a = Wj.string2buf(b.dictionary);
    } else if (Zj.call(b.dictionary) === "[object ArrayBuffer]") {
      a = new Uint8Array(b.dictionary);
    } else {
      a = b.dictionary;
    }
    c = Mj.deflateSetDictionary(this.strm, a);
    if (c !== ck) {
      throw new Error(Ue[c]);
    }
    this._dict_set = true;
  }
}
gk.prototype.push = function (a, b) {
  const c = this.strm;
  const d = this.options.chunkSize;
  let e;
  let f;
  if (this.ended) {
    return false;
  }
  if (b === ~~b) {
    f = b;
  } else {
    f = b === true ? bk : $j;
  }
  if (typeof a == "string") {
    c.input = Wj.string2buf(a);
  } else if (Zj.call(a) === "[object ArrayBuffer]") {
    c.input = new Uint8Array(a);
  } else {
    c.input = a;
  }
  c.next_in = 0;
  c.avail_in = c.input.length;
  while (true) {
    if (c.avail_out === 0) {
      c.output = new Uint8Array(d);
      c.next_out = 0;
      c.avail_out = d;
    }
    if ((f === _j || f === ak) && c.avail_out <= 6) {
      this.onData(c.output.subarray(0, c.next_out));
      c.avail_out = 0;
      continue;
    }
    e = Mj.deflate(c, f);
    if (e === ia) {
      if (c.next_out > 0) {
        this.onData(c.output.subarray(0, c.next_out));
      }
      e = Mj.deflateEnd(this.strm);
      this.onEnd(e);
      this.ended = true;
      return e === ck;
    }
    if (c.avail_out === 0) {
      this.onData(c.output);
      continue;
    }
    if (f > 0 && c.next_out > 0) {
      this.onData(c.output.subarray(0, c.next_out));
      c.avail_out = 0;
      continue;
    }
    if (c.avail_in === 0) {
      break;
    }
  }
  return true;
};
gk.prototype.onData = function (a) {
  this.chunks.push(a);
};
gk.prototype.onEnd = function (a) {
  if (a === ck) {
    this.result = Qj.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = a;
  this.msg = this.strm.msg;
};
function li(a, b) {
  const c = new gk(b);
  c.push(a, true);
  if (c.err) {
    throw c.msg || Ue[c.err];
  }
  return c.result;
}
function hk(a, b) {
  b = b || {};
  b.raw = true;
  return li(a, b);
}
function ik(a, b) {
  b = b || {};
  b.gzip = true;
  return li(a, b);
}
var jk = gk;
var kk = li;
var lk = hk;
var mk = ik;
var nk = Ji;
var ok = {
  Deflate: jk,
  deflate: kk,
  deflateRaw: lk,
  gzip: mk,
  constants: nk
};
const pk = 16209;
const ki = 16191;
function qk(a, b) {
  let c;
  let d;
  let e;
  let f;
  let g;
  let h;
  let i;
  let j;
  let k;
  let l;
  let m;
  let n;
  let o;
  let p;
  let q;
  let r;
  let s;
  let t;
  let u;
  let v;
  let w;
  let x;
  let y;
  let z;
  const A = a.state;
  c = a.next_in;
  y = a.input;
  d = c + (a.avail_in - 5);
  e = a.next_out;
  z = a.output;
  f = e - (b - a.avail_out);
  g = e + (a.avail_out - 257);
  h = A.dmax;
  i = A.wsize;
  j = A.whave;
  k = A.wnext;
  l = A.window;
  m = A.hold;
  n = A.bits;
  o = A.lencode;
  p = A.distcode;
  q = (1 << A.lenbits) - 1;
  r = (1 << A.distbits) - 1;
  _0x20e570: do {
    if (n < 15) {
      m += y[c++] << n;
      n += 8;
      m += y[c++] << n;
      n += 8;
    }
    s = o[m & q];
    _0x59470f: while (true) {
      t = s >>> 24;
      m >>>= t;
      n -= t;
      t = s >>> 16 & 255;
      if (t === 0) {
        z[e++] = s & 65535;
      } else if (t & 16) {
        u = s & 65535;
        t &= 15;
        if (t) {
          if (n < t) {
            m += y[c++] << n;
            n += 8;
          }
          u += m & (1 << t) - 1;
          m >>>= t;
          n -= t;
        }
        if (n < 15) {
          m += y[c++] << n;
          n += 8;
          m += y[c++] << n;
          n += 8;
        }
        s = p[m & r];
        _0x11ad17: while (true) {
          t = s >>> 24;
          m >>>= t;
          n -= t;
          t = s >>> 16 & 255;
          if (t & 16) {
            v = s & 65535;
            t &= 15;
            if (n < t) {
              m += y[c++] << n;
              n += 8;
              if (n < t) {
                m += y[c++] << n;
                n += 8;
              }
            }
            v += m & (1 << t) - 1;
            if (v > h) {
              a.msg = "invalid distance too far back";
              A.mode = pk;
              break _0x20e570;
            }
            m >>>= t;
            n -= t;
            t = e - f;
            if (v > t) {
              t = v - t;
              if (t > j && A.sane) {
                a.msg = "invalid distance too far back";
                A.mode = pk;
                break _0x20e570;
              }
              w = 0;
              x = l;
              if (k === 0) {
                w += i - t;
                if (t < u) {
                  u -= t;
                  do {
                    z[e++] = l[w++];
                  } while (--t);
                  w = e - v;
                  x = z;
                }
              } else if (k < t) {
                w += i + k - t;
                t -= k;
                if (t < u) {
                  u -= t;
                  do {
                    z[e++] = l[w++];
                  } while (--t);
                  w = 0;
                  if (k < u) {
                    t = k;
                    u -= t;
                    do {
                      z[e++] = l[w++];
                    } while (--t);
                    w = e - v;
                    x = z;
                  }
                }
              } else {
                w += k - t;
                if (t < u) {
                  u -= t;
                  do {
                    z[e++] = l[w++];
                  } while (--t);
                  w = e - v;
                  x = z;
                }
              }
              while (u > 2) {
                z[e++] = x[w++];
                z[e++] = x[w++];
                z[e++] = x[w++];
                u -= 3;
              }
              if (u) {
                z[e++] = x[w++];
                if (u > 1) {
                  z[e++] = x[w++];
                }
              }
            } else {
              w = e - v;
              do {
                z[e++] = z[w++];
                z[e++] = z[w++];
                z[e++] = z[w++];
                u -= 3;
              } while (u > 2);
              if (u) {
                z[e++] = z[w++];
                if (u > 1) {
                  z[e++] = z[w++];
                }
              }
            }
          } else if (t & 64) {
            a.msg = "invalid distance code";
            A.mode = pk;
            break _0x20e570;
          } else {
            s = p[(s & 65535) + (m & (1 << t) - 1)];
            continue _0x11ad17;
          }
          break;
        }
      } else if (t & 64) {
        if (t & 32) {
          A.mode = ki;
          break _0x20e570;
        } else {
          a.msg = "invalid literal/length code";
          A.mode = pk;
          break _0x20e570;
        }
      } else {
        s = o[(s & 65535) + (m & (1 << t) - 1)];
        continue _0x59470f;
      }
      break;
    }
  } while (c < d && e < g);
  u = n >> 3;
  c -= u;
  n -= u << 3;
  m &= (1 << n) - 1;
  a.next_in = c;
  a.next_out = e;
  a.avail_in = c < d ? 5 + (d - c) : 5 - (c - d);
  a.avail_out = e < g ? 257 + (g - e) : 257 - (e - g);
  A.hold = m;
  A.bits = n;
}
const rk = 15;
const sk = 852;
const tk = 592;
const uk = 0;
const vk = 1;
const Da = 2;
const wk = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]);
const xk = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]);
const yk = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]);
const zk = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);
const Ak = (a, b, c, d, e, f, g, h) => {
  const i = h.bits;
  let j = 0;
  let k = 0;
  let l = 0;
  let m = 0;
  let n = 0;
  let o = 0;
  let p = 0;
  let q = 0;
  let r = 0;
  let s = 0;
  let t;
  let u;
  let v;
  let w;
  let x;
  let y = null;
  let z;
  const A = new Uint16Array(rk + 1);
  const B = new Uint16Array(rk + 1);
  let C = null;
  let D;
  let E;
  let F;
  for (j = 0; j <= rk; j++) {
    A[j] = 0;
  }
  for (k = 0; k < d; k++) {
    A[b[c + k]]++;
  }
  n = i;
  m = rk;
  for (; m >= 1 && A[m] === 0; m--);
  if (n > m) {
    n = m;
  }
  if (m === 0) {
    e[f++] = 1 << 24 | 64 << 16 | 0;
    e[f++] = 1 << 24 | 64 << 16 | 0;
    h.bits = 1;
    return 0;
  }
  for (l = 1; l < m && A[l] === 0; l++);
  if (n < l) {
    n = l;
  }
  q = 1;
  j = 1;
  for (; j <= rk; j++) {
    q <<= 1;
    q -= A[j];
    if (q < 0) {
      return -1;
    }
  }
  if (q > 0 && (a === uk || m !== 1)) {
    return -1;
  }
  B[1] = 0;
  j = 1;
  for (; j < rk; j++) {
    B[j + 1] = B[j] + A[j];
  }
  for (k = 0; k < d; k++) {
    if (b[c + k] !== 0) {
      g[B[b[c + k]]++] = k;
    }
  }
  if (a === uk) {
    y = C = g;
    z = 20;
  } else if (a === vk) {
    y = wk;
    C = xk;
    z = 257;
  } else {
    y = yk;
    C = zk;
    z = 0;
  }
  s = 0;
  k = 0;
  j = l;
  x = f;
  o = n;
  p = 0;
  v = -1;
  r = 1 << n;
  w = r - 1;
  if (a === vk && r > sk || a === Da && r > tk) {
    return 1;
  }
  while (true) {
    D = j - p;
    if (g[k] + 1 < z) {
      E = 0;
      F = g[k];
    } else if (g[k] >= z) {
      E = C[g[k] - z];
      F = y[g[k] - z];
    } else {
      E = 96;
      F = 0;
    }
    t = 1 << j - p;
    u = 1 << o;
    l = u;
    do {
      u -= t;
      e[x + (s >> p) + u] = D << 24 | E << 16 | F | 0;
    } while (u !== 0);
    for (t = 1 << j - 1; s & t;) {
      t >>= 1;
    }
    if (t !== 0) {
      s &= t - 1;
      s += t;
    } else {
      s = 0;
    }
    k++;
    if (--A[j] === 0) {
      if (j === m) {
        break;
      }
      j = b[c + g[k]];
    }
    if (j > n && (s & w) !== v) {
      if (p === 0) {
        p = n;
      }
      x += l;
      o = j - p;
      q = 1 << o;
      while (o + p < m && (q -= A[o + p], q > 0)) {
        o++;
        q <<= 1;
      }
      r += 1 << o;
      if (a === vk && r > sk || a === Da && r > tk) {
        return 1;
      }
      v = s & w;
      e[v] = n << 24 | o << 16 | x - f | 0;
    }
  }
  if (s !== 0) {
    e[x + s] = j - p << 24 | 64 << 16 | 0;
  }
  h.bits = n;
  return 0;
};
var Bk = Ak;
const Ck = 0;
const Dk = 1;
const Ek = 2;
const {
  Z_FINISH: Fk,
  Z_BLOCK: Gk,
  Z_TREES: Hk,
  Z_OK: Ei,
  Z_STREAM_END: Ik,
  Z_NEED_DICT: Jk,
  Z_STREAM_ERROR: Kk,
  Z_DATA_ERROR: Lk,
  Z_MEM_ERROR: Mk,
  Z_BUF_ERROR: Nk,
  Z_DEFLATED: Ok
} = Ji;
const Pk = 16180;
const wa = 16181;
const Qk = 16182;
const Rk = 16183;
const Sk = 16184;
const Tk = 16185;
const Uk = 16186;
const Vk = 16187;
const Wk = 16188;
const Xk = 16189;
const Yk = 16190;
const aa = 16191;
const Zk = 16192;
const Fa = 16193;
const $k = 16194;
const Ua = 16195;
const _k = 16196;
const al = 16197;
const bl = 16198;
const cl = 16199;
const Si = 16200;
const Ci = 16201;
const dl = 16202;
const fl = 16203;
const gl = 16204;
const hl = 16205;
const il = 16206;
const Na = 16207;
const jl = 16208;
const kl = 16209;
const Be = 16210;
const ll = 16211;
const ml = 852;
const nl = 592;
const ol = 15;
const pl = ol;
const ql = a => (a >>> 24 & 255) + (a >>> 8 & 65280) + ((a & 65280) << 8) + ((a & 255) << 24);
function rl() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
const sl = a => {
  if (!a) {
    return 1;
  }
  const b = a.state;
  if (!b || b.strm !== a || b.mode < Pk || b.mode > ll) {
    return 1;
  } else {
    return 0;
  }
};
const tl = a => {
  if (sl(a)) {
    return Kk;
  }
  const b = a.state;
  a.total_in = a.total_out = b.total = 0;
  a.msg = "";
  if (b.wrap) {
    a.adler = b.wrap & 1;
  }
  b.mode = Pk;
  b.last = 0;
  b.havedict = 0;
  b.flags = -1;
  b.dmax = 32768;
  b.head = null;
  b.hold = 0;
  b.bits = 0;
  b.lencode = b.lendyn = new Int32Array(ml);
  b.distcode = b.distdyn = new Int32Array(nl);
  b.sane = 1;
  b.back = -1;
  return Ei;
};
const ul = a => {
  if (sl(a)) {
    return Kk;
  }
  const b = a.state;
  b.wsize = 0;
  b.whave = 0;
  b.wnext = 0;
  return tl(a);
};
const ec = (a, b) => {
  let c;
  if (sl(a)) {
    return Kk;
  }
  const d = a.state;
  if (b < 0) {
    c = 0;
    b = -b;
  } else {
    c = (b >> 4) + 5;
    if (b < 48) {
      b &= 15;
    }
  }
  if (b && (b < 8 || b > 15)) {
    return Kk;
  } else {
    if (d.window !== null && d.wbits !== b) {
      d.window = null;
    }
    d.wrap = c;
    d.wbits = b;
    return ul(a);
  }
};
const tc = (a, b) => {
  if (!a) {
    return Kk;
  }
  const c = new rl();
  a.state = c;
  c.strm = a;
  c.window = null;
  c.mode = Pk;
  const d = ec(a, b);
  if (d !== Ei) {
    a.state = null;
  }
  return d;
};
const rc = a => tc(a, pl);
let eh = true;
let vl;
let Oa;
const ja = a => {
  if (eh) {
    vl = new Int32Array(512);
    Oa = new Int32Array(32);
    let b = 0;
    while (b < 144) {
      a.lens[b++] = 8;
    }
    while (b < 256) {
      a.lens[b++] = 9;
    }
    while (b < 280) {
      a.lens[b++] = 7;
    }
    while (b < 288) {
      a.lens[b++] = 8;
    }
    Bk(Dk, a.lens, 0, 288, vl, 0, a.work, {
      bits: 9
    });
    b = 0;
    while (b < 32) {
      a.lens[b++] = 5;
    }
    Bk(Ek, a.lens, 0, 32, Oa, 0, a.work, {
      bits: 5
    });
    eh = false;
  }
  a.lencode = vl;
  a.lenbits = 9;
  a.distcode = Oa;
  a.distbits = 5;
};
const th = (a, b, c, d) => {
  let e;
  const f = a.state;
  if (f.window === null) {
    f.wsize = 1 << f.wbits;
    f.wnext = 0;
    f.whave = 0;
    f.window = new Uint8Array(f.wsize);
  }
  if (d >= f.wsize) {
    f.window.set(b.subarray(c - f.wsize, c), 0);
    f.wnext = 0;
    f.whave = f.wsize;
  } else {
    e = f.wsize - f.wnext;
    if (e > d) {
      e = d;
    }
    f.window.set(b.subarray(c - d, c - d + e), f.wnext);
    d -= e;
    if (d) {
      f.window.set(b.subarray(c - d, c), 0);
      f.wnext = d;
      f.whave = f.wsize;
    } else {
      f.wnext += e;
      if (f.wnext === f.wsize) {
        f.wnext = 0;
      }
      if (f.whave < f.wsize) {
        f.whave += e;
      }
    }
  }
  return 0;
};
const nc = (a, b) => {
  let c;
  let d;
  let e;
  let f;
  let g;
  let h;
  let i;
  let j;
  let k;
  let l;
  let m;
  let n;
  let o;
  let p;
  let q = 0;
  let r;
  let s;
  let t;
  let u;
  let v;
  let w;
  let x;
  let y;
  const z = new Uint8Array(4);
  let A;
  let B;
  const C = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  if (sl(a) || !a.output || !a.input && a.avail_in !== 0) {
    return Kk;
  }
  c = a.state;
  if (c.mode === aa) {
    c.mode = Zk;
  }
  g = a.next_out;
  e = a.output;
  i = a.avail_out;
  f = a.next_in;
  d = a.input;
  h = a.avail_in;
  j = c.hold;
  k = c.bits;
  l = h;
  m = i;
  y = Ei;
  _0x24a89a: while (true) {
    switch (c.mode) {
      case Pk:
        if (c.wrap === 0) {
          c.mode = Zk;
          break;
        }
        while (k < 16) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        if (c.wrap & 2 && j === 35615) {
          if (c.wbits === 0) {
            c.wbits = 15;
          }
          c.check = 0;
          z[0] = j & 255;
          z[1] = j >>> 8 & 255;
          c.check = kd(c.check, z, 2, 0);
          j = 0;
          k = 0;
          c.mode = wa;
          break;
        }
        if (c.head) {
          c.head.done = false;
        }
        if (!(c.wrap & 1) || (((j & 255) << 8) + (j >> 8)) % 31) {
          a.msg = "incorrect header check";
          c.mode = kl;
          break;
        }
        if ((j & 15) !== Ok) {
          a.msg = "unknown compression method";
          c.mode = kl;
          break;
        }
        j >>>= 4;
        k -= 4;
        x = (j & 15) + 8;
        if (c.wbits === 0) {
          c.wbits = x;
        }
        if (x > 15 || x > c.wbits) {
          a.msg = "invalid window size";
          c.mode = kl;
          break;
        }
        c.dmax = 1 << c.wbits;
        c.flags = 0;
        a.adler = c.check = 1;
        c.mode = j & 512 ? Xk : aa;
        j = 0;
        k = 0;
        break;
      case wa:
        while (k < 16) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        c.flags = j;
        if ((c.flags & 255) !== Ok) {
          a.msg = "unknown compression method";
          c.mode = kl;
          break;
        }
        if (c.flags & 57344) {
          a.msg = "unknown header flags set";
          c.mode = kl;
          break;
        }
        if (c.head) {
          c.head.text = j >> 8 & 1;
        }
        if (c.flags & 512 && c.wrap & 4) {
          z[0] = j & 255;
          z[1] = j >>> 8 & 255;
          c.check = kd(c.check, z, 2, 0);
        }
        j = 0;
        k = 0;
        c.mode = Qk;
      case Qk:
        while (k < 32) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        if (c.head) {
          c.head.time = j;
        }
        if (c.flags & 512 && c.wrap & 4) {
          z[0] = j & 255;
          z[1] = j >>> 8 & 255;
          z[2] = j >>> 16 & 255;
          z[3] = j >>> 24 & 255;
          c.check = kd(c.check, z, 4, 0);
        }
        j = 0;
        k = 0;
        c.mode = Rk;
      case Rk:
        while (k < 16) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        if (c.head) {
          c.head.xflags = j & 255;
          c.head.os = j >> 8;
        }
        if (c.flags & 512 && c.wrap & 4) {
          z[0] = j & 255;
          z[1] = j >>> 8 & 255;
          c.check = kd(c.check, z, 2, 0);
        }
        j = 0;
        k = 0;
        c.mode = Sk;
      case Sk:
        if (c.flags & 1024) {
          while (k < 16) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j += d[f++] << k;
            k += 8;
          }
          c.length = j;
          if (c.head) {
            c.head.extra_len = j;
          }
          if (c.flags & 512 && c.wrap & 4) {
            z[0] = j & 255;
            z[1] = j >>> 8 & 255;
            c.check = kd(c.check, z, 2, 0);
          }
          j = 0;
          k = 0;
        } else if (c.head) {
          c.head.extra = null;
        }
        c.mode = Tk;
      case Tk:
        if (c.flags & 1024 && (n = c.length, n > h && (n = h), n && (c.head && (x = c.head.extra_len - c.length, c.head.extra ||= new Uint8Array(c.head.extra_len), c.head.extra.set(d.subarray(f, f + n), x)), c.flags & 512 && c.wrap & 4 && (c.check = kd(c.check, d, n, f)), h -= n, f += n, c.length -= n), c.length)) {
          break _0x24a89a;
        }
        c.length = 0;
        c.mode = Uk;
      case Uk:
        if (c.flags & 2048) {
          if (h === 0) {
            break _0x24a89a;
          }
          n = 0;
          do {
            x = d[f + n++];
            if (c.head && x && c.length < 65536) {
              c.head.name += String.fromCharCode(x);
            }
          } while (x && n < h);
          if (c.flags & 512 && c.wrap & 4) {
            c.check = kd(c.check, d, n, f);
          }
          h -= n;
          f += n;
          if (x) {
            break _0x24a89a;
          }
        } else if (c.head) {
          c.head.name = null;
        }
        c.length = 0;
        c.mode = Vk;
      case Vk:
        if (c.flags & 4096) {
          if (h === 0) {
            break _0x24a89a;
          }
          n = 0;
          do {
            x = d[f + n++];
            if (c.head && x && c.length < 65536) {
              c.head.comment += String.fromCharCode(x);
            }
          } while (x && n < h);
          if (c.flags & 512 && c.wrap & 4) {
            c.check = kd(c.check, d, n, f);
          }
          h -= n;
          f += n;
          if (x) {
            break _0x24a89a;
          }
        } else if (c.head) {
          c.head.comment = null;
        }
        c.mode = Wk;
      case Wk:
        if (c.flags & 512) {
          while (k < 16) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j += d[f++] << k;
            k += 8;
          }
          if (c.wrap & 4 && j !== (c.check & 65535)) {
            a.msg = "header crc mismatch";
            c.mode = kl;
            break;
          }
          j = 0;
          k = 0;
        }
        if (c.head) {
          c.head.hcrc = c.flags >> 9 & 1;
          c.head.done = true;
        }
        a.adler = c.check = 0;
        c.mode = aa;
        break;
      case Xk:
        while (k < 32) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        a.adler = c.check = ql(j);
        j = 0;
        k = 0;
        c.mode = Yk;
      case Yk:
        if (c.havedict === 0) {
          a.next_out = g;
          a.avail_out = i;
          a.next_in = f;
          a.avail_in = h;
          c.hold = j;
          c.bits = k;
          return Jk;
        }
        a.adler = c.check = 1;
        c.mode = aa;
      case aa:
        if (b === Gk || b === Hk) {
          break _0x24a89a;
        }
      case Zk:
        if (c.last) {
          j >>>= k & 7;
          k -= k & 7;
          c.mode = il;
          break;
        }
        while (k < 3) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        c.last = j & 1;
        j >>>= 1;
        k -= 1;
        switch (j & 3) {
          case 0:
            c.mode = Fa;
            break;
          case 1:
            ja(c);
            c.mode = cl;
            if (b === Hk) {
              j >>>= 2;
              k -= 2;
              break _0x24a89a;
            }
            break;
          case 2:
            c.mode = _k;
            break;
          case 3:
            a.msg = "invalid block type";
            c.mode = kl;
        }
        j >>>= 2;
        k -= 2;
        break;
      case Fa:
        j >>>= k & 7;
        k -= k & 7;
        while (k < 32) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        if ((j & 65535) !== (j >>> 16 ^ 65535)) {
          a.msg = "invalid stored block lengths";
          c.mode = kl;
          break;
        }
        c.length = j & 65535;
        j = 0;
        k = 0;
        c.mode = $k;
        if (b === Hk) {
          break _0x24a89a;
        }
      case $k:
        c.mode = Ua;
      case Ua:
        n = c.length;
        if (n) {
          if (n > h) {
            n = h;
          }
          if (n > i) {
            n = i;
          }
          if (n === 0) {
            break _0x24a89a;
          }
          e.set(d.subarray(f, f + n), g);
          h -= n;
          f += n;
          i -= n;
          g += n;
          c.length -= n;
          break;
        }
        c.mode = aa;
        break;
      case _k:
        while (k < 14) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        c.nlen = (j & 31) + 257;
        j >>>= 5;
        k -= 5;
        c.ndist = (j & 31) + 1;
        j >>>= 5;
        k -= 5;
        c.ncode = (j & 15) + 4;
        j >>>= 4;
        k -= 4;
        if (c.nlen > 286 || c.ndist > 30) {
          a.msg = "too many length or distance symbols";
          c.mode = kl;
          break;
        }
        c.have = 0;
        c.mode = al;
      case al:
        while (c.have < c.ncode) {
          while (k < 3) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j += d[f++] << k;
            k += 8;
          }
          c.lens[C[c.have++]] = j & 7;
          j >>>= 3;
          k -= 3;
        }
        while (c.have < 19) {
          c.lens[C[c.have++]] = 0;
        }
        c.lencode = c.lendyn;
        c.lenbits = 7;
        A = {
          bits: c.lenbits
        };
        y = Bk(Ck, c.lens, 0, 19, c.lencode, 0, c.work, A);
        c.lenbits = A.bits;
        if (y) {
          a.msg = "invalid code lengths set";
          c.mode = kl;
          break;
        }
        c.have = 0;
        c.mode = bl;
      case bl:
        while (c.have < c.nlen + c.ndist) {
          q = c.lencode[j & (1 << c.lenbits) - 1];
          r = q >>> 24;
          s = q >>> 16 & 255;
          t = q & 65535;
          while (r > k) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j += d[f++] << k;
            k += 8;
          }
          if (t < 16) {
            j >>>= r;
            k -= r;
            c.lens[c.have++] = t;
          } else {
            if (t === 16) {
              for (B = r + 2; k < B;) {
                if (h === 0) {
                  break _0x24a89a;
                }
                h--;
                j += d[f++] << k;
                k += 8;
              }
              j >>>= r;
              k -= r;
              if (c.have === 0) {
                a.msg = "invalid bit length repeat";
                c.mode = kl;
                break;
              }
              x = c.lens[c.have - 1];
              n = 3 + (j & 3);
              j >>>= 2;
              k -= 2;
            } else if (t === 17) {
              for (B = r + 3; k < B;) {
                if (h === 0) {
                  break _0x24a89a;
                }
                h--;
                j += d[f++] << k;
                k += 8;
              }
              j >>>= r;
              k -= r;
              x = 0;
              n = 3 + (j & 7);
              j >>>= 3;
              k -= 3;
            } else {
              for (B = r + 7; k < B;) {
                if (h === 0) {
                  break _0x24a89a;
                }
                h--;
                j += d[f++] << k;
                k += 8;
              }
              j >>>= r;
              k -= r;
              x = 0;
              n = 11 + (j & 127);
              j >>>= 7;
              k -= 7;
            }
            if (c.have + n > c.nlen + c.ndist) {
              a.msg = "invalid bit length repeat";
              c.mode = kl;
              break;
            }
            while (n--) {
              c.lens[c.have++] = x;
            }
          }
        }
        if (c.mode === kl) {
          break;
        }
        if (c.lens[256] === 0) {
          a.msg = "invalid code -- missing end-of-block";
          c.mode = kl;
          break;
        }
        c.lenbits = 9;
        A = {
          bits: c.lenbits
        };
        y = Bk(Dk, c.lens, 0, c.nlen, c.lencode, 0, c.work, A);
        c.lenbits = A.bits;
        if (y) {
          a.msg = "invalid literal/lengths set";
          c.mode = kl;
          break;
        }
        c.distbits = 6;
        c.distcode = c.distdyn;
        A = {
          bits: c.distbits
        };
        y = Bk(Ek, c.lens, c.nlen, c.ndist, c.distcode, 0, c.work, A);
        c.distbits = A.bits;
        if (y) {
          a.msg = "invalid distances set";
          c.mode = kl;
          break;
        }
        c.mode = cl;
        if (b === Hk) {
          break _0x24a89a;
        }
      case cl:
        c.mode = Si;
      case Si:
        if (h >= 6 && i >= 258) {
          a.next_out = g;
          a.avail_out = i;
          a.next_in = f;
          a.avail_in = h;
          c.hold = j;
          c.bits = k;
          qk(a, m);
          g = a.next_out;
          e = a.output;
          i = a.avail_out;
          f = a.next_in;
          d = a.input;
          h = a.avail_in;
          j = c.hold;
          k = c.bits;
          if (c.mode === aa) {
            c.back = -1;
          }
          break;
        }
        for (c.back = 0; q = c.lencode[j & (1 << c.lenbits) - 1], r = q >>> 24, s = q >>> 16 & 255, t = q & 65535, r > k;) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        if (s && !(s & 240)) {
          u = r;
          v = s;
          w = t;
          q = c.lencode[w + ((j & (1 << u + v) - 1) >> u)];
          r = q >>> 24;
          s = q >>> 16 & 255;
          t = q & 65535;
          while (u + r > k) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j += d[f++] << k;
            k += 8;
          }
          j >>>= u;
          k -= u;
          c.back += u;
        }
        j >>>= r;
        k -= r;
        c.back += r;
        c.length = t;
        if (s === 0) {
          c.mode = hl;
          break;
        }
        if (s & 32) {
          c.back = -1;
          c.mode = aa;
          break;
        }
        if (s & 64) {
          a.msg = "invalid literal/length code";
          c.mode = kl;
          break;
        }
        c.extra = s & 15;
        c.mode = Ci;
      case Ci:
        if (c.extra) {
          for (B = c.extra; k < B;) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j += d[f++] << k;
            k += 8;
          }
          c.length += j & (1 << c.extra) - 1;
          j >>>= c.extra;
          k -= c.extra;
          c.back += c.extra;
        }
        c.was = c.length;
        c.mode = dl;
      case dl:
        q = c.distcode[j & (1 << c.distbits) - 1];
        r = q >>> 24;
        s = q >>> 16 & 255;
        t = q & 65535;
        while (r > k) {
          if (h === 0) {
            break _0x24a89a;
          }
          h--;
          j += d[f++] << k;
          k += 8;
        }
        if (!(s & 240)) {
          u = r;
          v = s;
          w = t;
          q = c.distcode[w + ((j & (1 << u + v) - 1) >> u)];
          r = q >>> 24;
          s = q >>> 16 & 255;
          t = q & 65535;
          while (u + r > k) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j += d[f++] << k;
            k += 8;
          }
          j >>>= u;
          k -= u;
          c.back += u;
        }
        j >>>= r;
        k -= r;
        c.back += r;
        if (s & 64) {
          a.msg = "invalid distance code";
          c.mode = kl;
          break;
        }
        c.offset = t;
        c.extra = s & 15;
        c.mode = fl;
      case fl:
        if (c.extra) {
          for (B = c.extra; k < B;) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j += d[f++] << k;
            k += 8;
          }
          c.offset += j & (1 << c.extra) - 1;
          j >>>= c.extra;
          k -= c.extra;
          c.back += c.extra;
        }
        if (c.offset > c.dmax) {
          a.msg = "invalid distance too far back";
          c.mode = kl;
          break;
        }
        c.mode = gl;
      case gl:
        if (i === 0) {
          break _0x24a89a;
        }
        n = m - i;
        if (c.offset > n) {
          n = c.offset - n;
          if (n > c.whave && c.sane) {
            a.msg = "invalid distance too far back";
            c.mode = kl;
            break;
          }
          if (n > c.wnext) {
            n -= c.wnext;
            o = c.wsize - n;
          } else {
            o = c.wnext - n;
          }
          if (n > c.length) {
            n = c.length;
          }
          p = c.window;
        } else {
          p = e;
          o = g - c.offset;
          n = c.length;
        }
        if (n > i) {
          n = i;
        }
        i -= n;
        c.length -= n;
        do {
          e[g++] = p[o++];
        } while (--n);
        if (c.length === 0) {
          c.mode = Si;
        }
        break;
      case hl:
        if (i === 0) {
          break _0x24a89a;
        }
        e[g++] = c.length;
        i--;
        c.mode = Si;
        break;
      case il:
        if (c.wrap) {
          while (k < 32) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j |= d[f++] << k;
            k += 8;
          }
          m -= i;
          a.total_out += m;
          c.total += m;
          if (c.wrap & 4 && m) {
            a.adler = c.check = c.flags ? kd(c.check, e, m, g - m) : wd(c.check, e, m, g - m);
          }
          m = i;
          if (c.wrap & 4 && (c.flags ? j : ql(j)) !== c.check) {
            a.msg = "incorrect data check";
            c.mode = kl;
            break;
          }
          j = 0;
          k = 0;
        }
        c.mode = Na;
      case Na:
        if (c.wrap && c.flags) {
          while (k < 32) {
            if (h === 0) {
              break _0x24a89a;
            }
            h--;
            j += d[f++] << k;
            k += 8;
          }
          if (c.wrap & 4 && j !== (c.total & 4294967295)) {
            a.msg = "incorrect length check";
            c.mode = kl;
            break;
          }
          j = 0;
          k = 0;
        }
        c.mode = jl;
      case jl:
        y = Ik;
        break _0x24a89a;
      case kl:
        y = Lk;
        break _0x24a89a;
      case Be:
        return Mk;
      case ll:
      default:
        return Kk;
    }
  }
  a.next_out = g;
  a.avail_out = i;
  a.next_in = f;
  a.avail_in = h;
  c.hold = j;
  c.bits = k;
  if (c.wsize || m !== a.avail_out && c.mode < kl && (c.mode < il || b !== Fk)) {
    th(a, a.output, a.next_out, m - a.avail_out);
  }
  l -= a.avail_in;
  m -= a.avail_out;
  a.total_in += l;
  a.total_out += m;
  c.total += m;
  if (c.wrap & 4 && m) {
    a.adler = c.check = c.flags ? kd(c.check, e, m, a.next_out - m) : wd(c.check, e, m, a.next_out - m);
  }
  a.data_type = c.bits + (c.last ? 64 : 0) + (c.mode === aa ? 128 : 0) + (c.mode === cl || c.mode === $k ? 256 : 0);
  if ((l === 0 && m === 0 || b === Fk) && y === Ei) {
    y = Nk;
  }
  return y;
};
const rh = a => {
  if (sl(a)) {
    return Kk;
  }
  let b = a.state;
  b.window &&= null;
  a.state = null;
  return Ei;
};
const nh = (a, b) => {
  if (sl(a)) {
    return Kk;
  }
  const c = a.state;
  if (c.wrap & 2) {
    c.head = b;
    b.done = false;
    return Ei;
  } else {
    return Kk;
  }
};
const ih = (a, b) => {
  const c = b.length;
  let d;
  let e;
  let f;
  if (sl(a) || (d = a.state, d.wrap !== 0 && d.mode !== Yk)) {
    return Kk;
  } else if (d.mode === Yk && (e = 1, e = wd(e, b, c, 0), e !== d.check)) {
    return Lk;
  } else {
    f = th(a, b, c, c);
    if (f) {
      d.mode = Be;
      return Mk;
    } else {
      d.havedict = 1;
      return Ei;
    }
  }
};
var ah = ul;
var sh = ec;
var oh = tl;
var lh = rc;
var ch = tc;
var fh = nc;
var uh = rh;
var dh = nh;
var hh = ih;
var vh = "pako inflate (from Nodeca project)";
var _h = {
  inflateReset: ah,
  inflateReset2: sh,
  inflateResetKeep: oh,
  inflateInit: lh,
  inflateInit2: ch,
  inflate: fh,
  inflateEnd: uh,
  inflateGetHeader: dh,
  inflateSetDictionary: hh,
  inflateInfo: vh
};
function wl() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var ph = wl;
const yh = Object.prototype.toString;
const {
  Z_NO_FLUSH: ic,
  Z_FINISH: gh,
  Z_OK: mh,
  Z_STREAM_END: xl,
  Z_NEED_DICT: Ma,
  Z_STREAM_ERROR: Za,
  Z_DATA_ERROR: wh,
  Z_MEM_ERROR: yl
} = Ji;
function xh(a) {
  this.options = Qj.assign({
    chunkSize: 65536,
    windowBits: 15,
    to: ""
  }, a || {});
  const b = this.options;
  if (b.raw && b.windowBits >= 0 && b.windowBits < 16) {
    b.windowBits = -b.windowBits;
    if (b.windowBits === 0) {
      b.windowBits = -15;
    }
  }
  if (b.windowBits >= 0 && b.windowBits < 16 && (!a || !a.windowBits)) {
    b.windowBits += 32;
  }
  if (b.windowBits > 15 && b.windowBits < 48) {
    if (!(b.windowBits & 15)) {
      b.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new Yj();
  this.strm.avail_out = 0;
  let c = _h.inflateInit2(this.strm, b.windowBits);
  if (c !== mh) {
    throw new Error(Ue[c]);
  }
  this.header = new ph();
  _h.inflateGetHeader(this.strm, this.header);
  if (b.dictionary && (typeof b.dictionary == "string" ? b.dictionary = Wj.string2buf(b.dictionary) : yh.call(b.dictionary) === "[object ArrayBuffer]" && (b.dictionary = new Uint8Array(b.dictionary)), b.raw && (c = _h.inflateSetDictionary(this.strm, b.dictionary), c !== mh))) {
    throw new Error(Ue[c]);
  }
}
xh.prototype.push = function (a, b) {
  const c = this.strm;
  const d = this.options.chunkSize;
  const e = this.options.dictionary;
  let f;
  let g;
  let h;
  if (this.ended) {
    return false;
  }
  if (b === ~~b) {
    g = b;
  } else {
    g = b === true ? gh : ic;
  }
  if (yh.call(a) === "[object ArrayBuffer]") {
    c.input = new Uint8Array(a);
  } else {
    c.input = a;
  }
  c.next_in = 0;
  c.avail_in = c.input.length;
  while (true) {
    if (c.avail_out === 0) {
      c.output = new Uint8Array(d);
      c.next_out = 0;
      c.avail_out = d;
    }
    f = _h.inflate(c, g);
    if (f === Ma && e) {
      f = _h.inflateSetDictionary(c, e);
      if (f === mh) {
        f = _h.inflate(c, g);
      } else if (f === wh) {
        f = Ma;
      }
    }
    while (c.avail_in > 0 && f === xl && c.state.wrap > 0 && a[c.next_in] !== 0) {
      _h.inflateReset(c);
      f = _h.inflate(c, g);
    }
    switch (f) {
      case Za:
      case wh:
      case Ma:
      case yl:
        this.onEnd(f);
        this.ended = true;
        return false;
    }
    h = c.avail_out;
    if (c.next_out && (c.avail_out === 0 || f === xl)) {
      if (this.options.to === "string") {
        let a = Wj.utf8border(c.output, c.next_out);
        let b = c.next_out - a;
        let e = Wj.buf2string(c.output, a);
        c.next_out = b;
        c.avail_out = d - b;
        if (b) {
          c.output.set(c.output.subarray(a, a + b), 0);
        }
        this.onData(e);
      } else {
        this.onData(c.output.length === c.next_out ? c.output : c.output.subarray(0, c.next_out));
      }
    }
    if (f !== mh || h !== 0) {
      if (f === xl) {
        f = _h.inflateEnd(this.strm);
        this.onEnd(f);
        this.ended = true;
        return true;
      }
      if (c.avail_in === 0) {
        break;
      }
    }
  }
  return true;
};
xh.prototype.onData = function (a) {
  this.chunks.push(a);
};
xh.prototype.onEnd = function (a) {
  if (a === mh) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = Qj.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = a;
  this.msg = this.strm.msg;
};
function ci(a, b) {
  const c = new xh(b);
  c.push(a);
  if (c.err) {
    throw c.msg || Ue[c.err];
  }
  return c.result;
}
function zl(a, b) {
  b = b || {};
  b.raw = true;
  return ci(a, b);
}
var bh = xh;
var kh = ci;
var Eh = zl;
var Sh = ci;
var Ch = Ji;
var Ah = {
  Inflate: bh,
  inflate: kh,
  inflateRaw: Eh,
  ungzip: Sh,
  constants: Ch
};
const {
  Deflate: Th,
  deflate: Al,
  deflateRaw: $h,
  gzip: Bl
} = ok;
const {
  Inflate: Cl,
  inflate: Dl,
  inflateRaw: Bh,
  ungzip: El
} = Ah;
var Fl = Al;
var Ih = Dl;
var Rh = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function zh(a) {
  if (a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")) {
    return a.default;
  } else {
    return a;
  }
}
var Dh = {};
var Gl = {
  byteLength: ac,
  toByteArray: Oh,
  fromByteArray: Zh
};
var xa = [];
var Hl = [];
var Il = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var Fh = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var La = 0, Jl = Fh.length; La < Jl; ++La) {
  xa[La] = Fh[La];
  Hl[Fh.charCodeAt(La)] = La;
}
Hl["-".charCodeAt(0)] = 62;
Hl["_".charCodeAt(0)] = 63;
function Uh(a) {
  var b = a.length;
  if (b % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var c = a.indexOf("=");
  if (c === -1) {
    c = b;
  }
  var d = c === b ? 0 : 4 - c % 4;
  return [c, d];
}
function ac(a) {
  var b = Uh(a);
  var c = b[0];
  var d = b[1];
  return (c + d) * 3 / 4 - d;
}
function Nh(a, b, c) {
  return (b + c) * 3 / 4 - c;
}
function Oh(a) {
  var b;
  var c = Uh(a);
  var d = c[0];
  var e = c[1];
  var f = new Il(Nh(a, d, e));
  var g = 0;
  var h = e > 0 ? d - 4 : d;
  var i;
  for (i = 0; i < h; i += 4) {
    b = Hl[a.charCodeAt(i)] << 18 | Hl[a.charCodeAt(i + 1)] << 12 | Hl[a.charCodeAt(i + 2)] << 6 | Hl[a.charCodeAt(i + 3)];
    f[g++] = b >> 16 & 255;
    f[g++] = b >> 8 & 255;
    f[g++] = b & 255;
  }
  if (e === 2) {
    b = Hl[a.charCodeAt(i)] << 2 | Hl[a.charCodeAt(i + 1)] >> 4;
    f[g++] = b & 255;
  }
  if (e === 1) {
    b = Hl[a.charCodeAt(i)] << 10 | Hl[a.charCodeAt(i + 1)] << 4 | Hl[a.charCodeAt(i + 2)] >> 2;
    f[g++] = b >> 8 & 255;
    f[g++] = b & 255;
  }
  return f;
}
function jh(a) {
  return xa[a >> 18 & 63] + xa[a >> 12 & 63] + xa[a >> 6 & 63] + xa[a & 63];
}
function Mh(a, b, c) {
  var d;
  var e = [];
  for (var f = b; f < c; f += 3) {
    d = (a[f] << 16 & 16711680) + (a[f + 1] << 8 & 65280) + (a[f + 2] & 255);
    e.push(jh(d));
  }
  return e.join("");
}
function Zh(a) {
  var b;
  var c = a.length;
  var d = c % 3;
  var e = [];
  for (var f = 16383, g = 0, h = c - d; g < h; g += f) {
    e.push(Mh(a, g, g + f > h ? h : g + f));
  }
  if (d === 1) {
    b = a[c - 1];
    e.push(xa[b >> 2] + xa[b << 4 & 63] + "==");
  } else if (d === 2) {
    b = (a[c - 2] << 8) + a[c - 1];
    e.push(xa[b >> 10] + xa[b >> 4 & 63] + xa[b << 2 & 63] + "=");
  }
  return e.join("");
}
var Lh = {};
Lh.read = function (a, b, c, d, e) {
  var f;
  var g;
  var h = e * 8 - d - 1;
  var i = (1 << h) - 1;
  var j = i >> 1;
  var k = -7;
  var l = c ? e - 1 : 0;
  var m = c ? -1 : 1;
  var n = a[b + l];
  l += m;
  f = n & (1 << -k) - 1;
  n >>= -k;
  k += h;
  for (; k > 0; k -= 8) {
    f = f * 256 + a[b + l];
    l += m;
  }
  g = f & (1 << -k) - 1;
  f >>= -k;
  k += d;
  for (; k > 0; k -= 8) {
    g = g * 256 + a[b + l];
    l += m;
  }
  if (f === 0) {
    f = 1 - j;
  } else {
    if (f === i) {
      if (g) {
        return NaN;
      } else {
        return (n ? -1 : 1) * Infinity;
      }
    }
    g = g + Math.pow(2, d);
    f = f - j;
  }
  return (n ? -1 : 1) * g * Math.pow(2, f - d);
};
Lh.write = function (a, b, c, d, e, f) {
  var g;
  var h;
  var i;
  var j = f * 8 - e - 1;
  var k = (1 << j) - 1;
  var l = k >> 1;
  var m = e === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var n = d ? 0 : f - 1;
  var o = d ? 1 : -1;
  var p = b < 0 || b === 0 && 1 / b < 0 ? 1 : 0;
  b = Math.abs(b);
  if (isNaN(b) || b === Infinity) {
    h = isNaN(b) ? 1 : 0;
    g = k;
  } else {
    g = Math.floor(Math.log(b) / Math.LN2);
    if (b * (i = Math.pow(2, -g)) < 1) {
      g--;
      i *= 2;
    }
    if (g + l >= 1) {
      b += m / i;
    } else {
      b += m * Math.pow(2, 1 - l);
    }
    if (b * i >= 2) {
      g++;
      i /= 2;
    }
    if (g + l >= k) {
      h = 0;
      g = k;
    } else if (g + l >= 1) {
      h = (b * i - 1) * Math.pow(2, e);
      g = g + l;
    } else {
      h = b * Math.pow(2, l - 1) * Math.pow(2, e);
      g = 0;
    }
  }
  for (; e >= 8; e -= 8) {
    a[c + n] = h & 255;
    n += o;
    h /= 256;
  }
  g = g << e | h;
  j += e;
  for (; j > 0; j -= 8) {
    a[c + n] = g & 255;
    n += o;
    g /= 256;
  }
  a[c + n - o] |= p * 128;
};
(function (a) {
  var b = Gl;
  var c = Lh;
  var d = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  a.Buffer = h;
  a.SlowBuffer = s;
  a.INSPECT_MAX_BYTES = 50;
  var e = 2147483647;
  a.kMaxLength = e;
  h.TYPED_ARRAY_SUPPORT = f();
  if (!h.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error == "function") {
    console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  }
  function f() {
    try {
      var a = new Uint8Array(1);
      var b = {
        foo: function () {
          return 42;
        }
      };
      Object.setPrototypeOf(b, Uint8Array.prototype);
      Object.setPrototypeOf(a, b);
      return a.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(h.prototype, "parent", {
    enumerable: true,
    get: function () {
      if (h.isBuffer(this)) {
        return this.buffer;
      }
    }
  });
  Object.defineProperty(h.prototype, "offset", {
    enumerable: true,
    get: function () {
      if (h.isBuffer(this)) {
        return this.byteOffset;
      }
    }
  });
  function g(a) {
    if (a > e) {
      throw new RangeError("The value \"" + a + "\" is invalid for option \"size\"");
    }
    var b = new Uint8Array(a);
    Object.setPrototypeOf(b, h.prototype);
    return b;
  }
  function h(a, b, c) {
    if (typeof a == "number") {
      if (typeof b == "string") {
        throw new TypeError("The \"string\" argument must be of type string. Received type number");
      }
      return l(a);
    }
    return i(a, b, c);
  }
  h.poolSize = 8192;
  function i(a, b, c) {
    if (typeof a == "string") {
      return m(a, b);
    }
    if (ArrayBuffer.isView(a)) {
      return o(a);
    }
    if (a == null) {
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a);
    }
    if (X(a, ArrayBuffer) || a && X(a.buffer, ArrayBuffer) || typeof SharedArrayBuffer !== "undefined" && (X(a, SharedArrayBuffer) || a && X(a.buffer, SharedArrayBuffer))) {
      return p(a, b, c);
    }
    if (typeof a == "number") {
      throw new TypeError("The \"value\" argument must not be of type number. Received type number");
    }
    var d = a.valueOf && a.valueOf();
    if (d != null && d !== a) {
      return h.from(d, b, c);
    }
    var e = q(a);
    if (e) {
      return e;
    }
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof a[Symbol.toPrimitive] == "function") {
      return h.from(a[Symbol.toPrimitive]("string"), b, c);
    }
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof a);
  }
  h.from = function (a, b, c) {
    return i(a, b, c);
  };
  Object.setPrototypeOf(h.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(h, Uint8Array);
  function j(a) {
    if (typeof a != "number") {
      throw new TypeError("\"size\" argument must be of type number");
    }
    if (a < 0) {
      throw new RangeError("The value \"" + a + "\" is invalid for option \"size\"");
    }
  }
  function k(a, b, c) {
    j(a);
    if (a <= 0) {
      return g(a);
    } else if (b !== undefined) {
      if (typeof c == "string") {
        return g(a).fill(b, c);
      } else {
        return g(a).fill(b);
      }
    } else {
      return g(a);
    }
  }
  h.alloc = function (a, b, c) {
    return k(a, b, c);
  };
  function l(a) {
    j(a);
    return g(a < 0 ? 0 : r(a) | 0);
  }
  h.allocUnsafe = function (a) {
    return l(a);
  };
  h.allocUnsafeSlow = function (a) {
    return l(a);
  };
  function m(a, b) {
    if (typeof b != "string" || b === "") {
      b = "utf8";
    }
    if (!h.isEncoding(b)) {
      throw new TypeError("Unknown encoding: " + b);
    }
    var c = t(a, b) | 0;
    var d = g(c);
    var e = d.write(a, b);
    if (e !== c) {
      d = d.slice(0, e);
    }
    return d;
  }
  function n(a) {
    for (var b = a.length < 0 ? 0 : r(a.length) | 0, c = g(b), d = 0; d < b; d += 1) {
      c[d] = a[d] & 255;
    }
    return c;
  }
  function o(a) {
    if (X(a, Uint8Array)) {
      var b = new Uint8Array(a);
      return p(b.buffer, b.byteOffset, b.byteLength);
    }
    return n(a);
  }
  function p(a, b, c) {
    if (b < 0 || a.byteLength < b) {
      throw new RangeError("\"offset\" is outside of buffer bounds");
    }
    if (a.byteLength < b + (c || 0)) {
      throw new RangeError("\"length\" is outside of buffer bounds");
    }
    var d;
    if (b === undefined && c === undefined) {
      d = new Uint8Array(a);
    } else if (c === undefined) {
      d = new Uint8Array(a, b);
    } else {
      d = new Uint8Array(a, b, c);
    }
    Object.setPrototypeOf(d, h.prototype);
    return d;
  }
  function q(a) {
    if (h.isBuffer(a)) {
      var b = r(a.length) | 0;
      var c = g(b);
      if (c.length !== 0) {
        a.copy(c, 0, 0, b);
      }
      return c;
    }
    if (a.length !== undefined) {
      if (typeof a.length != "number" || Y(a.length)) {
        return g(0);
      } else {
        return n(a);
      }
    }
    if (a.type === "Buffer" && Array.isArray(a.data)) {
      return n(a.data);
    }
  }
  function r(a) {
    if (a >= e) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + e.toString(16) + " bytes");
    }
    return a | 0;
  }
  function s(a) {
    if (+a != a) {
      a = 0;
    }
    return h.alloc(+a);
  }
  h.isBuffer = function (a) {
    return a != null && a._isBuffer === true && a !== h.prototype;
  };
  h.compare = function (a, b) {
    if (X(a, Uint8Array)) {
      a = h.from(a, a.offset, a.byteLength);
    }
    if (X(b, Uint8Array)) {
      b = h.from(b, b.offset, b.byteLength);
    }
    if (!h.isBuffer(a) || !h.isBuffer(b)) {
      throw new TypeError("The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array");
    }
    if (a === b) {
      return 0;
    }
    var c = a.length;
    var d = b.length;
    for (var e = 0, f = Math.min(c, d); e < f; ++e) {
      if (a[e] !== b[e]) {
        c = a[e];
        d = b[e];
        break;
      }
    }
    if (c < d) {
      return -1;
    } else if (d < c) {
      return 1;
    } else {
      return 0;
    }
  };
  h.isEncoding = function (a) {
    switch (String(a).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  h.concat = function (a, b) {
    if (!Array.isArray(a)) {
      throw new TypeError("\"list\" argument must be an Array of Buffers");
    }
    if (a.length === 0) {
      return h.alloc(0);
    }
    var c;
    if (b === undefined) {
      b = 0;
      c = 0;
      for (; c < a.length; ++c) {
        b += a[c].length;
      }
    }
    var d = h.allocUnsafe(b);
    var e = 0;
    for (c = 0; c < a.length; ++c) {
      var f = a[c];
      if (X(f, Uint8Array)) {
        if (e + f.length > d.length) {
          h.from(f).copy(d, e);
        } else {
          Uint8Array.prototype.set.call(d, f, e);
        }
      } else if (h.isBuffer(f)) {
        f.copy(d, e);
      } else {
        throw new TypeError("\"list\" argument must be an Array of Buffers");
      }
      e += f.length;
    }
    return d;
  };
  function t(a, b) {
    if (h.isBuffer(a)) {
      return a.length;
    }
    if (ArrayBuffer.isView(a) || X(a, ArrayBuffer)) {
      return a.byteLength;
    }
    if (typeof a != "string") {
      throw new TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type " + typeof a);
    }
    var c = a.length;
    var d = arguments.length > 2 && arguments[2] === true;
    if (!d && c === 0) {
      return 0;
    }
    var e = false;
    for (;;) {
      switch (b) {
        case "ascii":
        case "latin1":
        case "binary":
          return c;
        case "utf8":
        case "utf-8":
          return S(a).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return c * 2;
        case "hex":
          return c >>> 1;
        case "base64":
          return V(a).length;
        default:
          if (e) {
            if (d) {
              return -1;
            } else {
              return S(a).length;
            }
          }
          b = ("" + b).toLowerCase();
          e = true;
      }
    }
  }
  h.byteLength = t;
  function u(a, b, c) {
    var d = false;
    if (b === undefined || b < 0) {
      b = 0;
    }
    if (b > this.length || ((c === undefined || c > this.length) && (c = this.length), c <= 0) || (c >>>= 0, b >>>= 0, c <= b)) {
      return "";
    }
    for (a ||= "utf8";;) {
      switch (a) {
        case "hex":
          return J(this, b, c);
        case "utf8":
        case "utf-8":
          return E(this, b, c);
        case "ascii":
          return H(this, b, c);
        case "latin1":
        case "binary":
          return I(this, b, c);
        case "base64":
          return D(this, b, c);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return K(this, b, c);
        default:
          if (d) {
            throw new TypeError("Unknown encoding: " + a);
          }
          a = (a + "").toLowerCase();
          d = true;
      }
    }
  }
  h.prototype._isBuffer = true;
  function v(a, b, c) {
    var d = a[b];
    a[b] = a[c];
    a[c] = d;
  }
  h.prototype.swap16 = function () {
    var a = this.length;
    if (a % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (var b = 0; b < a; b += 2) {
      v(this, b, b + 1);
    }
    return this;
  };
  h.prototype.swap32 = function () {
    var a = this.length;
    if (a % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (var b = 0; b < a; b += 4) {
      v(this, b, b + 3);
      v(this, b + 1, b + 2);
    }
    return this;
  };
  h.prototype.swap64 = function () {
    var a = this.length;
    if (a % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (var b = 0; b < a; b += 8) {
      v(this, b, b + 7);
      v(this, b + 1, b + 6);
      v(this, b + 2, b + 5);
      v(this, b + 3, b + 4);
    }
    return this;
  };
  h.prototype.toString = function () {
    var a = this.length;
    if (a === 0) {
      return "";
    } else if (arguments.length === 0) {
      return E(this, 0, a);
    } else {
      return u.apply(this, arguments);
    }
  };
  h.prototype.toLocaleString = h.prototype.toString;
  h.prototype.equals = function (a) {
    if (!h.isBuffer(a)) {
      throw new TypeError("Argument must be a Buffer");
    }
    if (this === a) {
      return true;
    } else {
      return h.compare(this, a) === 0;
    }
  };
  h.prototype.inspect = function () {
    var b = "";
    var c = a.INSPECT_MAX_BYTES;
    b = this.toString("hex", 0, c).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > c) {
      b += " ... ";
    }
    return "<Buffer " + b + ">";
  };
  if (d) {
    h.prototype[d] = h.prototype.inspect;
  }
  h.prototype.compare = function (a, b, c, d, e) {
    if (X(a, Uint8Array)) {
      a = h.from(a, a.offset, a.byteLength);
    }
    if (!h.isBuffer(a)) {
      throw new TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type " + typeof a);
    }
    if (b === undefined) {
      b = 0;
    }
    if (c === undefined) {
      c = a ? a.length : 0;
    }
    if (d === undefined) {
      d = 0;
    }
    if (e === undefined) {
      e = this.length;
    }
    if (b < 0 || c > a.length || d < 0 || e > this.length) {
      throw new RangeError("out of range index");
    }
    if (d >= e && b >= c) {
      return 0;
    }
    if (d >= e) {
      return -1;
    }
    if (b >= c) {
      return 1;
    }
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    e >>>= 0;
    if (this === a) {
      return 0;
    }
    var f = e - d;
    var g = c - b;
    for (var i = Math.min(f, g), j = this.slice(d, e), k = a.slice(b, c), l = 0; l < i; ++l) {
      if (j[l] !== k[l]) {
        f = j[l];
        g = k[l];
        break;
      }
    }
    if (f < g) {
      return -1;
    } else if (g < f) {
      return 1;
    } else {
      return 0;
    }
  };
  function w(a, b, c, d, e) {
    if (a.length === 0) {
      return -1;
    }
    if (typeof c == "string") {
      d = c;
      c = 0;
    } else if (c > 2147483647) {
      c = 2147483647;
    } else if (c < -2147483648) {
      c = -2147483648;
    }
    c = +c;
    if (Y(c)) {
      c = e ? 0 : a.length - 1;
    }
    if (c < 0) {
      c = a.length + c;
    }
    if (c >= a.length) {
      if (e) {
        return -1;
      }
      c = a.length - 1;
    } else if (c < 0) {
      if (e) {
        c = 0;
      } else {
        return -1;
      }
    }
    if (typeof b == "string") {
      b = h.from(b, d);
    }
    if (h.isBuffer(b)) {
      if (b.length === 0) {
        return -1;
      } else {
        return x(a, b, c, d, e);
      }
    }
    if (typeof b == "number") {
      b = b & 255;
      if (typeof Uint8Array.prototype.indexOf == "function") {
        if (e) {
          return Uint8Array.prototype.indexOf.call(a, b, c);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(a, b, c);
        }
      } else {
        return x(a, [b], c, d, e);
      }
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function x(a, b, c, d, e) {
    var f = 1;
    var g = a.length;
    var h = b.length;
    if (d !== undefined && (d = String(d).toLowerCase(), d === "ucs2" || d === "ucs-2" || d === "utf16le" || d === "utf-16le")) {
      if (a.length < 2 || b.length < 2) {
        return -1;
      }
      f = 2;
      g /= 2;
      h /= 2;
      c /= 2;
    }
    function i(a, b) {
      if (f === 1) {
        return a[b];
      } else {
        return a.readUInt16BE(b * f);
      }
    }
    var j;
    if (e) {
      var k = -1;
      for (j = c; j < g; j++) {
        if (i(a, j) === i(b, k === -1 ? 0 : j - k)) {
          if (k === -1) {
            k = j;
          }
          if (j - k + 1 === h) {
            return k * f;
          }
        } else {
          if (k !== -1) {
            j -= j - k;
          }
          k = -1;
        }
      }
    } else {
      if (c + h > g) {
        c = g - h;
      }
      j = c;
      for (; j >= 0; j--) {
        var l = true;
        for (var m = 0; m < h; m++) {
          if (i(a, j + m) !== i(b, m)) {
            l = false;
            break;
          }
        }
        if (l) {
          return j;
        }
      }
    }
    return -1;
  }
  h.prototype.includes = function (a, b, c) {
    return this.indexOf(a, b, c) !== -1;
  };
  h.prototype.indexOf = function (a, b, c) {
    return w(this, a, b, c, true);
  };
  h.prototype.lastIndexOf = function (a, b, c) {
    return w(this, a, b, c, false);
  };
  function y(a, b, c, d) {
    c = Number(c) || 0;
    var e = a.length - c;
    if (d) {
      d = Number(d);
      if (d > e) {
        d = e;
      }
    } else {
      d = e;
    }
    var f = b.length;
    if (d > f / 2) {
      d = f / 2;
    }
    for (var g = 0; g < d; ++g) {
      var h = parseInt(b.substr(g * 2, 2), 16);
      if (Y(h)) {
        return g;
      }
      a[c + g] = h;
    }
    return g;
  }
  function z(a, b, c, d) {
    return W(S(b, a.length - c), a, c, d);
  }
  function A(a, b, c, d) {
    return W(T(b), a, c, d);
  }
  function B(a, b, c, d) {
    return W(V(b), a, c, d);
  }
  function C(a, b, c, d) {
    return W(U(b, a.length - c), a, c, d);
  }
  h.prototype.write = function (a, b, c, d) {
    if (b === undefined) {
      d = "utf8";
      c = this.length;
      b = 0;
    } else if (c === undefined && typeof b == "string") {
      d = b;
      c = this.length;
      b = 0;
    } else if (isFinite(b)) {
      b = b >>> 0;
      if (isFinite(c)) {
        c = c >>> 0;
        if (d === undefined) {
          d = "utf8";
        }
      } else {
        d = c;
        c = undefined;
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    var e = this.length - b;
    if (c === undefined || c > e) {
      c = e;
    }
    if (a.length > 0 && (c < 0 || b < 0) || b > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    d ||= "utf8";
    var f = false;
    for (;;) {
      switch (d) {
        case "hex":
          return y(this, a, b, c);
        case "utf8":
        case "utf-8":
          return z(this, a, b, c);
        case "ascii":
        case "latin1":
        case "binary":
          return A(this, a, b, c);
        case "base64":
          return B(this, a, b, c);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return C(this, a, b, c);
        default:
          if (f) {
            throw new TypeError("Unknown encoding: " + d);
          }
          d = ("" + d).toLowerCase();
          f = true;
      }
    }
  };
  h.prototype.toJSON = function () {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function D(a, c, d) {
    if (c === 0 && d === a.length) {
      return b.fromByteArray(a);
    } else {
      return b.fromByteArray(a.slice(c, d));
    }
  }
  function E(a, b, c) {
    c = Math.min(a.length, c);
    var d = [];
    for (var e = b; e < c;) {
      var f = a[e];
      var g = null;
      var h = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1;
      if (e + h <= c) {
        var i;
        var j;
        var k;
        var l;
        switch (h) {
          case 1:
            if (f < 128) {
              g = f;
            }
            break;
          case 2:
            i = a[e + 1];
            if ((i & 192) === 128) {
              l = (f & 31) << 6 | i & 63;
              if (l > 127) {
                g = l;
              }
            }
            break;
          case 3:
            i = a[e + 1];
            j = a[e + 2];
            if ((i & 192) === 128 && (j & 192) === 128) {
              l = (f & 15) << 12 | (i & 63) << 6 | j & 63;
              if (l > 2047 && (l < 55296 || l > 57343)) {
                g = l;
              }
            }
            break;
          case 4:
            i = a[e + 1];
            j = a[e + 2];
            k = a[e + 3];
            if ((i & 192) === 128 && (j & 192) === 128 && (k & 192) === 128) {
              l = (f & 15) << 18 | (i & 63) << 12 | (j & 63) << 6 | k & 63;
              if (l > 65535 && l < 1114112) {
                g = l;
              }
            }
        }
      }
      if (g === null) {
        g = 65533;
        h = 1;
      } else if (g > 65535) {
        g -= 65536;
        d.push(g >>> 10 & 1023 | 55296);
        g = g & 1023 | 56320;
      }
      d.push(g);
      e += h;
    }
    return G(d);
  }
  var F = 4096;
  function G(a) {
    var b = a.length;
    if (b <= F) {
      return String.fromCharCode.apply(String, a);
    }
    var c = "";
    for (var d = 0; d < b;) {
      c += String.fromCharCode.apply(String, a.slice(d, d += F));
    }
    return c;
  }
  function H(a, b, c) {
    var d = "";
    c = Math.min(a.length, c);
    for (var e = b; e < c; ++e) {
      d += String.fromCharCode(a[e] & 127);
    }
    return d;
  }
  function I(a, b, c) {
    var d = "";
    c = Math.min(a.length, c);
    for (var e = b; e < c; ++e) {
      d += String.fromCharCode(a[e]);
    }
    return d;
  }
  function J(a, b, c) {
    var d = a.length;
    if (!b || b < 0) {
      b = 0;
    }
    if (!c || c < 0 || c > d) {
      c = d;
    }
    var e = "";
    for (var f = b; f < c; ++f) {
      e += Z[a[f]];
    }
    return e;
  }
  function K(a, b, c) {
    for (var d = a.slice(b, c), e = "", f = 0; f < d.length - 1; f += 2) {
      e += String.fromCharCode(d[f] + d[f + 1] * 256);
    }
    return e;
  }
  h.prototype.slice = function (a, b) {
    var c = this.length;
    a = ~~a;
    b = b === undefined ? c : ~~b;
    if (a < 0) {
      a += c;
      if (a < 0) {
        a = 0;
      }
    } else if (a > c) {
      a = c;
    }
    if (b < 0) {
      b += c;
      if (b < 0) {
        b = 0;
      }
    } else if (b > c) {
      b = c;
    }
    if (b < a) {
      b = a;
    }
    var d = this.subarray(a, b);
    Object.setPrototypeOf(d, h.prototype);
    return d;
  };
  function L(a, b, c) {
    if (a % 1 !== 0 || a < 0) {
      throw new RangeError("offset is not uint");
    }
    if (a + b > c) {
      throw new RangeError("Trying to access beyond buffer length");
    }
  }
  h.prototype.readUintLE = h.prototype.readUIntLE = function (a, b, c) {
    a = a >>> 0;
    b = b >>> 0;
    if (!c) {
      L(a, b, this.length);
    }
    for (var d = this[a], e = 1, f = 0; ++f < b && (e *= 256);) {
      d += this[a + f] * e;
    }
    return d;
  };
  h.prototype.readUintBE = h.prototype.readUIntBE = function (a, b, c) {
    a = a >>> 0;
    b = b >>> 0;
    if (!c) {
      L(a, b, this.length);
    }
    var d = this[a + --b];
    for (var e = 1; b > 0 && (e *= 256);) {
      d += this[a + --b] * e;
    }
    return d;
  };
  h.prototype.readUint8 = h.prototype.readUInt8 = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 1, this.length);
    }
    return this[a];
  };
  h.prototype.readUint16LE = h.prototype.readUInt16LE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 2, this.length);
    }
    return this[a] | this[a + 1] << 8;
  };
  h.prototype.readUint16BE = h.prototype.readUInt16BE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 2, this.length);
    }
    return this[a] << 8 | this[a + 1];
  };
  h.prototype.readUint32LE = h.prototype.readUInt32LE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 4, this.length);
    }
    return (this[a] | this[a + 1] << 8 | this[a + 2] << 16) + this[a + 3] * 16777216;
  };
  h.prototype.readUint32BE = h.prototype.readUInt32BE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 4, this.length);
    }
    return this[a] * 16777216 + (this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3]);
  };
  h.prototype.readIntLE = function (a, b, c) {
    a = a >>> 0;
    b = b >>> 0;
    if (!c) {
      L(a, b, this.length);
    }
    var d = this[a];
    for (var e = 1, f = 0; ++f < b && (e *= 256);) {
      d += this[a + f] * e;
    }
    e *= 128;
    if (d >= e) {
      d -= Math.pow(2, b * 8);
    }
    return d;
  };
  h.prototype.readIntBE = function (a, b, c) {
    a = a >>> 0;
    b = b >>> 0;
    if (!c) {
      L(a, b, this.length);
    }
    for (var d = b, e = 1, f = this[a + --d]; d > 0 && (e *= 256);) {
      f += this[a + --d] * e;
    }
    e *= 128;
    if (f >= e) {
      f -= Math.pow(2, b * 8);
    }
    return f;
  };
  h.prototype.readInt8 = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 1, this.length);
    }
    if (this[a] & 128) {
      return (255 - this[a] + 1) * -1;
    } else {
      return this[a];
    }
  };
  h.prototype.readInt16LE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 2, this.length);
    }
    var c = this[a] | this[a + 1] << 8;
    if (c & 32768) {
      return c | 4294901760;
    } else {
      return c;
    }
  };
  h.prototype.readInt16BE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 2, this.length);
    }
    var c = this[a + 1] | this[a] << 8;
    if (c & 32768) {
      return c | 4294901760;
    } else {
      return c;
    }
  };
  h.prototype.readInt32LE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 4, this.length);
    }
    return this[a] | this[a + 1] << 8 | this[a + 2] << 16 | this[a + 3] << 24;
  };
  h.prototype.readInt32BE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 4, this.length);
    }
    return this[a] << 24 | this[a + 1] << 16 | this[a + 2] << 8 | this[a + 3];
  };
  h.prototype.readFloatLE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 4, this.length);
    }
    return c.read(this, a, true, 23, 4);
  };
  h.prototype.readFloatBE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 4, this.length);
    }
    return c.read(this, a, false, 23, 4);
  };
  h.prototype.readDoubleLE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 8, this.length);
    }
    return c.read(this, a, true, 52, 8);
  };
  h.prototype.readDoubleBE = function (a, b) {
    a = a >>> 0;
    if (!b) {
      L(a, 8, this.length);
    }
    return c.read(this, a, false, 52, 8);
  };
  function M(a, b, c, d, e, f) {
    if (!h.isBuffer(a)) {
      throw new TypeError("\"buffer\" argument must be a Buffer instance");
    }
    if (b > e || b < f) {
      throw new RangeError("\"value\" argument is out of bounds");
    }
    if (c + d > a.length) {
      throw new RangeError("Index out of range");
    }
  }
  h.prototype.writeUintLE = h.prototype.writeUIntLE = function (a, b, c, d) {
    a = +a;
    b = b >>> 0;
    c = c >>> 0;
    if (!d) {
      var e = Math.pow(2, c * 8) - 1;
      M(this, a, b, c, e, 0);
    }
    var f = 1;
    var g = 0;
    for (this[b] = a & 255; ++g < c && (f *= 256);) {
      this[b + g] = a / f & 255;
    }
    return b + c;
  };
  h.prototype.writeUintBE = h.prototype.writeUIntBE = function (a, b, c, d) {
    a = +a;
    b = b >>> 0;
    c = c >>> 0;
    if (!d) {
      var e = Math.pow(2, c * 8) - 1;
      M(this, a, b, c, e, 0);
    }
    var f = c - 1;
    var g = 1;
    for (this[b + f] = a & 255; --f >= 0 && (g *= 256);) {
      this[b + f] = a / g & 255;
    }
    return b + c;
  };
  h.prototype.writeUint8 = h.prototype.writeUInt8 = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 1, 255, 0);
    }
    this[b] = a & 255;
    return b + 1;
  };
  h.prototype.writeUint16LE = h.prototype.writeUInt16LE = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 2, 65535, 0);
    }
    this[b] = a & 255;
    this[b + 1] = a >>> 8;
    return b + 2;
  };
  h.prototype.writeUint16BE = h.prototype.writeUInt16BE = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 2, 65535, 0);
    }
    this[b] = a >>> 8;
    this[b + 1] = a & 255;
    return b + 2;
  };
  h.prototype.writeUint32LE = h.prototype.writeUInt32LE = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 4, 4294967295, 0);
    }
    this[b + 3] = a >>> 24;
    this[b + 2] = a >>> 16;
    this[b + 1] = a >>> 8;
    this[b] = a & 255;
    return b + 4;
  };
  h.prototype.writeUint32BE = h.prototype.writeUInt32BE = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 4, 4294967295, 0);
    }
    this[b] = a >>> 24;
    this[b + 1] = a >>> 16;
    this[b + 2] = a >>> 8;
    this[b + 3] = a & 255;
    return b + 4;
  };
  h.prototype.writeIntLE = function (a, b, c, d) {
    a = +a;
    b = b >>> 0;
    if (!d) {
      var e = Math.pow(2, c * 8 - 1);
      M(this, a, b, c, e - 1, -e);
    }
    var f = 0;
    var g = 1;
    var h = 0;
    for (this[b] = a & 255; ++f < c && (g *= 256);) {
      if (a < 0 && h === 0 && this[b + f - 1] !== 0) {
        h = 1;
      }
      this[b + f] = (a / g >> 0) - h & 255;
    }
    return b + c;
  };
  h.prototype.writeIntBE = function (a, b, c, d) {
    a = +a;
    b = b >>> 0;
    if (!d) {
      var e = Math.pow(2, c * 8 - 1);
      M(this, a, b, c, e - 1, -e);
    }
    var f = c - 1;
    var g = 1;
    var h = 0;
    for (this[b + f] = a & 255; --f >= 0 && (g *= 256);) {
      if (a < 0 && h === 0 && this[b + f + 1] !== 0) {
        h = 1;
      }
      this[b + f] = (a / g >> 0) - h & 255;
    }
    return b + c;
  };
  h.prototype.writeInt8 = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 1, 127, -128);
    }
    if (a < 0) {
      a = 255 + a + 1;
    }
    this[b] = a & 255;
    return b + 1;
  };
  h.prototype.writeInt16LE = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 2, 32767, -32768);
    }
    this[b] = a & 255;
    this[b + 1] = a >>> 8;
    return b + 2;
  };
  h.prototype.writeInt16BE = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 2, 32767, -32768);
    }
    this[b] = a >>> 8;
    this[b + 1] = a & 255;
    return b + 2;
  };
  h.prototype.writeInt32LE = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 4, 2147483647, -2147483648);
    }
    this[b] = a & 255;
    this[b + 1] = a >>> 8;
    this[b + 2] = a >>> 16;
    this[b + 3] = a >>> 24;
    return b + 4;
  };
  h.prototype.writeInt32BE = function (a, b, c) {
    a = +a;
    b = b >>> 0;
    if (!c) {
      M(this, a, b, 4, 2147483647, -2147483648);
    }
    if (a < 0) {
      a = 4294967295 + a + 1;
    }
    this[b] = a >>> 24;
    this[b + 1] = a >>> 16;
    this[b + 2] = a >>> 8;
    this[b + 3] = a & 255;
    return b + 4;
  };
  function N(a, b, c, d, e, f) {
    if (c + d > a.length) {
      throw new RangeError("Index out of range");
    }
    if (c < 0) {
      throw new RangeError("Index out of range");
    }
  }
  function O(a, b, d, e, f) {
    b = +b;
    d = d >>> 0;
    if (!f) {
      N(a, b, d, 4);
    }
    c.write(a, b, d, e, 23, 4);
    return d + 4;
  }
  h.prototype.writeFloatLE = function (a, b, c) {
    return O(this, a, b, true, c);
  };
  h.prototype.writeFloatBE = function (a, b, c) {
    return O(this, a, b, false, c);
  };
  function P(a, b, d, e, f) {
    b = +b;
    d = d >>> 0;
    if (!f) {
      N(a, b, d, 8);
    }
    c.write(a, b, d, e, 52, 8);
    return d + 8;
  }
  h.prototype.writeDoubleLE = function (a, b, c) {
    return P(this, a, b, true, c);
  };
  h.prototype.writeDoubleBE = function (a, b, c) {
    return P(this, a, b, false, c);
  };
  h.prototype.copy = function (a, b, c, d) {
    if (!h.isBuffer(a)) {
      throw new TypeError("argument should be a Buffer");
    }
    c ||= 0;
    if (!d && d !== 0) {
      d = this.length;
    }
    if (b >= a.length) {
      b = a.length;
    }
    b ||= 0;
    if (d > 0 && d < c) {
      d = c;
    }
    if (d === c || a.length === 0 || this.length === 0) {
      return 0;
    }
    if (b < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (c < 0 || c >= this.length) {
      throw new RangeError("Index out of range");
    }
    if (d < 0) {
      throw new RangeError("sourceEnd out of bounds");
    }
    if (d > this.length) {
      d = this.length;
    }
    if (a.length - b < d - c) {
      d = a.length - b + c;
    }
    var e = d - c;
    if (this === a && typeof Uint8Array.prototype.copyWithin == "function") {
      this.copyWithin(b, c, d);
    } else {
      Uint8Array.prototype.set.call(a, this.subarray(c, d), b);
    }
    return e;
  };
  h.prototype.fill = function (a, b, c, d) {
    if (typeof a == "string") {
      if (typeof b == "string") {
        d = b;
        b = 0;
        c = this.length;
      } else if (typeof c == "string") {
        d = c;
        c = this.length;
      }
      if (d !== undefined && typeof d != "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof d == "string" && !h.isEncoding(d)) {
        throw new TypeError("Unknown encoding: " + d);
      }
      if (a.length === 1) {
        var e = a.charCodeAt(0);
        if (d === "utf8" && e < 128 || d === "latin1") {
          a = e;
        }
      }
    } else if (typeof a == "number") {
      a = a & 255;
    } else if (typeof a == "boolean") {
      a = Number(a);
    }
    if (b < 0 || this.length < b || this.length < c) {
      throw new RangeError("Out of range index");
    }
    if (c <= b) {
      return this;
    }
    b = b >>> 0;
    c = c === undefined ? this.length : c >>> 0;
    a ||= 0;
    var f;
    if (typeof a == "number") {
      for (f = b; f < c; ++f) {
        this[f] = a;
      }
    } else {
      var g = h.isBuffer(a) ? a : h.from(a, d);
      var i = g.length;
      if (i === 0) {
        throw new TypeError("The value \"" + a + "\" is invalid for argument \"value\"");
      }
      for (f = 0; f < c - b; ++f) {
        this[f + b] = g[f % i];
      }
    }
    return this;
  };
  var Q = /[^+/0-9A-Za-z-_]/g;
  function R(a) {
    a = a.split("=")[0];
    a = a.trim().replace(Q, "");
    if (a.length < 2) {
      return "";
    }
    while (a.length % 4 !== 0) {
      a = a + "=";
    }
    return a;
  }
  function S(a, b) {
    b = b || Infinity;
    var c;
    for (var d = a.length, e = null, f = [], g = 0; g < d; ++g) {
      c = a.charCodeAt(g);
      if (c > 55295 && c < 57344) {
        if (!e) {
          if (c > 56319) {
            if ((b -= 3) > -1) {
              f.push(239, 191, 189);
            }
            continue;
          } else if (g + 1 === d) {
            if ((b -= 3) > -1) {
              f.push(239, 191, 189);
            }
            continue;
          }
          e = c;
          continue;
        }
        if (c < 56320) {
          if ((b -= 3) > -1) {
            f.push(239, 191, 189);
          }
          e = c;
          continue;
        }
        c = (e - 55296 << 10 | c - 56320) + 65536;
      } else if (e && (b -= 3) > -1) {
        f.push(239, 191, 189);
      }
      e = null;
      if (c < 128) {
        if ((b -= 1) < 0) {
          break;
        }
        f.push(c);
      } else if (c < 2048) {
        if ((b -= 2) < 0) {
          break;
        }
        f.push(c >> 6 | 192, c & 63 | 128);
      } else if (c < 65536) {
        if ((b -= 3) < 0) {
          break;
        }
        f.push(c >> 12 | 224, c >> 6 & 63 | 128, c & 63 | 128);
      } else if (c < 1114112) {
        if ((b -= 4) < 0) {
          break;
        }
        f.push(c >> 18 | 240, c >> 12 & 63 | 128, c >> 6 & 63 | 128, c & 63 | 128);
      } else {
        throw new Error("Invalid code point");
      }
    }
    return f;
  }
  function T(a) {
    var b = [];
    for (var c = 0; c < a.length; ++c) {
      b.push(a.charCodeAt(c) & 255);
    }
    return b;
  }
  function U(a, b) {
    var c;
    var d;
    var e;
    var f = [];
    for (var g = 0; g < a.length && (b -= 2) >= 0; ++g) {
      c = a.charCodeAt(g);
      d = c >> 8;
      e = c % 256;
      f.push(e);
      f.push(d);
    }
    return f;
  }
  function V(a) {
    return b.toByteArray(R(a));
  }
  function W(a, b, c, d) {
    for (var e = 0; e < d && e + c < b.length && e < a.length; ++e) {
      b[e + c] = a[e];
    }
    return e;
  }
  function X(a, b) {
    return a instanceof b || a != null && a.constructor != null && a.constructor.name != null && a.constructor.name === b.name;
  }
  function Y(a) {
    return a !== a;
  }
  var Z = function () {
    var a = "0123456789abcdef";
    var b = new Array(256);
    for (var c = 0; c < 16; ++c) {
      var d = c * 16;
      for (var e = 0; e < 16; ++e) {
        b[d + e] = a[c] + a[e];
      }
    }
    return b;
  }();
})(Dh);
var Kl = {};
var ze;
var Ll;
function Ml() {
  throw new Error("setTimeout has not been defined");
}
function Nl() {
  throw new Error("clearTimeout has not been defined");
}
(function () {
  try {
    if (typeof setTimeout == "function") {
      ze = setTimeout;
    } else {
      ze = Ml;
    }
  } catch {
    ze = Ml;
  }
  try {
    if (typeof clearTimeout == "function") {
      Ll = clearTimeout;
    } else {
      Ll = Nl;
    }
  } catch {
    Ll = Nl;
  }
})();
function Ol(a) {
  if (ze === setTimeout) {
    return setTimeout(a, 0);
  }
  if ((ze === Ml || !ze) && setTimeout) {
    ze = setTimeout;
    return setTimeout(a, 0);
  }
  try {
    return ze(a, 0);
  } catch {
    try {
      return ze.call(null, a, 0);
    } catch {
      return ze.call(this, a, 0);
    }
  }
}
function sc(a) {
  if (Ll === clearTimeout) {
    return clearTimeout(a);
  }
  if ((Ll === Nl || !Ll) && clearTimeout) {
    Ll = clearTimeout;
    return clearTimeout(a);
  }
  try {
    return Ll(a);
  } catch {
    try {
      return Ll.call(null, a);
    } catch {
      return Ll.call(this, a);
    }
  }
}
var Hh = [];
var Pl = false;
var Ql;
var Rl = -1;
function Bi() {
  if (!!Pl && !!Ql) {
    Pl = false;
    if (Ql.length) {
      Hh = Ql.concat(Hh);
    } else {
      Rl = -1;
    }
    if (Hh.length) {
      Ph();
    }
  }
}
function Ph() {
  if (!Pl) {
    var a = Ol(Bi);
    Pl = true;
    for (var b = Hh.length; b;) {
      Ql = Hh;
      Hh = [];
      while (++Rl < b) {
        if (Ql) {
          Ql[Rl].run();
        }
      }
      Rl = -1;
      b = Hh.length;
    }
    Ql = null;
    Pl = false;
    sc(a);
  }
}
Kl.nextTick = function (a) {
  var b = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var c = 1; c < arguments.length; c++) {
      b[c - 1] = arguments[c];
    }
  }
  Hh.push(new oc(a, b));
  if (Hh.length === 1 && !Pl) {
    Ol(Ph);
  }
};
function oc(a, b) {
  this.fun = a;
  this.array = b;
}
oc.prototype.run = function () {
  this.fun.apply(null, this.array);
};
Kl.title = "browser";
Kl.browser = true;
Kl.env = {};
Kl.argv = [];
Kl.version = "";
Kl.versions = {};
function lc() {}
Kl.on = lc;
Kl.addListener = lc;
Kl.once = lc;
Kl.off = lc;
Kl.removeListener = lc;
Kl.removeAllListeners = lc;
Kl.emit = lc;
Kl.prependListener = lc;
Kl.prependOnceListener = lc;
Kl.listeners = function (a) {
  return [];
};
Kl.binding = function (a) {
  throw new Error("process.binding is not supported");
};
Kl.cwd = function () {
  return "/";
};
Kl.chdir = function (a) {
  throw new Error("process.chdir is not supported");
};
Kl.umask = function () {
  return 0;
};
(function (a) {
  function b() {
    var b = this || self;
    delete a.prototype.__magic__;
    return b;
  }
  if (typeof globalThis == "object") {
    return globalThis;
  }
  if (this) {
    return b();
  }
  a.defineProperty(a.prototype, "__magic__", {
    configurable: true,
    get: b
  });
  var c = __magic__;
  return c;
})(Object);
var Sl = {
  exports: {}
};
(function (a) {
  (function (b, c, d) {
    a.exports = d(b);
    a.exports.default = a.exports;
  })(Rh, "UUID", function () {
    function a(a, b, c, d, e, f) {
      var g = function (a, b) {
        var c = a.toString(16);
        if (c.length < 2) {
          c = "0" + c;
        }
        if (b) {
          c = c.toUpperCase();
        }
        return c;
      };
      for (var h = b; h <= c; h++) {
        e[f++] = g(a[h], d);
      }
      return e;
    }
    function b(a, b, c, d, e) {
      for (var f = b; f <= c; f += 2) {
        d[e++] = parseInt(a.substr(f, 2), 16);
      }
    }
    var c = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#".split("");
    var d = [0, 68, 0, 84, 83, 82, 72, 0, 75, 76, 70, 65, 0, 63, 62, 69, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 64, 0, 73, 66, 74, 71, 81, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 77, 0, 78, 67, 0, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 79, 0, 80, 0, 0];
    function e(a, b) {
      if (b % 4 !== 0) {
        throw new Error("z85_encode: invalid input length (multiple of 4 expected)");
      }
      var d = "";
      for (var e = 0, f = 0; e < b;) {
        f = f * 256 + a[e++];
        if (e % 4 === 0) {
          for (var g = 52200625; g >= 1;) {
            var h = Math.floor(f / g) % 85;
            d += c[h];
            g /= 85;
          }
          f = 0;
        }
      }
      return d;
    }
    function f(a, b) {
      var c = a.length;
      if (c % 5 !== 0) {
        throw new Error("z85_decode: invalid input length (multiple of 5 expected)");
      }
      if (typeof b === "undefined") {
        b = new Array(c * 4 / 5);
      }
      for (var e = 0, f = 0, g = 0; e < c;) {
        var h = a.charCodeAt(e++) - 32;
        if (h < 0 || h >= d.length) {
          break;
        }
        g = g * 85 + d[h];
        if (e % 5 === 0) {
          for (var i = 16777216; i >= 1;) {
            b[f++] = Math.trunc(g / i % 256);
            i /= 256;
          }
          g = 0;
        }
      }
      return b;
    }
    function g(a, b) {
      var c = {
        ibits: 8,
        obits: 8,
        obigendian: true
      };
      for (var d in b) {
        if (typeof c[d] !== "undefined") {
          c[d] = b[d];
        }
      }
      for (var e = [], f = 0, g, h, i = 0, j, k = 0, l = a.length; i === 0 && (h = a.charCodeAt(f++)), g = h >> c.ibits - (i + 8) & 255, i = (i + 8) % c.ibits, c.obigendian ? k === 0 ? j = g << c.obits - 8 : j |= g << c.obits - 8 - k : k === 0 ? j = g : j |= g << k, k = (k + 8) % c.obits, k !== 0 || !(e.push(j), f >= l););
      return e;
    }
    function h(a, b) {
      var c = {
        ibits: 32,
        ibigendian: true
      };
      for (var d in b) {
        if (typeof c[d] !== "undefined") {
          c[d] = b[d];
        }
      }
      var e = "";
      var f = 4294967295;
      if (c.ibits < 32) {
        f = (1 << c.ibits) - 1;
      }
      for (var g = a.length, h = 0; h < g; h++) {
        var i = a[h] & f;
        for (var j = 0; j < c.ibits; j += 8) {
          if (c.ibigendian) {
            e += String.fromCharCode(i >> c.ibits - 8 - j & 255);
          } else {
            e += String.fromCharCode(i >> j & 255);
          }
        }
      }
      return e;
    }
    var i = 8;
    var j = 8;
    var k = 256;
    function l(a, b, c, d, e, f, g, h) {
      return [h, g, f, e, d, c, b, a];
    }
    function m() {
      return l(0, 0, 0, 0, 0, 0, 0, 0);
    }
    function n(a) {
      return a.slice(0);
    }
    function o(a) {
      var b = m();
      for (var c = 0; c < i; c++) {
        b[c] = Math.floor(a % k);
        a /= k;
      }
      return b;
    }
    function p(a) {
      var b = 0;
      for (var c = i - 1; c >= 0; c--) {
        b *= k;
        b += a[c];
      }
      return Math.floor(b);
    }
    function q(a, b) {
      var c = 0;
      for (var d = 0; d < i; d++) {
        c += a[d] + b[d];
        a[d] = Math.floor(c % k);
        c = Math.floor(c / k);
      }
      return c;
    }
    function r(a, b) {
      var c = 0;
      for (var d = 0; d < i; d++) {
        c += a[d] * b;
        a[d] = Math.floor(c % k);
        c = Math.floor(c / k);
      }
      return c;
    }
    function s(a, b) {
      var c;
      var d;
      var e = new Array(i + i);
      for (c = 0; c < i + i; c++) {
        e[c] = 0;
      }
      var f;
      for (c = 0; c < i; c++) {
        f = 0;
        d = 0;
        for (; d < i; d++) {
          f += a[c] * b[d] + e[c + d];
          e[c + d] = f % k;
          f /= k;
        }
        for (; d < i + i - c; d++) {
          f += e[c + d];
          e[c + d] = f % k;
          f /= k;
        }
      }
      for (c = 0; c < i; c++) {
        a[c] = e[c];
      }
      return e.slice(i, i);
    }
    function t(a, b) {
      for (var c = 0; c < i; c++) {
        a[c] &= b[c];
      }
      return a;
    }
    function u(a, b) {
      for (var c = 0; c < i; c++) {
        a[c] |= b[c];
      }
      return a;
    }
    function v(a, b) {
      var c = m();
      if (b % j !== 0) {
        throw new Error("ui64_rorn: only bit rotations supported with a multiple of digit bits");
      }
      for (var d = Math.floor(b / j), e = 0; e < d; e++) {
        for (var f = i - 1 - 1; f >= 0; f--) {
          c[f + 1] = c[f];
        }
        c[0] = a[0];
        f = 0;
        for (; f < i - 1; f++) {
          a[f] = a[f + 1];
        }
        a[f] = 0;
      }
      return p(c);
    }
    function w(a, b) {
      if (b > i * j) {
        throw new Error("ui64_ror: invalid number of bits to shift");
      }
      var c = new Array(i + i);
      var d;
      for (d = 0; d < i; d++) {
        c[d + i] = a[d];
        c[d] = 0;
      }
      var e = Math.floor(b / j);
      var f = b % j;
      for (d = e; d < i + i - 1; d++) {
        c[d - e] = (c[d] >>> f | c[d + 1] << j - f) & (1 << j) - 1;
      }
      c[i + i - 1 - e] = c[i + i - 1] >>> f & (1 << j) - 1;
      d = i + i - 1 - e + 1;
      for (; d < i + i; d++) {
        c[d] = 0;
      }
      for (d = 0; d < i; d++) {
        a[d] = c[d + i];
      }
      return c.slice(0, i);
    }
    function x(a, b) {
      if (b > i * j) {
        throw new Error("ui64_rol: invalid number of bits to shift");
      }
      var c = new Array(i + i);
      var d;
      for (d = 0; d < i; d++) {
        c[d + i] = 0;
        c[d] = a[d];
      }
      var e = Math.floor(b / j);
      var f = b % j;
      for (d = i - 1 - e; d > 0; d--) {
        c[d + e] = (c[d] << f | c[d - 1] >>> j - f) & (1 << j) - 1;
      }
      c[0 + e] = c[0] << f & (1 << j) - 1;
      d = 0 + e - 1;
      for (; d >= 0; d--) {
        c[d] = 0;
      }
      for (d = 0; d < i; d++) {
        a[d] = c[d];
      }
      return c.slice(i, i);
    }
    function y(a, b) {
      for (var c = 0; c < i; c++) {
        a[c] ^= b[c];
      }
    }
    function z(a, b) {
      var c = (a & 65535) + (b & 65535);
      var d = (a >> 16) + (b >> 16) + (c >> 16);
      return d << 16 | c & 65535;
    }
    function A(a, b) {
      return a << b & 4294967295 | a >>> 32 - b & 4294967295;
    }
    function B(a, b) {
      function c(a, b, c, d) {
        if (a < 20) {
          return b & c | ~b & d;
        } else if (a < 40) {
          return b ^ c ^ d;
        } else if (a < 60) {
          return b & c | b & d | c & d;
        } else {
          return b ^ c ^ d;
        }
      }
      function d(a) {
        if (a < 20) {
          return 1518500249;
        } else if (a < 40) {
          return 1859775393;
        } else if (a < 60) {
          return -1894007588;
        } else {
          return -899497514;
        }
      }
      a[b >> 5] |= 128 << 24 - b % 32;
      a[(b + 64 >> 9 << 4) + 15] = b;
      var e = Array(80);
      var f = 1732584193;
      var g = -271733879;
      var h = -1732584194;
      var i = 271733878;
      var j = -1009589776;
      for (var k = 0; k < a.length; k += 16) {
        var l = f;
        var m = g;
        var n = h;
        var o = i;
        var p = j;
        for (var q = 0; q < 80; q++) {
          if (q < 16) {
            e[q] = a[k + q];
          } else {
            e[q] = A(e[q - 3] ^ e[q - 8] ^ e[q - 14] ^ e[q - 16], 1);
          }
          var r = z(z(A(f, 5), c(q, g, h, i)), z(z(j, e[q]), d(q)));
          j = i;
          i = h;
          h = A(g, 30);
          g = f;
          f = r;
        }
        f = z(f, l);
        g = z(g, m);
        h = z(h, n);
        i = z(i, o);
        j = z(j, p);
      }
      return [f, g, h, i, j];
    }
    function C(a) {
      return h(B(g(a, {
        ibits: 8,
        obits: 32,
        obigendian: true
      }), a.length * 8), {
        ibits: 32,
        ibigendian: true
      });
    }
    function D(a, b) {
      function c(a, b, c, d, e, f) {
        return z(A(z(z(b, a), z(d, f)), e), c);
      }
      function d(a, b, d, e, f, g, h) {
        return c(b & d | ~b & e, a, b, f, g, h);
      }
      function e(a, b, d, e, f, g, h) {
        return c(b & e | d & ~e, a, b, f, g, h);
      }
      function f(a, b, d, e, f, g, h) {
        return c(b ^ d ^ e, a, b, f, g, h);
      }
      function g(a, b, d, e, f, g, h) {
        return c(d ^ (b | ~e), a, b, f, g, h);
      }
      a[b >> 5] |= 128 << b % 32;
      a[(b + 64 >>> 9 << 4) + 14] = b;
      var h = 1732584193;
      var i = -271733879;
      var j = -1732584194;
      var k = 271733878;
      for (var l = 0; l < a.length; l += 16) {
        var m = h;
        var n = i;
        var o = j;
        var p = k;
        h = d(h, i, j, k, a[l + 0], 7, -680876936);
        k = d(k, h, i, j, a[l + 1], 12, -389564586);
        j = d(j, k, h, i, a[l + 2], 17, 606105819);
        i = d(i, j, k, h, a[l + 3], 22, -1044525330);
        h = d(h, i, j, k, a[l + 4], 7, -176418897);
        k = d(k, h, i, j, a[l + 5], 12, 1200080426);
        j = d(j, k, h, i, a[l + 6], 17, -1473231341);
        i = d(i, j, k, h, a[l + 7], 22, -45705983);
        h = d(h, i, j, k, a[l + 8], 7, 1770035416);
        k = d(k, h, i, j, a[l + 9], 12, -1958414417);
        j = d(j, k, h, i, a[l + 10], 17, -42063);
        i = d(i, j, k, h, a[l + 11], 22, -1990404162);
        h = d(h, i, j, k, a[l + 12], 7, 1804603682);
        k = d(k, h, i, j, a[l + 13], 12, -40341101);
        j = d(j, k, h, i, a[l + 14], 17, -1502002290);
        i = d(i, j, k, h, a[l + 15], 22, 1236535329);
        h = e(h, i, j, k, a[l + 1], 5, -165796510);
        k = e(k, h, i, j, a[l + 6], 9, -1069501632);
        j = e(j, k, h, i, a[l + 11], 14, 643717713);
        i = e(i, j, k, h, a[l + 0], 20, -373897302);
        h = e(h, i, j, k, a[l + 5], 5, -701558691);
        k = e(k, h, i, j, a[l + 10], 9, 38016083);
        j = e(j, k, h, i, a[l + 15], 14, -660478335);
        i = e(i, j, k, h, a[l + 4], 20, -405537848);
        h = e(h, i, j, k, a[l + 9], 5, 568446438);
        k = e(k, h, i, j, a[l + 14], 9, -1019803690);
        j = e(j, k, h, i, a[l + 3], 14, -187363961);
        i = e(i, j, k, h, a[l + 8], 20, 1163531501);
        h = e(h, i, j, k, a[l + 13], 5, -1444681467);
        k = e(k, h, i, j, a[l + 2], 9, -51403784);
        j = e(j, k, h, i, a[l + 7], 14, 1735328473);
        i = e(i, j, k, h, a[l + 12], 20, -1926607734);
        h = f(h, i, j, k, a[l + 5], 4, -378558);
        k = f(k, h, i, j, a[l + 8], 11, -2022574463);
        j = f(j, k, h, i, a[l + 11], 16, 1839030562);
        i = f(i, j, k, h, a[l + 14], 23, -35309556);
        h = f(h, i, j, k, a[l + 1], 4, -1530992060);
        k = f(k, h, i, j, a[l + 4], 11, 1272893353);
        j = f(j, k, h, i, a[l + 7], 16, -155497632);
        i = f(i, j, k, h, a[l + 10], 23, -1094730640);
        h = f(h, i, j, k, a[l + 13], 4, 681279174);
        k = f(k, h, i, j, a[l + 0], 11, -358537222);
        j = f(j, k, h, i, a[l + 3], 16, -722521979);
        i = f(i, j, k, h, a[l + 6], 23, 76029189);
        h = f(h, i, j, k, a[l + 9], 4, -640364487);
        k = f(k, h, i, j, a[l + 12], 11, -421815835);
        j = f(j, k, h, i, a[l + 15], 16, 530742520);
        i = f(i, j, k, h, a[l + 2], 23, -995338651);
        h = g(h, i, j, k, a[l + 0], 6, -198630844);
        k = g(k, h, i, j, a[l + 7], 10, 1126891415);
        j = g(j, k, h, i, a[l + 14], 15, -1416354905);
        i = g(i, j, k, h, a[l + 5], 21, -57434055);
        h = g(h, i, j, k, a[l + 12], 6, 1700485571);
        k = g(k, h, i, j, a[l + 3], 10, -1894986606);
        j = g(j, k, h, i, a[l + 10], 15, -1051523);
        i = g(i, j, k, h, a[l + 1], 21, -2054922799);
        h = g(h, i, j, k, a[l + 8], 6, 1873313359);
        k = g(k, h, i, j, a[l + 15], 10, -30611744);
        j = g(j, k, h, i, a[l + 6], 15, -1560198380);
        i = g(i, j, k, h, a[l + 13], 21, 1309151649);
        h = g(h, i, j, k, a[l + 4], 6, -145523070);
        k = g(k, h, i, j, a[l + 11], 10, -1120210379);
        j = g(j, k, h, i, a[l + 2], 15, 718787259);
        i = g(i, j, k, h, a[l + 9], 21, -343485551);
        h = z(h, m);
        i = z(i, n);
        j = z(j, o);
        k = z(k, p);
      }
      return [h, i, j, k];
    }
    function E(a) {
      return h(D(g(a, {
        ibits: 8,
        obits: 32,
        obigendian: false
      }), a.length * 8), {
        ibits: 32,
        ibigendian: false
      });
    }
    function F(a) {
      this.mul = l(88, 81, 244, 45, 76, 149, 127, 45);
      this.inc = l(20, 5, 123, 126, 247, 103, 129, 79);
      this.mask = l(0, 0, 0, 0, 255, 255, 255, 255);
      this.state = n(this.inc);
      this.next();
      t(this.state, this.mask);
      var b;
      if (a !== undefined) {
        a = o(a >>> 0);
      } else if (typeof window == "object" && typeof window.crypto == "object" && typeof window.crypto.getRandomValues == "function") {
        b = new Uint32Array(2);
        window.crypto.getRandomValues(b);
        a = u(o(b[0] >>> 0), w(o(b[1] >>> 0), 32));
      } else if (typeof globalThis == "object" && typeof globalThis.crypto == "object" && typeof globalThis.crypto.getRandomValues == "function") {
        b = new Uint32Array(2);
        globalThis.crypto.getRandomValues(b);
        a = u(o(b[0] >>> 0), w(o(b[1] >>> 0), 32));
      } else {
        a = o(Math.random() * 4294967295 >>> 0);
        u(a, w(o(new Date().getTime()), 32));
      }
      u(this.state, a);
      this.next();
    }
    F.prototype.next = function () {
      var a = n(this.state);
      s(this.state, this.mul);
      q(this.state, this.inc);
      var b = n(a);
      w(b, 18);
      y(b, a);
      w(b, 27);
      var c = n(a);
      w(c, 59);
      t(b, this.mask);
      var d = p(c);
      var e = n(b);
      x(e, 32 - d);
      w(b, d);
      y(b, e);
      return p(b);
    };
    F.prototype.reseed = function (a) {
      if (typeof a != "string") {
        throw new Error("UUID: PCG: seed: invalid argument (string expected)");
      }
      for (var b = B(g(a, {
          ibits: 8,
          obits: 32,
          obigendian: true
        }), a.length * 8), c = 0; c < b.length; c++) {
        y(G.state, o(b[c] >>> 0));
      }
    };
    var G = new F();
    F.reseed = function (a) {
      G.reseed(a);
    };
    function H(a, b) {
      var c = [];
      for (var d = 0; d < a; d++) {
        c[d] = G.next() % b;
      }
      return c;
    }
    var I = 0;
    var J = 0;
    function K() {
      if (arguments.length === 1 && typeof arguments[0] == "string") {
        this.parse.apply(this, arguments);
      } else if (arguments.length >= 1 && typeof arguments[0] == "number") {
        this.make.apply(this, arguments);
      } else {
        if (arguments.length >= 1) {
          throw new Error("UUID: constructor: invalid arguments");
        }
        for (var a = 0; a < 16; a++) {
          this[a] = 0;
        }
      }
    }
    if (typeof Uint8Array !== "undefined") {
      K.prototype = new Uint8Array(16);
    } else if (Dh.Buffer) {
      K.prototype = Dh.Buffer.alloc(16);
    } else {
      K.prototype = new Array(16);
    }
    K.prototype.constructor = K;
    K.prototype.make = function (a) {
      var b;
      var c = this;
      if (a === 1) {
        var d = new Date();
        var e = d.getTime();
        if (e !== I) {
          J = 0;
        } else {
          J++;
        }
        I = e;
        var f = o(e);
        r(f, 10000);
        q(f, l(1, 178, 29, 210, 19, 129, 64, 0));
        if (J > 0) {
          q(f, o(J));
        }
        var g;
        g = v(f, 8);
        c[3] = g & 255;
        g = v(f, 8);
        c[2] = g & 255;
        g = v(f, 8);
        c[1] = g & 255;
        g = v(f, 8);
        c[0] = g & 255;
        g = v(f, 8);
        c[5] = g & 255;
        g = v(f, 8);
        c[4] = g & 255;
        g = v(f, 8);
        c[7] = g & 255;
        g = v(f, 8);
        c[6] = g & 15;
        var h = H(2, 255);
        c[8] = h[0];
        c[9] = h[1];
        var i = H(6, 255);
        i[0] |= 1;
        i[0] |= 2;
        b = 0;
        for (; b < 6; b++) {
          c[10 + b] = i[b];
        }
      } else if (a === 4) {
        var j = H(16, 255);
        for (b = 0; b < 16; b++) {
          this[b] = j[b];
        }
      } else if (a === 3 || a === 5) {
        var k = "";
        var m = typeof arguments[1] == "object" && arguments[1] instanceof K ? arguments[1] : new K().parse(arguments[1]);
        for (b = 0; b < 16; b++) {
          k += String.fromCharCode(m[b]);
        }
        k += arguments[2];
        var n = a === 3 ? E(k) : C(k);
        for (b = 0; b < 16; b++) {
          c[b] = n.charCodeAt(b);
        }
      } else {
        throw new Error("UUID: make: invalid version");
      }
      c[6] &= 15;
      c[6] |= a << 4;
      c[8] &= 63;
      c[8] |= 128;
      return c;
    };
    K.prototype.format = function (b) {
      var c;
      var d;
      if (b === "z85") {
        c = e(this, 16);
      } else if (b === "b16") {
        d = Array(32);
        a(this, 0, 15, true, d, 0);
        c = d.join("");
      } else if (b === undefined || b === "std") {
        d = new Array(36);
        a(this, 0, 3, false, d, 0);
        d[8] = "-";
        a(this, 4, 5, false, d, 9);
        d[13] = "-";
        a(this, 6, 7, false, d, 14);
        d[18] = "-";
        a(this, 8, 9, false, d, 19);
        d[23] = "-";
        a(this, 10, 15, false, d, 24);
        c = d.join("");
      }
      return c;
    };
    K.prototype.toString = function (a) {
      return this.format(a);
    };
    K.prototype.toJSON = function () {
      return this.format("std");
    };
    K.prototype.parse = function (a, c) {
      if (typeof a != "string") {
        throw new Error("UUID: parse: invalid argument (type string expected)");
      }
      if (c === "z85") {
        f(a, this);
      } else if (c === "b16") {
        b(a, 0, 35, this, 0);
      } else if (c === undefined || c === "std") {
        var d = {
          nil: "00000000-0000-0000-0000-000000000000",
          "ns:DNS": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
          "ns:URL": "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
          "ns:OID": "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
          "ns:X500": "6ba7b814-9dad-11d1-80b4-00c04fd430c8"
        };
        if (d[a] !== undefined) {
          a = d[a];
        } else if (!a.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
          throw new Error("UUID: parse: invalid string representation (expected \"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\")");
        }
        b(a, 0, 7, this, 0);
        b(a, 9, 12, this, 4);
        b(a, 14, 17, this, 6);
        b(a, 19, 22, this, 8);
        b(a, 24, 35, this, 10);
      }
      return this;
    };
    K.prototype.export = function () {
      var a = Array(16);
      for (var b = 0; b < 16; b++) {
        a[b] = this[b];
      }
      return a;
    };
    K.prototype.import = function (a) {
      if (typeof a != "object" || !(a instanceof Array)) {
        throw new Error("UUID: import: invalid argument (type Array expected)");
      }
      if (a.length !== 16) {
        throw new Error("UUID: import: invalid argument (Array of length 16 expected)");
      }
      for (var b = 0; b < 16; b++) {
        if (typeof a[b] != "number") {
          throw new Error("UUID: import: invalid array element #" + b + " (type Number expected)");
        }
        if (!isFinite(a[b]) || Math.floor(a[b]) !== a[b]) {
          throw new Error("UUID: import: invalid array element #" + b + " (Number with integer value expected)");
        }
        if (a[b] < 0 || a[b] > 255) {
          throw new Error("UUID: import: invalid array element #" + b + " (Number with integer value in range 0...255 expected)");
        }
        this[b] = a[b];
      }
      return this;
    };
    K.prototype.compare = function (a) {
      if (typeof a != "object") {
        throw new Error("UUID: compare: invalid argument (type UUID expected)");
      }
      if (!(a instanceof K)) {
        throw new Error("UUID: compare: invalid argument (type UUID expected)");
      }
      for (var b = 0; b < 16; b++) {
        if (this[b] < a[b]) {
          return -1;
        }
        if (this[b] > a[b]) {
          return 1;
        }
      }
      return 0;
    };
    K.prototype.equal = function (a) {
      return this.compare(a) === 0;
    };
    K.prototype.fold = function (a) {
      if (typeof a === "undefined") {
        throw new Error("UUID: fold: invalid argument (number of fold operations expected)");
      }
      if (a < 1 || a > 4) {
        throw new Error("UUID: fold: invalid argument (1-4 fold operations expected)");
      }
      for (var b = 16 / Math.pow(2, a), c = new Array(b), d = 0; d < b; d++) {
        var e = 0;
        for (var f = 0; d + f < 16; f += b) {
          e ^= this[d + f];
        }
        c[d] = e;
      }
      return c;
    };
    K.PCG = F;
    return K;
  });
})(Sl);
var cc = Sl.exports;
const Wh = zh(cc);
var Vh = Object.create;
var qh = Object.defineProperty;
var Tl = Object.getOwnPropertyDescriptor;
var Xh = Object.getOwnPropertyNames;
var fc = Object.getPrototypeOf;
var Gh = Object.prototype.hasOwnProperty;
var Kh = (a, b) => function () {
  if (!b) {
    (0, a[Xh(a)[0]])((b = {
      exports: {}
    }).exports, b);
  }
  return b.exports;
};
var be = (a, b) => {
  for (var c in b) {
    qh(a, c, {
      get: b[c],
      enumerable: true
    });
  }
};
var Ul = (a, b, c, d) => {
  if (b && typeof b == "object" || typeof b == "function") {
    for (let e of Xh(b)) {
      if (!Gh.call(a, e) && e !== c) {
        qh(a, e, {
          get: () => b[e],
          enumerable: !(d = Tl(b, e)) || d.enumerable
        });
      }
    }
  }
  return a;
};
var Yh = (a, b, c) => {
  c = a != null ? Vh(fc(a)) : {};
  return Ul(b || !a || !a.__esModule ? qh(c, "default", {
    value: a,
    enumerable: true
  }) : c, a);
};
var Jh = (a, b, c) => {
  if (!b.has(a)) {
    throw TypeError("Cannot " + c);
  }
};
var Vl = (a, b, c) => {
  Jh(a, b, "read from private field");
  if (c) {
    return c.call(a);
  } else {
    return b.get(a);
  }
};
var z = (a, b, c) => {
  if (b.has(a)) {
    throw TypeError("Cannot add the same private member more than once");
  }
  if (b instanceof WeakSet) {
    b.add(a);
  } else {
    b.set(a, c);
  }
};
var Q = (a, b, c, d) => {
  Jh(a, b, "write to private field");
  if (d) {
    d.call(a, c);
  } else {
    b.set(a, c);
  }
  return c;
};
var oe = (a, b, c, d) => ({
  set _(d) {
    Q(a, b, d, c);
  },
  get _() {
    return Vl(a, b, d);
  }
});
var Wl = (a, b, c) => {
  Jh(a, b, "access private method");
  return c;
};
var ie = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/core.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d();
      } else if (typeof define == "function" && define.amd) {
        define([], d);
      } else {
        c.CryptoJS = d();
      }
    })(a, function () {
      var a = a || function (a, b) {
        var c = Object.create || function () {
          function a() {}
          return function (b) {
            var c;
            a.prototype = b;
            c = new a();
            a.prototype = null;
            return c;
          };
        }();
        var d = {};
        var e = d.lib = {};
        var f = e.Base = function () {
          return {
            extend: function (a) {
              var b = c(this);
              if (a) {
                b.mixIn(a);
              }
              if (!b.hasOwnProperty("init") || this.init === b.init) {
                b.init = function () {
                  b.$super.init.apply(this, arguments);
                };
              }
              b.init.prototype = b;
              b.$super = this;
              return b;
            },
            create: function () {
              var a = this.extend();
              a.init.apply(a, arguments);
              return a;
            },
            init: function () {},
            mixIn: function (a) {
              for (var b in a) {
                if (a.hasOwnProperty(b)) {
                  this[b] = a[b];
                }
              }
              if (a.hasOwnProperty("toString")) {
                this.toString = a.toString;
              }
            },
            clone: function () {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var g = e.WordArray = f.extend({
          init: function (a, c) {
            a = this.words = a || [];
            if (c != b) {
              this.sigBytes = c;
            } else {
              this.sigBytes = a.length * 4;
            }
          },
          toString: function (a) {
            return (a || i).stringify(this);
          },
          concat: function (a) {
            var b = this.words;
            var c = a.words;
            var d = this.sigBytes;
            var e = a.sigBytes;
            this.clamp();
            if (d % 4) {
              for (var f = 0; f < e; f++) {
                var g = c[f >>> 2] >>> 24 - f % 4 * 8 & 255;
                b[d + f >>> 2] |= g << 24 - (d + f) % 4 * 8;
              }
            } else {
              for (var f = 0; f < e; f += 4) {
                b[d + f >>> 2] = c[f >>> 2];
              }
            }
            this.sigBytes += e;
            return this;
          },
          clamp: function () {
            var b = this.words;
            var c = this.sigBytes;
            b[c >>> 2] &= 4294967295 << 32 - c % 4 * 8;
            b.length = a.ceil(c / 4);
          },
          clone: function () {
            var a = f.clone.call(this);
            a.words = this.words.slice(0);
            return a;
          },
          random: function (b) {
            var c = [];
            var d = function (b) {
              var b = b;
              var c = 987654321;
              var d = 4294967295;
              return function () {
                c = (c & 65535) * 36969 + (c >> 16) & d;
                b = (b & 65535) * 18000 + (b >> 16) & d;
                var e = (c << 16) + b & d;
                e /= 4294967296;
                e += 0.5;
                return e * (a.random() > 0.5 ? 1 : -1);
              };
            };
            for (var e = 0, f; e < b; e += 4) {
              var h = d((f || a.random()) * 4294967296);
              f = h() * 987654071;
              c.push(h() * 4294967296 | 0);
            }
            return new g.init(c, b);
          }
        });
        var h = d.enc = {};
        var i = h.Hex = {
          stringify: function (a) {
            var b = a.words;
            for (var c = a.sigBytes, d = [], e = 0; e < c; e++) {
              var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
              d.push((f >>> 4).toString(16));
              d.push((f & 15).toString(16));
            }
            return d.join("");
          },
          parse: function (a) {
            for (var b = a.length, c = [], d = 0; d < b; d += 2) {
              c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - d % 8 * 4;
            }
            return new g.init(c, b / 2);
          }
        };
        var j = h.Latin1 = {
          stringify: function (a) {
            var b = a.words;
            for (var c = a.sigBytes, d = [], e = 0; e < c; e++) {
              var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
              d.push(String.fromCharCode(f));
            }
            return d.join("");
          },
          parse: function (a) {
            for (var b = a.length, c = [], d = 0; d < b; d++) {
              c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - d % 4 * 8;
            }
            return new g.init(c, b);
          }
        };
        var k = h.Utf8 = {
          stringify: function (a) {
            try {
              return decodeURIComponent(escape(j.stringify(a)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function (a) {
            return j.parse(unescape(encodeURIComponent(a)));
          }
        };
        var l = e.BufferedBlockAlgorithm = f.extend({
          reset: function () {
            this._data = new g.init();
            this._nDataBytes = 0;
          },
          _append: function (a) {
            if (typeof a == "string") {
              a = k.parse(a);
            }
            this._data.concat(a);
            this._nDataBytes += a.sigBytes;
          },
          _process: function (b) {
            var c = this._data;
            var d = c.words;
            var e = c.sigBytes;
            var f = this.blockSize;
            var h = f * 4;
            var i = e / h;
            if (b) {
              i = a.ceil(i);
            } else {
              i = a.max((i | 0) - this._minBufferSize, 0);
            }
            var j = i * f;
            var k = a.min(j * 4, e);
            if (j) {
              for (var l = 0; l < j; l += f) {
                this._doProcessBlock(d, l);
              }
              var m = d.splice(0, j);
              c.sigBytes -= k;
            }
            return new g.init(m, k);
          },
          clone: function () {
            var a = f.clone.call(this);
            a._data = this._data.clone();
            return a;
          },
          _minBufferSize: 0
        });
        e.Hasher = l.extend({
          cfg: f.extend(),
          init: function (a) {
            this.cfg = this.cfg.extend(a);
            this.reset();
          },
          reset: function () {
            l.reset.call(this);
            this._doReset();
          },
          update: function (a) {
            this._append(a);
            this._process();
            return this;
          },
          finalize: function (a) {
            if (a) {
              this._append(a);
            }
            var b = this._doFinalize();
            return b;
          },
          blockSize: 16,
          _createHelper: function (a) {
            return function (b, c) {
              return new a.init(c).finalize(b);
            };
          },
          _createHmacHelper: function (a) {
            return function (b, c) {
              return new m.HMAC.init(a, c).finalize(b);
            };
          }
        });
        var m = d.algo = {};
        return d;
      }(Math);
      return a;
    });
  }
});
var ke = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/x64-core.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d(ie());
      } else if (typeof define == "function" && define.amd) {
        define(["./core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function (b) {
        var c = a;
        var d = c.lib;
        var e = d.Base;
        var f = d.WordArray;
        var g = c.x64 = {};
        g.Word = e.extend({
          init: function (a, b) {
            this.high = a;
            this.low = b;
          }
        });
        g.WordArray = e.extend({
          init: function (a, c) {
            a = this.words = a || [];
            if (c != b) {
              this.sigBytes = c;
            } else {
              this.sigBytes = a.length * 8;
            }
          },
          toX32: function () {
            var a = this.words;
            for (var b = a.length, c = [], d = 0; d < b; d++) {
              var e = a[d];
              c.push(e.high);
              c.push(e.low);
            }
            return f.create(c, this.sigBytes);
          },
          clone: function () {
            var a = e.clone.call(this);
            var b = a.words = this.words.slice(0);
            for (var c = b.length, d = 0; d < c; d++) {
              b[d] = b[d].clone();
            }
            return a;
          }
        });
      })();
      return a;
    });
  }
});
var ba = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/lib-typedarrays.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d(ie());
      } else if (typeof define == "function" && define.amd) {
        define(["./core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        if (typeof ArrayBuffer == "function") {
          var b = a;
          var c = b.lib;
          var d = c.WordArray;
          var e = d.init;
          var f = d.init = function (a) {
            if (a instanceof ArrayBuffer) {
              a = new Uint8Array(a);
            }
            if (a instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && a instanceof Uint8ClampedArray || a instanceof Int16Array || a instanceof Uint16Array || a instanceof Int32Array || a instanceof Uint32Array || a instanceof Float32Array || a instanceof Float64Array) {
              a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
            }
            if (a instanceof Uint8Array) {
              for (var b = a.byteLength, c = [], d = 0; d < b; d++) {
                c[d >>> 2] |= a[d] << 24 - d % 4 * 8;
              }
              e.call(this, c, b);
            } else {
              e.apply(this, arguments);
            }
          };
          f.prototype = d;
        }
      })();
      return a.lib.WordArray;
    });
  }
});
var Qh = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/enc-utf16.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d(ie());
      } else if (typeof define == "function" && define.amd) {
        define(["./core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.WordArray;
        var e = b.enc;
        e.Utf16 = e.Utf16BE = {
          stringify: function (a) {
            var b = a.words;
            for (var c = a.sigBytes, d = [], e = 0; e < c; e += 2) {
              var f = b[e >>> 2] >>> 16 - e % 4 * 8 & 65535;
              d.push(String.fromCharCode(f));
            }
            return d.join("");
          },
          parse: function (a) {
            for (var b = a.length, c = [], e = 0; e < b; e++) {
              c[e >>> 1] |= a.charCodeAt(e) << 16 - e % 2 * 16;
            }
            return d.create(c, b * 2);
          }
        };
        e.Utf16LE = {
          stringify: function (a) {
            var b = a.words;
            for (var c = a.sigBytes, d = [], e = 0; e < c; e += 2) {
              var g = f(b[e >>> 2] >>> 16 - e % 4 * 8 & 65535);
              d.push(String.fromCharCode(g));
            }
            return d.join("");
          },
          parse: function (a) {
            for (var b = a.length, c = [], e = 0; e < b; e++) {
              c[e >>> 1] |= f(a.charCodeAt(e) << 16 - e % 2 * 16);
            }
            return d.create(c, b * 2);
          }
        };
        function f(a) {
          return a << 8 & 4278255360 | a >>> 8 & 16711935;
        }
      })();
      return a.enc.Utf16;
    });
  }
});
var Xl = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/enc-base64.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d(ie());
      } else if (typeof define == "function" && define.amd) {
        define(["./core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.WordArray;
        var e = b.enc;
        e.Base64 = {
          stringify: function (a) {
            var b = a.words;
            var c = a.sigBytes;
            var d = this._map;
            a.clamp();
            var e = [];
            for (var f = 0; f < c; f += 3) {
              var g = b[f >>> 2] >>> 24 - f % 4 * 8 & 255;
              var h = b[f + 1 >>> 2] >>> 24 - (f + 1) % 4 * 8 & 255;
              var i = b[f + 2 >>> 2] >>> 24 - (f + 2) % 4 * 8 & 255;
              var j = g << 16 | h << 8 | i;
              for (var k = 0; k < 4 && f + k * 0.75 < c; k++) {
                e.push(d.charAt(j >>> (3 - k) * 6 & 63));
              }
            }
            var l = d.charAt(64);
            if (l) {
              while (e.length % 4) {
                e.push(l);
              }
            }
            return e.join("");
          },
          parse: function (a) {
            var b = a.length;
            var c = this._map;
            var d = this._reverseMap;
            if (!d) {
              d = this._reverseMap = [];
              for (var e = 0; e < c.length; e++) {
                d[c.charCodeAt(e)] = e;
              }
            }
            var g = c.charAt(64);
            if (g) {
              var h = a.indexOf(g);
              if (h !== -1) {
                b = h;
              }
            }
            return f(a, b, d);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function f(a, b, c) {
          var e = [];
          var f = 0;
          for (var g = 0; g < b; g++) {
            if (g % 4) {
              var h = c[a.charCodeAt(g - 1)] << g % 4 * 2;
              var i = c[a.charCodeAt(g)] >>> 6 - g % 4 * 2;
              e[f >>> 2] |= (h | i) << 24 - f % 4 * 8;
              f++;
            }
          }
          return d.create(e, f);
        }
      })();
      return a.enc.Base64;
    });
  }
});
var Yl = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/md5.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d(ie());
      } else if (typeof define == "function" && define.amd) {
        define(["./core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function (b) {
        var c = a;
        var d = c.lib;
        var e = d.WordArray;
        var f = d.Hasher;
        var g = c.algo;
        var h = [];
        (function () {
          for (var a = 0; a < 64; a++) {
            h[a] = b.abs(b.sin(a + 1)) * 4294967296 | 0;
          }
        })();
        var i = g.MD5 = f.extend({
          _doReset: function () {
            this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878]);
          },
          _doProcessBlock: function (a, b) {
            for (var c = 0; c < 16; c++) {
              var d = b + c;
              var e = a[d];
              a[d] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
            }
            var f = this._hash.words;
            var g = a[b + 0];
            var i = a[b + 1];
            var n = a[b + 2];
            var o = a[b + 3];
            var p = a[b + 4];
            var q = a[b + 5];
            var r = a[b + 6];
            var s = a[b + 7];
            var t = a[b + 8];
            var u = a[b + 9];
            var v = a[b + 10];
            var w = a[b + 11];
            var x = a[b + 12];
            var y = a[b + 13];
            var z = a[b + 14];
            var A = a[b + 15];
            var B = f[0];
            var C = f[1];
            var D = f[2];
            var E = f[3];
            B = j(B, C, D, E, g, 7, h[0]);
            E = j(E, B, C, D, i, 12, h[1]);
            D = j(D, E, B, C, n, 17, h[2]);
            C = j(C, D, E, B, o, 22, h[3]);
            B = j(B, C, D, E, p, 7, h[4]);
            E = j(E, B, C, D, q, 12, h[5]);
            D = j(D, E, B, C, r, 17, h[6]);
            C = j(C, D, E, B, s, 22, h[7]);
            B = j(B, C, D, E, t, 7, h[8]);
            E = j(E, B, C, D, u, 12, h[9]);
            D = j(D, E, B, C, v, 17, h[10]);
            C = j(C, D, E, B, w, 22, h[11]);
            B = j(B, C, D, E, x, 7, h[12]);
            E = j(E, B, C, D, y, 12, h[13]);
            D = j(D, E, B, C, z, 17, h[14]);
            C = j(C, D, E, B, A, 22, h[15]);
            B = k(B, C, D, E, i, 5, h[16]);
            E = k(E, B, C, D, r, 9, h[17]);
            D = k(D, E, B, C, w, 14, h[18]);
            C = k(C, D, E, B, g, 20, h[19]);
            B = k(B, C, D, E, q, 5, h[20]);
            E = k(E, B, C, D, v, 9, h[21]);
            D = k(D, E, B, C, A, 14, h[22]);
            C = k(C, D, E, B, p, 20, h[23]);
            B = k(B, C, D, E, u, 5, h[24]);
            E = k(E, B, C, D, z, 9, h[25]);
            D = k(D, E, B, C, o, 14, h[26]);
            C = k(C, D, E, B, t, 20, h[27]);
            B = k(B, C, D, E, y, 5, h[28]);
            E = k(E, B, C, D, n, 9, h[29]);
            D = k(D, E, B, C, s, 14, h[30]);
            C = k(C, D, E, B, x, 20, h[31]);
            B = l(B, C, D, E, q, 4, h[32]);
            E = l(E, B, C, D, t, 11, h[33]);
            D = l(D, E, B, C, w, 16, h[34]);
            C = l(C, D, E, B, z, 23, h[35]);
            B = l(B, C, D, E, i, 4, h[36]);
            E = l(E, B, C, D, p, 11, h[37]);
            D = l(D, E, B, C, s, 16, h[38]);
            C = l(C, D, E, B, v, 23, h[39]);
            B = l(B, C, D, E, y, 4, h[40]);
            E = l(E, B, C, D, g, 11, h[41]);
            D = l(D, E, B, C, o, 16, h[42]);
            C = l(C, D, E, B, r, 23, h[43]);
            B = l(B, C, D, E, u, 4, h[44]);
            E = l(E, B, C, D, x, 11, h[45]);
            D = l(D, E, B, C, A, 16, h[46]);
            C = l(C, D, E, B, n, 23, h[47]);
            B = m(B, C, D, E, g, 6, h[48]);
            E = m(E, B, C, D, s, 10, h[49]);
            D = m(D, E, B, C, z, 15, h[50]);
            C = m(C, D, E, B, q, 21, h[51]);
            B = m(B, C, D, E, x, 6, h[52]);
            E = m(E, B, C, D, o, 10, h[53]);
            D = m(D, E, B, C, v, 15, h[54]);
            C = m(C, D, E, B, i, 21, h[55]);
            B = m(B, C, D, E, t, 6, h[56]);
            E = m(E, B, C, D, A, 10, h[57]);
            D = m(D, E, B, C, r, 15, h[58]);
            C = m(C, D, E, B, y, 21, h[59]);
            B = m(B, C, D, E, p, 6, h[60]);
            E = m(E, B, C, D, w, 10, h[61]);
            D = m(D, E, B, C, n, 15, h[62]);
            C = m(C, D, E, B, u, 21, h[63]);
            f[0] = f[0] + B | 0;
            f[1] = f[1] + C | 0;
            f[2] = f[2] + D | 0;
            f[3] = f[3] + E | 0;
          },
          _doFinalize: function () {
            var a = this._data;
            var c = a.words;
            var d = this._nDataBytes * 8;
            var e = a.sigBytes * 8;
            c[e >>> 5] |= 128 << 24 - e % 32;
            var f = b.floor(d / 4294967296);
            var g = d;
            c[(e + 64 >>> 9 << 4) + 15] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
            c[(e + 64 >>> 9 << 4) + 14] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
            a.sigBytes = (c.length + 1) * 4;
            this._process();
            var h = this._hash;
            var i = h.words;
            for (var j = 0; j < 4; j++) {
              var k = i[j];
              i[j] = (k << 8 | k >>> 24) & 16711935 | (k << 24 | k >>> 8) & 4278255360;
            }
            return h;
          },
          clone: function () {
            var a = f.clone.call(this);
            a._hash = this._hash.clone();
            return a;
          }
        });
        function j(a, b, c, d, e, f, g) {
          var h = a + (b & c | ~b & d) + e + g;
          return (h << f | h >>> 32 - f) + b;
        }
        function k(a, b, c, d, e, f, g) {
          var h = a + (b & d | c & ~d) + e + g;
          return (h << f | h >>> 32 - f) + b;
        }
        function l(a, b, c, d, e, f, g) {
          var h = a + (b ^ c ^ d) + e + g;
          return (h << f | h >>> 32 - f) + b;
        }
        function m(a, b, c, d, e, f, g) {
          var h = a + (c ^ (b | ~d)) + e + g;
          return (h << f | h >>> 32 - f) + b;
        }
        c.MD5 = f._createHelper(i);
        c.HmacMD5 = f._createHmacHelper(i);
      })(Math);
      return a.MD5;
    });
  }
});
var Zl = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/sha1.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d(ie());
      } else if (typeof define == "function" && define.amd) {
        define(["./core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.WordArray;
        var e = c.Hasher;
        var f = b.algo;
        var g = [];
        var h = f.SHA1 = e.extend({
          _doReset: function () {
            this._hash = new d.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function (a, b) {
            var c = this._hash.words;
            var d = c[0];
            var e = c[1];
            var f = c[2];
            var h = c[3];
            var i = c[4];
            for (var j = 0; j < 80; j++) {
              if (j < 16) {
                g[j] = a[b + j] | 0;
              } else {
                var k = g[j - 3] ^ g[j - 8] ^ g[j - 14] ^ g[j - 16];
                g[j] = k << 1 | k >>> 31;
              }
              var l = (d << 5 | d >>> 27) + i + g[j];
              if (j < 20) {
                l += (e & f | ~e & h) + 1518500249;
              } else if (j < 40) {
                l += (e ^ f ^ h) + 1859775393;
              } else if (j < 60) {
                l += (e & f | e & h | f & h) - 1894007588;
              } else {
                l += (e ^ f ^ h) - 899497514;
              }
              i = h;
              h = f;
              f = e << 30 | e >>> 2;
              e = d;
              d = l;
            }
            c[0] = c[0] + d | 0;
            c[1] = c[1] + e | 0;
            c[2] = c[2] + f | 0;
            c[3] = c[3] + h | 0;
            c[4] = c[4] + i | 0;
          },
          _doFinalize: function () {
            var a = this._data;
            var b = a.words;
            var c = this._nDataBytes * 8;
            var d = a.sigBytes * 8;
            b[d >>> 5] |= 128 << 24 - d % 32;
            b[(d + 64 >>> 9 << 4) + 14] = Math.floor(c / 4294967296);
            b[(d + 64 >>> 9 << 4) + 15] = c;
            a.sigBytes = b.length * 4;
            this._process();
            return this._hash;
          },
          clone: function () {
            var a = e.clone.call(this);
            a._hash = this._hash.clone();
            return a;
          }
        });
        b.SHA1 = e._createHelper(h);
        b.HmacSHA1 = e._createHmacHelper(h);
      })();
      return a.SHA1;
    });
  }
});
var $l = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/sha256.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d(ie());
      } else if (typeof define == "function" && define.amd) {
        define(["./core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function (b) {
        var c = a;
        var d = c.lib;
        var e = d.WordArray;
        var f = d.Hasher;
        var g = c.algo;
        var h = [];
        var i = [];
        (function () {
          function a(a) {
            for (var c = b.sqrt(a), d = 2; d <= c; d++) {
              if (!(a % d)) {
                return false;
              }
            }
            return true;
          }
          function c(a) {
            return (a - (a | 0)) * 4294967296 | 0;
          }
          var d = 2;
          for (var e = 0; e < 64;) {
            if (a(d)) {
              if (e < 8) {
                h[e] = c(b.pow(d, 1 / 2));
              }
              i[e] = c(b.pow(d, 1 / 3));
              e++;
            }
            d++;
          }
        })();
        var j = [];
        var k = g.SHA256 = f.extend({
          _doReset: function () {
            this._hash = new e.init(h.slice(0));
          },
          _doProcessBlock: function (a, b) {
            var c = this._hash.words;
            var d = c[0];
            var e = c[1];
            var f = c[2];
            var g = c[3];
            var h = c[4];
            var k = c[5];
            var l = c[6];
            var m = c[7];
            for (var n = 0; n < 64; n++) {
              if (n < 16) {
                j[n] = a[b + n] | 0;
              } else {
                var o = j[n - 15];
                var p = (o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3;
                var q = j[n - 2];
                var r = (q << 15 | q >>> 17) ^ (q << 13 | q >>> 19) ^ q >>> 10;
                j[n] = p + j[n - 7] + r + j[n - 16];
              }
              var s = h & k ^ ~h & l;
              var t = d & e ^ d & f ^ e & f;
              var u = (d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22);
              var v = (h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25);
              var w = m + v + s + i[n] + j[n];
              var x = u + t;
              m = l;
              l = k;
              k = h;
              h = g + w | 0;
              g = f;
              f = e;
              e = d;
              d = w + x | 0;
            }
            c[0] = c[0] + d | 0;
            c[1] = c[1] + e | 0;
            c[2] = c[2] + f | 0;
            c[3] = c[3] + g | 0;
            c[4] = c[4] + h | 0;
            c[5] = c[5] + k | 0;
            c[6] = c[6] + l | 0;
            c[7] = c[7] + m | 0;
          },
          _doFinalize: function () {
            var a = this._data;
            var c = a.words;
            var d = this._nDataBytes * 8;
            var e = a.sigBytes * 8;
            c[e >>> 5] |= 128 << 24 - e % 32;
            c[(e + 64 >>> 9 << 4) + 14] = b.floor(d / 4294967296);
            c[(e + 64 >>> 9 << 4) + 15] = d;
            a.sigBytes = c.length * 4;
            this._process();
            return this._hash;
          },
          clone: function () {
            var a = f.clone.call(this);
            a._hash = this._hash.clone();
            return a;
          }
        });
        c.SHA256 = f._createHelper(k);
        c.HmacSHA256 = f._createHmacHelper(k);
      })(Math);
      return a.SHA256;
    });
  }
});
var uc = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/sha224.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), $l());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./sha256"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.WordArray;
        var e = b.algo;
        var f = e.SHA256;
        var g = e.SHA224 = f.extend({
          _doReset: function () {
            this._hash = new d.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
          },
          _doFinalize: function () {
            var a = f._doFinalize.call(this);
            a.sigBytes -= 4;
            return a;
          }
        });
        b.SHA224 = f._createHelper(g);
        b.HmacSHA224 = f._createHmacHelper(g);
      })();
      return a.SHA224;
    });
  }
});
var _l = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/sha512.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), ke());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./x64-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.Hasher;
        var e = b.x64;
        var f = e.Word;
        var g = e.WordArray;
        var h = b.algo;
        function i() {
          return f.create.apply(f, arguments);
        }
        var j = [i(1116352408, 3609767458), i(1899447441, 602891725), i(3049323471, 3964484399), i(3921009573, 2173295548), i(961987163, 4081628472), i(1508970993, 3053834265), i(2453635748, 2937671579), i(2870763221, 3664609560), i(3624381080, 2734883394), i(310598401, 1164996542), i(607225278, 1323610764), i(1426881987, 3590304994), i(1925078388, 4068182383), i(2162078206, 991336113), i(2614888103, 633803317), i(3248222580, 3479774868), i(3835390401, 2666613458), i(4022224774, 944711139), i(264347078, 2341262773), i(604807628, 2007800933), i(770255983, 1495990901), i(1249150122, 1856431235), i(1555081692, 3175218132), i(1996064986, 2198950837), i(2554220882, 3999719339), i(2821834349, 766784016), i(2952996808, 2566594879), i(3210313671, 3203337956), i(3336571891, 1034457026), i(3584528711, 2466948901), i(113926993, 3758326383), i(338241895, 168717936), i(666307205, 1188179964), i(773529912, 1546045734), i(1294757372, 1522805485), i(1396182291, 2643833823), i(1695183700, 2343527390), i(1986661051, 1014477480), i(2177026350, 1206759142), i(2456956037, 344077627), i(2730485921, 1290863460), i(2820302411, 3158454273), i(3259730800, 3505952657), i(3345764771, 106217008), i(3516065817, 3606008344), i(3600352804, 1432725776), i(4094571909, 1467031594), i(275423344, 851169720), i(430227734, 3100823752), i(506948616, 1363258195), i(659060556, 3750685593), i(883997877, 3785050280), i(958139571, 3318307427), i(1322822218, 3812723403), i(1537002063, 2003034995), i(1747873779, 3602036899), i(1955562222, 1575990012), i(2024104815, 1125592928), i(2227730452, 2716904306), i(2361852424, 442776044), i(2428436474, 593698344), i(2756734187, 3733110249), i(3204031479, 2999351573), i(3329325298, 3815920427), i(3391569614, 3928383900), i(3515267271, 566280711), i(3940187606, 3454069534), i(4118630271, 4000239992), i(116418474, 1914138554), i(174292421, 2731055270), i(289380356, 3203993006), i(460393269, 320620315), i(685471733, 587496836), i(852142971, 1086792851), i(1017036298, 365543100), i(1126000580, 2618297676), i(1288033470, 3409855158), i(1501505948, 4234509866), i(1607167915, 987167468), i(1816402316, 1246189591)];
        var k = [];
        (function () {
          for (var a = 0; a < 80; a++) {
            k[a] = i();
          }
        })();
        var l = h.SHA512 = d.extend({
          _doReset: function () {
            this._hash = new g.init([new f.init(1779033703, 4089235720), new f.init(3144134277, 2227873595), new f.init(1013904242, 4271175723), new f.init(2773480762, 1595750129), new f.init(1359893119, 2917565137), new f.init(2600822924, 725511199), new f.init(528734635, 4215389547), new f.init(1541459225, 327033209)]);
          },
          _doProcessBlock: function (a, b) {
            var c = this._hash.words;
            var d = c[0];
            var e = c[1];
            var f = c[2];
            var g = c[3];
            var h = c[4];
            var i = c[5];
            var l = c[6];
            var m = c[7];
            var n = d.high;
            var o = d.low;
            var p = e.high;
            var q = e.low;
            var r = f.high;
            var s = f.low;
            var t = g.high;
            var u = g.low;
            var v = h.high;
            var w = h.low;
            var x = i.high;
            var y = i.low;
            var z = l.high;
            var A = l.low;
            var B = m.high;
            var C = m.low;
            var D = n;
            var E = o;
            var F = p;
            var G = q;
            var H = r;
            var I = s;
            var J = t;
            var K = u;
            var L = v;
            var M = w;
            var N = x;
            var O = y;
            var P = z;
            var Q = A;
            var R = B;
            var S = C;
            for (var T = 0; T < 80; T++) {
              var U = k[T];
              if (T < 16) {
                var V = U.high = a[b + T * 2] | 0;
                var W = U.low = a[b + T * 2 + 1] | 0;
              } else {
                var X = k[T - 15];
                var Y = X.high;
                var Z = X.low;
                var $ = (Y >>> 1 | Z << 31) ^ (Y >>> 8 | Z << 24) ^ Y >>> 7;
                var _ = (Z >>> 1 | Y << 31) ^ (Z >>> 8 | Y << 24) ^ (Z >>> 7 | Y << 25);
                var aa = k[T - 2];
                var ba = aa.high;
                var ca = aa.low;
                var da = (ba >>> 19 | ca << 13) ^ (ba << 3 | ca >>> 29) ^ ba >>> 6;
                var ea = (ca >>> 19 | ba << 13) ^ (ca << 3 | ba >>> 29) ^ (ca >>> 6 | ba << 26);
                var fa = k[T - 7];
                var ga = fa.high;
                var ha = fa.low;
                var ia = k[T - 16];
                var ja = ia.high;
                var ka = ia.low;
                var W = _ + ha;
                var V = $ + ga + (W >>> 0 < _ >>> 0 ? 1 : 0);
                var W = W + ea;
                var V = V + da + (W >>> 0 < ea >>> 0 ? 1 : 0);
                var W = W + ka;
                var V = V + ja + (W >>> 0 < ka >>> 0 ? 1 : 0);
                U.high = V;
                U.low = W;
              }
              var la = L & N ^ ~L & P;
              var ma = M & O ^ ~M & Q;
              var na = D & F ^ D & H ^ F & H;
              var oa = E & G ^ E & I ^ G & I;
              var pa = (D >>> 28 | E << 4) ^ (D << 30 | E >>> 2) ^ (D << 25 | E >>> 7);
              var qa = (E >>> 28 | D << 4) ^ (E << 30 | D >>> 2) ^ (E << 25 | D >>> 7);
              var ra = (L >>> 14 | M << 18) ^ (L >>> 18 | M << 14) ^ (L << 23 | M >>> 9);
              var sa = (M >>> 14 | L << 18) ^ (M >>> 18 | L << 14) ^ (M << 23 | L >>> 9);
              var ta = j[T];
              var ua = ta.high;
              var va = ta.low;
              var wa = S + sa;
              var xa = R + ra + (wa >>> 0 < S >>> 0 ? 1 : 0);
              var wa = wa + ma;
              var xa = xa + la + (wa >>> 0 < ma >>> 0 ? 1 : 0);
              var wa = wa + va;
              var xa = xa + ua + (wa >>> 0 < va >>> 0 ? 1 : 0);
              var wa = wa + W;
              var xa = xa + V + (wa >>> 0 < W >>> 0 ? 1 : 0);
              var ya = qa + oa;
              var za = pa + na + (ya >>> 0 < qa >>> 0 ? 1 : 0);
              R = P;
              S = Q;
              P = N;
              Q = O;
              N = L;
              O = M;
              M = K + wa | 0;
              L = J + xa + (M >>> 0 < K >>> 0 ? 1 : 0) | 0;
              J = H;
              K = I;
              H = F;
              I = G;
              F = D;
              G = E;
              E = wa + ya | 0;
              D = xa + za + (E >>> 0 < wa >>> 0 ? 1 : 0) | 0;
            }
            o = d.low = o + E;
            d.high = n + D + (o >>> 0 < E >>> 0 ? 1 : 0);
            q = e.low = q + G;
            e.high = p + F + (q >>> 0 < G >>> 0 ? 1 : 0);
            s = f.low = s + I;
            f.high = r + H + (s >>> 0 < I >>> 0 ? 1 : 0);
            u = g.low = u + K;
            g.high = t + J + (u >>> 0 < K >>> 0 ? 1 : 0);
            w = h.low = w + M;
            h.high = v + L + (w >>> 0 < M >>> 0 ? 1 : 0);
            y = i.low = y + O;
            i.high = x + N + (y >>> 0 < O >>> 0 ? 1 : 0);
            A = l.low = A + Q;
            l.high = z + P + (A >>> 0 < Q >>> 0 ? 1 : 0);
            C = m.low = C + S;
            m.high = B + R + (C >>> 0 < S >>> 0 ? 1 : 0);
          },
          _doFinalize: function () {
            var a = this._data;
            var b = a.words;
            var c = this._nDataBytes * 8;
            var d = a.sigBytes * 8;
            b[d >>> 5] |= 128 << 24 - d % 32;
            b[(d + 128 >>> 10 << 5) + 30] = Math.floor(c / 4294967296);
            b[(d + 128 >>> 10 << 5) + 31] = c;
            a.sigBytes = b.length * 4;
            this._process();
            var e = this._hash.toX32();
            return e;
          },
          clone: function () {
            var a = d.clone.call(this);
            a._hash = this._hash.clone();
            return a;
          },
          blockSize: 32
        });
        b.SHA512 = d._createHelper(l);
        b.HmacSHA512 = d._createHmacHelper(l);
      })();
      return a.SHA512;
    });
  }
});
var dc = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/sha384.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), ke(), _l());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./x64-core", "./sha512"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.x64;
        var d = c.Word;
        var e = c.WordArray;
        var f = b.algo;
        var g = f.SHA512;
        var h = f.SHA384 = g.extend({
          _doReset: function () {
            this._hash = new e.init([new d.init(3418070365, 3238371032), new d.init(1654270250, 914150663), new d.init(2438529370, 812702999), new d.init(355462360, 4144912697), new d.init(1731405415, 4290775857), new d.init(2394180231, 1750603025), new d.init(3675008525, 1694076839), new d.init(1203062813, 3204075428)]);
          },
          _doFinalize: function () {
            var a = g._doFinalize.call(this);
            a.sigBytes -= 16;
            return a;
          }
        });
        b.SHA384 = g._createHelper(h);
        b.HmacSHA384 = g._createHmacHelper(h);
      })();
      return a.SHA384;
    });
  }
});
var am = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/sha3.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), ke());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./x64-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function (b) {
        var c = a;
        var d = c.lib;
        var e = d.WordArray;
        var f = d.Hasher;
        var g = c.x64;
        var h = g.Word;
        var i = c.algo;
        var j = [];
        var k = [];
        var l = [];
        (function () {
          var a = 1;
          var b = 0;
          for (var c = 0; c < 24; c++) {
            j[a + b * 5] = (c + 1) * (c + 2) / 2 % 64;
            var d = b % 5;
            var e = (a * 2 + b * 3) % 5;
            a = d;
            b = e;
          }
          for (var a = 0; a < 5; a++) {
            for (var b = 0; b < 5; b++) {
              k[a + b * 5] = b + (a * 2 + b * 3) % 5 * 5;
            }
          }
          var f = 1;
          for (var g = 0; g < 24; g++) {
            var i = 0;
            var m = 0;
            for (var n = 0; n < 7; n++) {
              if (f & 1) {
                var o = (1 << n) - 1;
                if (o < 32) {
                  m ^= 1 << o;
                } else {
                  i ^= 1 << o - 32;
                }
              }
              if (f & 128) {
                f = f << 1 ^ 113;
              } else {
                f <<= 1;
              }
            }
            l[g] = h.create(i, m);
          }
        })();
        var m = [];
        (function () {
          for (var a = 0; a < 25; a++) {
            m[a] = h.create();
          }
        })();
        var n = i.SHA3 = f.extend({
          cfg: f.cfg.extend({
            outputLength: 512
          }),
          _doReset: function () {
            var a = this._state = [];
            for (var b = 0; b < 25; b++) {
              a[b] = new h.init();
            }
            this.blockSize = (1600 - this.cfg.outputLength * 2) / 32;
          },
          _doProcessBlock: function (a, b) {
            var c = this._state;
            for (var d = this.blockSize / 2, e = 0; e < d; e++) {
              var f = a[b + e * 2];
              var g = a[b + e * 2 + 1];
              f = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
              g = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
              var h = c[e];
              h.high ^= g;
              h.low ^= f;
            }
            for (var i = 0; i < 24; i++) {
              for (var n = 0; n < 5; n++) {
                var o = 0;
                var p = 0;
                for (var q = 0; q < 5; q++) {
                  var h = c[n + q * 5];
                  o ^= h.high;
                  p ^= h.low;
                }
                var r = m[n];
                r.high = o;
                r.low = p;
              }
              for (var n = 0; n < 5; n++) {
                var s = m[(n + 4) % 5];
                var t = m[(n + 1) % 5];
                var u = t.high;
                var v = t.low;
                var o = s.high ^ (u << 1 | v >>> 31);
                var p = s.low ^ (v << 1 | u >>> 31);
                for (var q = 0; q < 5; q++) {
                  var h = c[n + q * 5];
                  h.high ^= o;
                  h.low ^= p;
                }
              }
              for (var w = 1; w < 25; w++) {
                var h = c[w];
                var x = h.high;
                var y = h.low;
                var z = j[w];
                if (z < 32) {
                  var o = x << z | y >>> 32 - z;
                  var p = y << z | x >>> 32 - z;
                } else {
                  var o = y << z - 32 | x >>> 64 - z;
                  var p = x << z - 32 | y >>> 64 - z;
                }
                var A = m[k[w]];
                A.high = o;
                A.low = p;
              }
              var B = m[0];
              var C = c[0];
              B.high = C.high;
              B.low = C.low;
              for (var n = 0; n < 5; n++) {
                for (var q = 0; q < 5; q++) {
                  var w = n + q * 5;
                  var h = c[w];
                  var D = m[w];
                  var E = m[(n + 1) % 5 + q * 5];
                  var F = m[(n + 2) % 5 + q * 5];
                  h.high = D.high ^ ~E.high & F.high;
                  h.low = D.low ^ ~E.low & F.low;
                }
              }
              var h = c[0];
              var G = l[i];
              h.high ^= G.high;
              h.low ^= G.low;
            }
          },
          _doFinalize: function () {
            var a = this._data;
            var c = a.words;
            this._nDataBytes * 8;
            var d = a.sigBytes * 8;
            var f = this.blockSize * 32;
            c[d >>> 5] |= 1 << 24 - d % 32;
            c[(b.ceil((d + 1) / f) * f >>> 5) - 1] |= 128;
            a.sigBytes = c.length * 4;
            this._process();
            var g = this._state;
            var h = this.cfg.outputLength / 8;
            for (var i = h / 8, j = [], k = 0; k < i; k++) {
              var l = g[k];
              var m = l.high;
              var n = l.low;
              m = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360;
              n = (n << 8 | n >>> 24) & 16711935 | (n << 24 | n >>> 8) & 4278255360;
              j.push(n);
              j.push(m);
            }
            return new e.init(j, h);
          },
          clone: function () {
            var a = f.clone.call(this);
            var b = a._state = this._state.slice(0);
            for (var c = 0; c < 25; c++) {
              b[c] = b[c].clone();
            }
            return a;
          }
        });
        c.SHA3 = f._createHelper(n);
        c.HmacSHA3 = f._createHmacHelper(n);
      })(Math);
      return a.SHA3;
    });
  }
});
var bm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/ripemd160.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d(ie());
      } else if (typeof define == "function" && define.amd) {
        define(["./core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function (b) {
        var c = a;
        var d = c.lib;
        var e = d.WordArray;
        var f = d.Hasher;
        var g = c.algo;
        var h = e.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
        var i = e.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
        var j = e.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
        var k = e.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
        var l = e.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
        var m = e.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
        var n = g.RIPEMD160 = f.extend({
          _doReset: function () {
            this._hash = e.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function (a, b) {
            for (var c = 0; c < 16; c++) {
              var d = b + c;
              var e = a[d];
              a[d] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
            }
            var f = this._hash.words;
            var g = l.words;
            var n = m.words;
            var u = h.words;
            var v = i.words;
            var w = j.words;
            var x = k.words;
            var y;
            var z;
            var A;
            var B;
            var C;
            var D;
            var E;
            var F;
            var G;
            var H;
            D = y = f[0];
            E = z = f[1];
            F = A = f[2];
            G = B = f[3];
            H = C = f[4];
            var I;
            for (var c = 0; c < 80; c += 1) {
              I = y + a[b + u[c]] | 0;
              if (c < 16) {
                I += o(z, A, B) + g[0];
              } else if (c < 32) {
                I += p(z, A, B) + g[1];
              } else if (c < 48) {
                I += q(z, A, B) + g[2];
              } else if (c < 64) {
                I += r(z, A, B) + g[3];
              } else {
                I += s(z, A, B) + g[4];
              }
              I = I | 0;
              I = t(I, w[c]);
              I = I + C | 0;
              y = C;
              C = B;
              B = t(A, 10);
              A = z;
              z = I;
              I = D + a[b + v[c]] | 0;
              if (c < 16) {
                I += s(E, F, G) + n[0];
              } else if (c < 32) {
                I += r(E, F, G) + n[1];
              } else if (c < 48) {
                I += q(E, F, G) + n[2];
              } else if (c < 64) {
                I += p(E, F, G) + n[3];
              } else {
                I += o(E, F, G) + n[4];
              }
              I = I | 0;
              I = t(I, x[c]);
              I = I + H | 0;
              D = H;
              H = G;
              G = t(F, 10);
              F = E;
              E = I;
            }
            I = f[1] + A + G | 0;
            f[1] = f[2] + B + H | 0;
            f[2] = f[3] + C + D | 0;
            f[3] = f[4] + y + E | 0;
            f[4] = f[0] + z + F | 0;
            f[0] = I;
          },
          _doFinalize: function () {
            var a = this._data;
            var b = a.words;
            var c = this._nDataBytes * 8;
            var d = a.sigBytes * 8;
            b[d >>> 5] |= 128 << 24 - d % 32;
            b[(d + 64 >>> 9 << 4) + 14] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
            a.sigBytes = (b.length + 1) * 4;
            this._process();
            var e = this._hash;
            var f = e.words;
            for (var g = 0; g < 5; g++) {
              var h = f[g];
              f[g] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
            }
            return e;
          },
          clone: function () {
            var a = f.clone.call(this);
            a._hash = this._hash.clone();
            return a;
          }
        });
        function o(a, b, c) {
          return a ^ b ^ c;
        }
        function p(a, b, c) {
          return a & b | ~a & c;
        }
        function q(a, b, c) {
          return (a | ~b) ^ c;
        }
        function r(a, b, c) {
          return a & c | b & ~c;
        }
        function s(a, b, c) {
          return a ^ (b | ~c);
        }
        function t(a, b) {
          return a << b | a >>> 32 - b;
        }
        c.RIPEMD160 = f._createHelper(n);
        c.HmacRIPEMD160 = f._createHmacHelper(n);
      })();
      return a.RIPEMD160;
    });
  }
});
var cm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/hmac.js"(a, b) {
    (function (c, d) {
      if (typeof a == "object") {
        b.exports = a = d(ie());
      } else if (typeof define == "function" && define.amd) {
        define(["./core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.Base;
        var e = b.enc;
        var f = e.Utf8;
        var g = b.algo;
        g.HMAC = d.extend({
          init: function (a, b) {
            a = this._hasher = new a.init();
            if (typeof b == "string") {
              b = f.parse(b);
            }
            var c = a.blockSize;
            var d = c * 4;
            if (b.sigBytes > d) {
              b = a.finalize(b);
            }
            b.clamp();
            var e = this._oKey = b.clone();
            var g = this._iKey = b.clone();
            var h = e.words;
            var i = g.words;
            for (var j = 0; j < c; j++) {
              h[j] ^= 1549556828;
              i[j] ^= 909522486;
            }
            e.sigBytes = g.sigBytes = d;
            this.reset();
          },
          reset: function () {
            var a = this._hasher;
            a.reset();
            a.update(this._iKey);
          },
          update: function (a) {
            this._hasher.update(a);
            return this;
          },
          finalize: function (a) {
            var b = this._hasher;
            var c = b.finalize(a);
            b.reset();
            var d = b.finalize(this._oKey.clone().concat(c));
            return d;
          }
        });
      })();
    });
  }
});
var dm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/pbkdf2.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), Zl(), cm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./sha1", "./hmac"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.Base;
        var e = c.WordArray;
        var f = b.algo;
        var g = f.SHA1;
        var h = f.HMAC;
        var i = f.PBKDF2 = d.extend({
          cfg: d.extend({
            keySize: 4,
            hasher: g,
            iterations: 1
          }),
          init: function (a) {
            this.cfg = this.cfg.extend(a);
          },
          compute: function (a, b) {
            var c = this.cfg;
            var d = h.create(c.hasher, a);
            var f = e.create();
            var g = e.create([1]);
            for (var i = f.words, j = g.words, k = c.keySize, l = c.iterations; i.length < k;) {
              var m = d.update(b).finalize(g);
              d.reset();
              var n = m.words;
              var o = n.length;
              var p = m;
              for (var q = 1; q < l; q++) {
                p = d.finalize(p);
                d.reset();
                var r = p.words;
                for (var s = 0; s < o; s++) {
                  n[s] ^= r[s];
                }
              }
              f.concat(m);
              j[0]++;
            }
            f.sigBytes = k * 4;
            return f;
          }
        });
        b.PBKDF2 = function (a, b, c) {
          return i.create(c).compute(a, b);
        };
      })();
      return a.PBKDF2;
    });
  }
});
var em = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/evpkdf.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), Zl(), cm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./sha1", "./hmac"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.Base;
        var e = c.WordArray;
        var f = b.algo;
        var g = f.MD5;
        var h = f.EvpKDF = d.extend({
          cfg: d.extend({
            keySize: 4,
            hasher: g,
            iterations: 1
          }),
          init: function (a) {
            this.cfg = this.cfg.extend(a);
          },
          compute: function (a, b) {
            var c = this.cfg;
            var d = c.hasher.create();
            for (var f = e.create(), g = f.words, h = c.keySize, i = c.iterations; g.length < h;) {
              if (j) {
                d.update(j);
              }
              var j = d.update(a).finalize(b);
              d.reset();
              for (var k = 1; k < i; k++) {
                j = d.finalize(j);
                d.reset();
              }
              f.concat(j);
            }
            f.sigBytes = h * 4;
            return f;
          }
        });
        b.EvpKDF = function (a, b, c) {
          return h.create(c).compute(a, b);
        };
      })();
      return a.EvpKDF;
    });
  }
});
var fm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/cipher-core.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), em());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./evpkdf"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      if (!a.lib.Cipher) {
        (function (b) {
          var c = a;
          var d = c.lib;
          var e = d.Base;
          var f = d.WordArray;
          var g = d.BufferedBlockAlgorithm;
          var h = c.enc;
          h.Utf8;
          var i = h.Base64;
          var j = c.algo;
          var k = j.EvpKDF;
          var l = d.Cipher = g.extend({
            cfg: e.extend(),
            createEncryptor: function (a, b) {
              return this.create(this._ENC_XFORM_MODE, a, b);
            },
            createDecryptor: function (a, b) {
              return this.create(this._DEC_XFORM_MODE, a, b);
            },
            init: function (a, b, c) {
              this.cfg = this.cfg.extend(c);
              this._xformMode = a;
              this._key = b;
              this.reset();
            },
            reset: function () {
              g.reset.call(this);
              this._doReset();
            },
            process: function (a) {
              this._append(a);
              return this._process();
            },
            finalize: function (a) {
              if (a) {
                this._append(a);
              }
              var b = this._doFinalize();
              return b;
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function () {
              function a(a) {
                if (typeof a == "string") {
                  return x;
                } else {
                  return u;
                }
              }
              return function (b) {
                return {
                  encrypt: function (c, d, e) {
                    return a(d).encrypt(b, c, d, e);
                  },
                  decrypt: function (c, d, e) {
                    return a(d).decrypt(b, c, d, e);
                  }
                };
              };
            }()
          });
          d.StreamCipher = l.extend({
            _doFinalize: function () {
              var a = this._process(true);
              return a;
            },
            blockSize: 1
          });
          var m = c.mode = {};
          var n = d.BlockCipherMode = e.extend({
            createEncryptor: function (a, b) {
              return this.Encryptor.create(a, b);
            },
            createDecryptor: function (a, b) {
              return this.Decryptor.create(a, b);
            },
            init: function (a, b) {
              this._cipher = a;
              this._iv = b;
            }
          });
          var o = m.CBC = function () {
            var a = n.extend();
            a.Encryptor = a.extend({
              processBlock: function (a, b) {
                var d = this._cipher;
                var e = d.blockSize;
                c.call(this, a, b, e);
                d.encryptBlock(a, b);
                this._prevBlock = a.slice(b, b + e);
              }
            });
            a.Decryptor = a.extend({
              processBlock: function (a, b) {
                var d = this._cipher;
                var e = d.blockSize;
                var f = a.slice(b, b + e);
                d.decryptBlock(a, b);
                c.call(this, a, b, e);
                this._prevBlock = f;
              }
            });
            function c(a, c, d) {
              var e = this._iv;
              if (e) {
                var f = e;
                this._iv = b;
              } else {
                var f = this._prevBlock;
              }
              for (var g = 0; g < d; g++) {
                a[c + g] ^= f[g];
              }
            }
            return a;
          }();
          var p = c.pad = {};
          var q = p.Pkcs7 = {
            pad: function (a, b) {
              var c = b * 4;
              for (var d = c - a.sigBytes % c, e = d << 24 | d << 16 | d << 8 | d, g = [], h = 0; h < d; h += 4) {
                g.push(e);
              }
              var i = f.create(g, d);
              a.concat(i);
            },
            unpad: function (a) {
              var b = a.words[a.sigBytes - 1 >>> 2] & 255;
              a.sigBytes -= b;
            }
          };
          d.BlockCipher = l.extend({
            cfg: l.cfg.extend({
              mode: o,
              padding: q
            }),
            reset: function () {
              l.reset.call(this);
              var a = this.cfg;
              var b = a.iv;
              var c = a.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                var d = c.createEncryptor;
              } else {
                var d = c.createDecryptor;
                this._minBufferSize = 1;
              }
              if (this._mode && this._mode.__creator == d) {
                this._mode.init(this, b && b.words);
              } else {
                this._mode = d.call(c, this, b && b.words);
                this._mode.__creator = d;
              }
            },
            _doProcessBlock: function (a, b) {
              this._mode.processBlock(a, b);
            },
            _doFinalize: function () {
              var a = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);
                var b = this._process(true);
              } else {
                var b = this._process(true);
                a.unpad(b);
              }
              return b;
            },
            blockSize: 4
          });
          var r = d.CipherParams = e.extend({
            init: function (a) {
              this.mixIn(a);
            },
            toString: function (a) {
              return (a || this.formatter).stringify(this);
            }
          });
          var s = c.format = {};
          var t = s.OpenSSL = {
            stringify: function (a) {
              var b = a.ciphertext;
              var c = a.salt;
              if (c) {
                var d = f.create([1398893684, 1701076831]).concat(c).concat(b);
              } else {
                var d = b;
              }
              return d.toString(i);
            },
            parse: function (a) {
              var b = i.parse(a);
              var c = b.words;
              if (c[0] == 1398893684 && c[1] == 1701076831) {
                var d = f.create(c.slice(2, 4));
                c.splice(0, 4);
                b.sigBytes -= 16;
              }
              return r.create({
                ciphertext: b,
                salt: d
              });
            }
          };
          var u = d.SerializableCipher = e.extend({
            cfg: e.extend({
              format: t
            }),
            encrypt: function (a, b, c, d) {
              d = this.cfg.extend(d);
              var e = a.createEncryptor(c, d);
              var f = e.finalize(b);
              var g = e.cfg;
              return r.create({
                ciphertext: f,
                key: c,
                iv: g.iv,
                algorithm: a,
                mode: g.mode,
                padding: g.padding,
                blockSize: a.blockSize,
                formatter: d.format
              });
            },
            decrypt: function (a, b, c, d) {
              d = this.cfg.extend(d);
              b = this._parse(b, d.format);
              var e = a.createDecryptor(c, d).finalize(b.ciphertext);
              return e;
            },
            _parse: function (a, b) {
              if (typeof a == "string") {
                return b.parse(a, this);
              } else {
                return a;
              }
            }
          });
          var v = c.kdf = {};
          var w = v.OpenSSL = {
            execute: function (a, b, c, d) {
              d ||= f.random(8);
              var e = k.create({
                keySize: b + c
              }).compute(a, d);
              var g = f.create(e.words.slice(b), c * 4);
              e.sigBytes = b * 4;
              return r.create({
                key: e,
                iv: g,
                salt: d
              });
            }
          };
          var x = d.PasswordBasedCipher = u.extend({
            cfg: u.cfg.extend({
              kdf: w
            }),
            encrypt: function (a, b, c, d) {
              d = this.cfg.extend(d);
              var e = d.kdf.execute(c, a.keySize, a.ivSize);
              d.iv = e.iv;
              var f = u.encrypt.call(this, a, b, e.key, d);
              f.mixIn(e);
              return f;
            },
            decrypt: function (a, b, c, d) {
              d = this.cfg.extend(d);
              b = this._parse(b, d.format);
              var e = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
              d.iv = e.iv;
              var f = u.decrypt.call(this, a, b, e.key, d);
              return f;
            }
          });
        })();
      }
    });
  }
});
var Le = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/mode-cfb.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.mode.CFB = function () {
        var b = a.lib.BlockCipherMode.extend();
        b.Encryptor = b.extend({
          processBlock: function (a, b) {
            var d = this._cipher;
            var e = d.blockSize;
            c.call(this, a, b, e, d);
            this._prevBlock = a.slice(b, b + e);
          }
        });
        b.Decryptor = b.extend({
          processBlock: function (a, b) {
            var d = this._cipher;
            var e = d.blockSize;
            var f = a.slice(b, b + e);
            c.call(this, a, b, e, d);
            this._prevBlock = f;
          }
        });
        function c(a, b, c, d) {
          var e = this._iv;
          if (e) {
            var f = e.slice(0);
            this._iv = undefined;
          } else {
            var f = this._prevBlock;
          }
          d.encryptBlock(f, 0);
          for (var g = 0; g < c; g++) {
            a[b + g] ^= f[g];
          }
        }
        return b;
      }();
      return a.mode.CFB;
    });
  }
});
var gm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/mode-ctr.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.mode.CTR = function () {
        var b = a.lib.BlockCipherMode.extend();
        var c = b.Encryptor = b.extend({
          processBlock: function (a, b) {
            var c = this._cipher;
            var d = c.blockSize;
            var e = this._iv;
            var f = this._counter;
            if (e) {
              f = this._counter = e.slice(0);
              this._iv = undefined;
            }
            var g = f.slice(0);
            c.encryptBlock(g, 0);
            f[d - 1] = f[d - 1] + 1 | 0;
            for (var h = 0; h < d; h++) {
              a[b + h] ^= g[h];
            }
          }
        });
        b.Decryptor = c;
        return b;
      }();
      return a.mode.CTR;
    });
  }
});
var hm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/mode-ctr-gladman.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.mode.CTRGladman = function () {
        var b = a.lib.BlockCipherMode.extend();
        function c(a) {
          if ((a >> 24 & 255) === 255) {
            var b = a >> 16 & 255;
            var c = a >> 8 & 255;
            var d = a & 255;
            if (b === 255) {
              b = 0;
              if (c === 255) {
                c = 0;
                if (d === 255) {
                  d = 0;
                } else {
                  ++d;
                }
              } else {
                ++c;
              }
            } else {
              ++b;
            }
            a = 0;
            a += b << 16;
            a += c << 8;
            a += d;
          } else {
            a += 1 << 24;
          }
          return a;
        }
        function d(a) {
          if ((a[0] = c(a[0])) === 0) {
            a[1] = c(a[1]);
          }
          return a;
        }
        var e = b.Encryptor = b.extend({
          processBlock: function (a, b) {
            var c = this._cipher;
            var e = c.blockSize;
            var f = this._iv;
            var g = this._counter;
            if (f) {
              g = this._counter = f.slice(0);
              this._iv = undefined;
            }
            d(g);
            var h = g.slice(0);
            c.encryptBlock(h, 0);
            for (var i = 0; i < e; i++) {
              a[b + i] ^= h[i];
            }
          }
        });
        b.Decryptor = e;
        return b;
      }();
      return a.mode.CTRGladman;
    });
  }
});
var im = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/mode-ofb.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.mode.OFB = function () {
        var b = a.lib.BlockCipherMode.extend();
        var c = b.Encryptor = b.extend({
          processBlock: function (a, b) {
            var c = this._cipher;
            var d = c.blockSize;
            var e = this._iv;
            var f = this._keystream;
            if (e) {
              f = this._keystream = e.slice(0);
              this._iv = undefined;
            }
            c.encryptBlock(f, 0);
            for (var g = 0; g < d; g++) {
              a[b + g] ^= f[g];
            }
          }
        });
        b.Decryptor = c;
        return b;
      }();
      return a.mode.OFB;
    });
  }
});
var jm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/mode-ecb.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.mode.ECB = function () {
        var b = a.lib.BlockCipherMode.extend();
        b.Encryptor = b.extend({
          processBlock: function (a, b) {
            this._cipher.encryptBlock(a, b);
          }
        });
        b.Decryptor = b.extend({
          processBlock: function (a, b) {
            this._cipher.decryptBlock(a, b);
          }
        });
        return b;
      }();
      return a.mode.ECB;
    });
  }
});
var km = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/pad-ansix923.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.pad.AnsiX923 = {
        pad: function (a, b) {
          var c = a.sigBytes;
          var d = b * 4;
          var e = d - c % d;
          var f = c + e - 1;
          a.clamp();
          a.words[f >>> 2] |= e << 24 - f % 4 * 8;
          a.sigBytes += e;
        },
        unpad: function (a) {
          var b = a.words[a.sigBytes - 1 >>> 2] & 255;
          a.sigBytes -= b;
        }
      };
      return a.pad.Ansix923;
    });
  }
});
var lm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/pad-iso10126.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.pad.Iso10126 = {
        pad: function (b, c) {
          var d = c * 4;
          var e = d - b.sigBytes % d;
          b.concat(a.lib.WordArray.random(e - 1)).concat(a.lib.WordArray.create([e << 24], 1));
        },
        unpad: function (a) {
          var b = a.words[a.sigBytes - 1 >>> 2] & 255;
          a.sigBytes -= b;
        }
      };
      return a.pad.Iso10126;
    });
  }
});
var mm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/pad-iso97971.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.pad.Iso97971 = {
        pad: function (b, c) {
          b.concat(a.lib.WordArray.create([2147483648], 1));
          a.pad.ZeroPadding.pad(b, c);
        },
        unpad: function (b) {
          a.pad.ZeroPadding.unpad(b);
          b.sigBytes--;
        }
      };
      return a.pad.Iso97971;
    });
  }
});
var nm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/pad-zeropadding.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.pad.ZeroPadding = {
        pad: function (a, b) {
          var c = b * 4;
          a.clamp();
          a.sigBytes += c - (a.sigBytes % c || c);
        },
        unpad: function (a) {
          for (var b = a.words, c = a.sigBytes - 1; !(b[c >>> 2] >>> 24 - c % 4 * 8 & 255);) {
            c--;
          }
          a.sigBytes = c + 1;
        }
      };
      return a.pad.ZeroPadding;
    });
  }
});
var om = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/pad-nopadding.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      a.pad.NoPadding = {
        pad: function () {},
        unpad: function () {}
      };
      return a.pad.NoPadding;
    });
  }
});
var pm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/format-hex.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function (b) {
        var c = a;
        var d = c.lib;
        var e = d.CipherParams;
        var f = c.enc;
        var g = f.Hex;
        var h = c.format;
        h.Hex = {
          stringify: function (a) {
            return a.ciphertext.toString(g);
          },
          parse: function (a) {
            var b = g.parse(a);
            return e.create({
              ciphertext: b
            });
          }
        };
      })();
      return a.format.Hex;
    });
  }
});
var qm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/aes.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), Xl(), Yl(), em(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.BlockCipher;
        var e = b.algo;
        var f = [];
        var g = [];
        var h = [];
        var i = [];
        var j = [];
        var k = [];
        var l = [];
        var m = [];
        var n = [];
        var o = [];
        (function () {
          var a = [];
          for (var b = 0; b < 256; b++) {
            if (b < 128) {
              a[b] = b << 1;
            } else {
              a[b] = b << 1 ^ 283;
            }
          }
          var c = 0;
          var d = 0;
          for (var b = 0; b < 256; b++) {
            var e = d ^ d << 1 ^ d << 2 ^ d << 3 ^ d << 4;
            e = e >>> 8 ^ e & 255 ^ 99;
            f[c] = e;
            g[e] = c;
            var p = a[c];
            var q = a[p];
            var r = a[q];
            var s = a[e] * 257 ^ e * 16843008;
            h[c] = s << 24 | s >>> 8;
            i[c] = s << 16 | s >>> 16;
            j[c] = s << 8 | s >>> 24;
            k[c] = s;
            var s = r * 16843009 ^ q * 65537 ^ p * 257 ^ c * 16843008;
            l[e] = s << 24 | s >>> 8;
            m[e] = s << 16 | s >>> 16;
            n[e] = s << 8 | s >>> 24;
            o[e] = s;
            if (c) {
              c = p ^ a[a[a[r ^ p]]];
              d ^= a[a[d]];
            } else {
              c = d = 1;
            }
          }
        })();
        var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
        var q = e.AES = d.extend({
          _doReset: function () {
            if (!this._nRounds || this._keyPriorReset !== this._key) {
              var a = this._keyPriorReset = this._key;
              var b = a.words;
              var c = a.sigBytes / 4;
              var d = this._nRounds = c + 6;
              for (var e = (d + 1) * 4, g = this._keySchedule = [], h = 0; h < e; h++) {
                if (h < c) {
                  g[h] = b[h];
                } else {
                  var i = g[h - 1];
                  if (h % c) {
                    if (c > 6 && h % c == 4) {
                      i = f[i >>> 24] << 24 | f[i >>> 16 & 255] << 16 | f[i >>> 8 & 255] << 8 | f[i & 255];
                    }
                  } else {
                    i = i << 8 | i >>> 24;
                    i = f[i >>> 24] << 24 | f[i >>> 16 & 255] << 16 | f[i >>> 8 & 255] << 8 | f[i & 255];
                    i ^= p[h / c | 0] << 24;
                  }
                  g[h] = g[h - c] ^ i;
                }
              }
              var j = this._invKeySchedule = [];
              for (var k = 0; k < e; k++) {
                var h = e - k;
                if (k % 4) {
                  var i = g[h];
                } else {
                  var i = g[h - 4];
                }
                if (k < 4 || h <= 4) {
                  j[k] = i;
                } else {
                  j[k] = l[f[i >>> 24]] ^ m[f[i >>> 16 & 255]] ^ n[f[i >>> 8 & 255]] ^ o[f[i & 255]];
                }
              }
            }
          },
          encryptBlock: function (a, b) {
            this._doCryptBlock(a, b, this._keySchedule, h, i, j, k, f);
          },
          decryptBlock: function (a, b) {
            var c = a[b + 1];
            a[b + 1] = a[b + 3];
            a[b + 3] = c;
            this._doCryptBlock(a, b, this._invKeySchedule, l, m, n, o, g);
            var c = a[b + 1];
            a[b + 1] = a[b + 3];
            a[b + 3] = c;
          },
          _doCryptBlock: function (a, b, c, d, e, f, g, h) {
            for (var i = this._nRounds, j = a[b] ^ c[0], k = a[b + 1] ^ c[1], l = a[b + 2] ^ c[2], m = a[b + 3] ^ c[3], n = 4, o = 1; o < i; o++) {
              var p = d[j >>> 24] ^ e[k >>> 16 & 255] ^ f[l >>> 8 & 255] ^ g[m & 255] ^ c[n++];
              var q = d[k >>> 24] ^ e[l >>> 16 & 255] ^ f[m >>> 8 & 255] ^ g[j & 255] ^ c[n++];
              var r = d[l >>> 24] ^ e[m >>> 16 & 255] ^ f[j >>> 8 & 255] ^ g[k & 255] ^ c[n++];
              var s = d[m >>> 24] ^ e[j >>> 16 & 255] ^ f[k >>> 8 & 255] ^ g[l & 255] ^ c[n++];
              j = p;
              k = q;
              l = r;
              m = s;
            }
            var p = (h[j >>> 24] << 24 | h[k >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[m & 255]) ^ c[n++];
            var q = (h[k >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[m >>> 8 & 255] << 8 | h[j & 255]) ^ c[n++];
            var r = (h[l >>> 24] << 24 | h[m >>> 16 & 255] << 16 | h[j >>> 8 & 255] << 8 | h[k & 255]) ^ c[n++];
            var s = (h[m >>> 24] << 24 | h[j >>> 16 & 255] << 16 | h[k >>> 8 & 255] << 8 | h[l & 255]) ^ c[n++];
            a[b] = p;
            a[b + 1] = q;
            a[b + 2] = r;
            a[b + 3] = s;
          },
          keySize: 8
        });
        b.AES = d._createHelper(q);
      })();
      return a.AES;
    });
  }
});
var rm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/tripledes.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), Xl(), Yl(), em(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.WordArray;
        var e = c.BlockCipher;
        var f = b.algo;
        var g = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
        var h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
        var i = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
        var j = [{
          0: 8421888,
          268435456: 32768,
          536870912: 8421378,
          805306368: 2,
          1073741824: 512,
          1342177280: 8421890,
          1610612736: 8389122,
          1879048192: 8388608,
          2147483648: 514,
          2415919104: 8389120,
          2684354560: 33280,
          2952790016: 8421376,
          3221225472: 32770,
          3489660928: 8388610,
          3758096384: 0,
          4026531840: 33282,
          134217728: 0,
          402653184: 8421890,
          671088640: 33282,
          939524096: 32768,
          1207959552: 8421888,
          1476395008: 512,
          1744830464: 8421378,
          2013265920: 2,
          2281701376: 8389120,
          2550136832: 33280,
          2818572288: 8421376,
          3087007744: 8389122,
          3355443200: 8388610,
          3623878656: 32770,
          3892314112: 514,
          4160749568: 8388608,
          1: 32768,
          268435457: 2,
          536870913: 8421888,
          805306369: 8388608,
          1073741825: 8421378,
          1342177281: 33280,
          1610612737: 512,
          1879048193: 8389122,
          2147483649: 8421890,
          2415919105: 8421376,
          2684354561: 8388610,
          2952790017: 33282,
          3221225473: 514,
          3489660929: 8389120,
          3758096385: 32770,
          4026531841: 0,
          134217729: 8421890,
          402653185: 8421376,
          671088641: 8388608,
          939524097: 512,
          1207959553: 32768,
          1476395009: 8388610,
          1744830465: 2,
          2013265921: 33282,
          2281701377: 32770,
          2550136833: 8389122,
          2818572289: 514,
          3087007745: 8421888,
          3355443201: 8389120,
          3623878657: 0,
          3892314113: 33280,
          4160749569: 8421378
        }, {
          0: 1074282512,
          16777216: 16384,
          33554432: 524288,
          50331648: 1074266128,
          67108864: 1073741840,
          83886080: 1074282496,
          100663296: 1073758208,
          117440512: 16,
          134217728: 540672,
          150994944: 1073758224,
          167772160: 1073741824,
          184549376: 540688,
          201326592: 524304,
          218103808: 0,
          234881024: 16400,
          251658240: 1074266112,
          8388608: 1073758208,
          25165824: 540688,
          41943040: 16,
          58720256: 1073758224,
          75497472: 1074282512,
          92274688: 1073741824,
          109051904: 524288,
          125829120: 1074266128,
          142606336: 524304,
          159383552: 0,
          176160768: 16384,
          192937984: 1074266112,
          209715200: 1073741840,
          226492416: 540672,
          243269632: 1074282496,
          260046848: 16400,
          268435456: 0,
          285212672: 1074266128,
          301989888: 1073758224,
          318767104: 1074282496,
          335544320: 1074266112,
          352321536: 16,
          369098752: 540688,
          385875968: 16384,
          402653184: 16400,
          419430400: 524288,
          436207616: 524304,
          452984832: 1073741840,
          469762048: 540672,
          486539264: 1073758208,
          503316480: 1073741824,
          520093696: 1074282512,
          276824064: 540688,
          293601280: 524288,
          310378496: 1074266112,
          327155712: 16384,
          343932928: 1073758208,
          360710144: 1074282512,
          377487360: 16,
          394264576: 1073741824,
          411041792: 1074282496,
          427819008: 1073741840,
          444596224: 1073758224,
          461373440: 524304,
          478150656: 0,
          494927872: 16400,
          511705088: 1074266128,
          528482304: 540672
        }, {
          0: 260,
          1048576: 0,
          2097152: 67109120,
          3145728: 65796,
          4194304: 65540,
          5242880: 67108868,
          6291456: 67174660,
          7340032: 67174400,
          8388608: 67108864,
          9437184: 67174656,
          10485760: 65792,
          11534336: 67174404,
          12582912: 67109124,
          13631488: 65536,
          14680064: 4,
          15728640: 256,
          524288: 67174656,
          1572864: 67174404,
          2621440: 0,
          3670016: 67109120,
          4718592: 67108868,
          5767168: 65536,
          6815744: 65540,
          7864320: 260,
          8912896: 4,
          9961472: 256,
          11010048: 67174400,
          12058624: 65796,
          13107200: 65792,
          14155776: 67109124,
          15204352: 67174660,
          16252928: 67108864,
          16777216: 67174656,
          17825792: 65540,
          18874368: 65536,
          19922944: 67109120,
          20971520: 256,
          22020096: 67174660,
          23068672: 67108868,
          24117248: 0,
          25165824: 67109124,
          26214400: 67108864,
          27262976: 4,
          28311552: 65792,
          29360128: 67174400,
          30408704: 260,
          31457280: 65796,
          32505856: 67174404,
          17301504: 67108864,
          18350080: 260,
          19398656: 67174656,
          20447232: 0,
          21495808: 65540,
          22544384: 67109120,
          23592960: 256,
          24641536: 67174404,
          25690112: 65536,
          26738688: 67174660,
          27787264: 65796,
          28835840: 67108868,
          29884416: 67109124,
          30932992: 67174400,
          31981568: 4,
          33030144: 65792
        }, {
          0: 2151682048,
          65536: 2147487808,
          131072: 4198464,
          196608: 2151677952,
          262144: 0,
          327680: 4198400,
          393216: 2147483712,
          458752: 4194368,
          524288: 2147483648,
          589824: 4194304,
          655360: 64,
          720896: 2147487744,
          786432: 2151678016,
          851968: 4160,
          917504: 4096,
          983040: 2151682112,
          32768: 2147487808,
          98304: 64,
          163840: 2151678016,
          229376: 2147487744,
          294912: 4198400,
          360448: 2151682112,
          425984: 0,
          491520: 2151677952,
          557056: 4096,
          622592: 2151682048,
          688128: 4194304,
          753664: 4160,
          819200: 2147483648,
          884736: 4194368,
          950272: 4198464,
          1015808: 2147483712,
          1048576: 4194368,
          1114112: 4198400,
          1179648: 2147483712,
          1245184: 0,
          1310720: 4160,
          1376256: 2151678016,
          1441792: 2151682048,
          1507328: 2147487808,
          1572864: 2151682112,
          1638400: 2147483648,
          1703936: 2151677952,
          1769472: 4198464,
          1835008: 2147487744,
          1900544: 4194304,
          1966080: 64,
          2031616: 4096,
          1081344: 2151677952,
          1146880: 2151682112,
          1212416: 0,
          1277952: 4198400,
          1343488: 4194368,
          1409024: 2147483648,
          1474560: 2147487808,
          1540096: 64,
          1605632: 2147483712,
          1671168: 4096,
          1736704: 2147487744,
          1802240: 2151678016,
          1867776: 4160,
          1933312: 2151682048,
          1998848: 4194304,
          2064384: 4198464
        }, {
          0: 128,
          4096: 17039360,
          8192: 262144,
          12288: 536870912,
          16384: 537133184,
          20480: 16777344,
          24576: 553648256,
          28672: 262272,
          32768: 16777216,
          36864: 537133056,
          40960: 536871040,
          45056: 553910400,
          49152: 553910272,
          53248: 0,
          57344: 17039488,
          61440: 553648128,
          2048: 17039488,
          6144: 553648256,
          10240: 128,
          14336: 17039360,
          18432: 262144,
          22528: 537133184,
          26624: 553910272,
          30720: 536870912,
          34816: 537133056,
          38912: 0,
          43008: 553910400,
          47104: 16777344,
          51200: 536871040,
          55296: 553648128,
          59392: 16777216,
          63488: 262272,
          65536: 262144,
          69632: 128,
          73728: 536870912,
          77824: 553648256,
          81920: 16777344,
          86016: 553910272,
          90112: 537133184,
          94208: 16777216,
          98304: 553910400,
          102400: 553648128,
          106496: 17039360,
          110592: 537133056,
          114688: 262272,
          118784: 536871040,
          122880: 0,
          126976: 17039488,
          67584: 553648256,
          71680: 16777216,
          75776: 17039360,
          79872: 537133184,
          83968: 536870912,
          88064: 17039488,
          92160: 128,
          96256: 553910272,
          100352: 262272,
          104448: 553910400,
          108544: 0,
          112640: 553648128,
          116736: 16777344,
          120832: 262144,
          124928: 537133056,
          129024: 536871040
        }, {
          0: 268435464,
          256: 8192,
          512: 270532608,
          768: 270540808,
          1024: 268443648,
          1280: 2097152,
          1536: 2097160,
          1792: 268435456,
          2048: 0,
          2304: 268443656,
          2560: 2105344,
          2816: 8,
          3072: 270532616,
          3328: 2105352,
          3584: 8200,
          3840: 270540800,
          128: 270532608,
          384: 270540808,
          640: 8,
          896: 2097152,
          1152: 2105352,
          1408: 268435464,
          1664: 268443648,
          1920: 8200,
          2176: 2097160,
          2432: 8192,
          2688: 268443656,
          2944: 270532616,
          3200: 0,
          3456: 270540800,
          3712: 2105344,
          3968: 268435456,
          4096: 268443648,
          4352: 270532616,
          4608: 270540808,
          4864: 8200,
          5120: 2097152,
          5376: 268435456,
          5632: 268435464,
          5888: 2105344,
          6144: 2105352,
          6400: 0,
          6656: 8,
          6912: 270532608,
          7168: 8192,
          7424: 268443656,
          7680: 270540800,
          7936: 2097160,
          4224: 8,
          4480: 2105344,
          4736: 2097152,
          4992: 268435464,
          5248: 268443648,
          5504: 8200,
          5760: 270540808,
          6016: 270532608,
          6272: 270540800,
          6528: 270532616,
          6784: 8192,
          7040: 2105352,
          7296: 2097160,
          7552: 0,
          7808: 268435456,
          8064: 268443656
        }, {
          0: 1048576,
          16: 33555457,
          32: 1024,
          48: 1049601,
          64: 34604033,
          80: 0,
          96: 1,
          112: 34603009,
          128: 33555456,
          144: 1048577,
          160: 33554433,
          176: 34604032,
          192: 34603008,
          208: 1025,
          224: 1049600,
          240: 33554432,
          8: 34603009,
          24: 0,
          40: 33555457,
          56: 34604032,
          72: 1048576,
          88: 33554433,
          104: 33554432,
          120: 1025,
          136: 1049601,
          152: 33555456,
          168: 34603008,
          184: 1048577,
          200: 1024,
          216: 34604033,
          232: 1,
          248: 1049600,
          256: 33554432,
          272: 1048576,
          288: 33555457,
          304: 34603009,
          320: 1048577,
          336: 33555456,
          352: 34604032,
          368: 1049601,
          384: 1025,
          400: 34604033,
          416: 1049600,
          432: 1,
          448: 0,
          464: 34603008,
          480: 33554433,
          496: 1024,
          264: 1049600,
          280: 33555457,
          296: 34603009,
          312: 1,
          328: 33554432,
          344: 1048576,
          360: 1025,
          376: 34604032,
          392: 33554433,
          408: 34603008,
          424: 0,
          440: 34604033,
          456: 1049601,
          472: 1024,
          488: 33555456,
          504: 1048577
        }, {
          0: 134219808,
          1: 131072,
          2: 134217728,
          3: 32,
          4: 131104,
          5: 134350880,
          6: 134350848,
          7: 2048,
          8: 134348800,
          9: 134219776,
          10: 133120,
          11: 134348832,
          12: 2080,
          13: 0,
          14: 134217760,
          15: 133152,
          2147483648: 2048,
          2147483649: 134350880,
          2147483650: 134219808,
          2147483651: 134217728,
          2147483652: 134348800,
          2147483653: 133120,
          2147483654: 133152,
          2147483655: 32,
          2147483656: 134217760,
          2147483657: 2080,
          2147483658: 131104,
          2147483659: 134350848,
          2147483660: 0,
          2147483661: 134348832,
          2147483662: 134219776,
          2147483663: 131072,
          16: 133152,
          17: 134350848,
          18: 32,
          19: 2048,
          20: 134219776,
          21: 134217760,
          22: 134348832,
          23: 131072,
          24: 0,
          25: 131104,
          26: 134348800,
          27: 134219808,
          28: 134350880,
          29: 133120,
          30: 2080,
          31: 134217728,
          2147483664: 131072,
          2147483665: 2048,
          2147483666: 134348832,
          2147483667: 133152,
          2147483668: 32,
          2147483669: 134348800,
          2147483670: 134217728,
          2147483671: 134219808,
          2147483672: 134350880,
          2147483673: 134217760,
          2147483674: 134219776,
          2147483675: 0,
          2147483676: 133120,
          2147483677: 2080,
          2147483678: 131104,
          2147483679: 134350848
        }];
        var k = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679];
        var l = f.DES = e.extend({
          _doReset: function () {
            var a = this._key;
            var b = a.words;
            var c = [];
            for (var d = 0; d < 56; d++) {
              var e = g[d] - 1;
              c[d] = b[e >>> 5] >>> 31 - e % 32 & 1;
            }
            var f = this._subKeys = [];
            for (var j = 0; j < 16; j++) {
              var k = f[j] = [];
              var l = i[j];
              for (var d = 0; d < 24; d++) {
                k[d / 6 | 0] |= c[(h[d] - 1 + l) % 28] << 31 - d % 6;
                k[4 + (d / 6 | 0)] |= c[28 + (h[d + 24] - 1 + l) % 28] << 31 - d % 6;
              }
              k[0] = k[0] << 1 | k[0] >>> 31;
              for (var d = 1; d < 7; d++) {
                k[d] = k[d] >>> (d - 1) * 4 + 3;
              }
              k[7] = k[7] << 5 | k[7] >>> 27;
            }
            var m = this._invSubKeys = [];
            for (var d = 0; d < 16; d++) {
              m[d] = f[15 - d];
            }
          },
          encryptBlock: function (a, b) {
            this._doCryptBlock(a, b, this._subKeys);
          },
          decryptBlock: function (a, b) {
            this._doCryptBlock(a, b, this._invSubKeys);
          },
          _doCryptBlock: function (a, b, c) {
            this._lBlock = a[b];
            this._rBlock = a[b + 1];
            m.call(this, 4, 252645135);
            m.call(this, 16, 65535);
            n.call(this, 2, 858993459);
            n.call(this, 8, 16711935);
            m.call(this, 1, 1431655765);
            for (var d = 0; d < 16; d++) {
              var e = c[d];
              var f = this._lBlock;
              var g = this._rBlock;
              var h = 0;
              for (var i = 0; i < 8; i++) {
                h |= j[i][((g ^ e[i]) & k[i]) >>> 0];
              }
              this._lBlock = g;
              this._rBlock = f ^ h;
            }
            var l = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = l;
            m.call(this, 1, 1431655765);
            n.call(this, 8, 16711935);
            n.call(this, 2, 858993459);
            m.call(this, 16, 65535);
            m.call(this, 4, 252645135);
            a[b] = this._lBlock;
            a[b + 1] = this._rBlock;
          },
          keySize: 2,
          ivSize: 2,
          blockSize: 2
        });
        function m(a, b) {
          var c = (this._lBlock >>> a ^ this._rBlock) & b;
          this._rBlock ^= c;
          this._lBlock ^= c << a;
        }
        function n(a, b) {
          var c = (this._rBlock >>> a ^ this._lBlock) & b;
          this._lBlock ^= c;
          this._rBlock ^= c << a;
        }
        b.DES = e._createHelper(l);
        var o = f.TripleDES = e.extend({
          _doReset: function () {
            var a = this._key;
            var b = a.words;
            this._des1 = l.createEncryptor(d.create(b.slice(0, 2)));
            this._des2 = l.createEncryptor(d.create(b.slice(2, 4)));
            this._des3 = l.createEncryptor(d.create(b.slice(4, 6)));
          },
          encryptBlock: function (a, b) {
            this._des1.encryptBlock(a, b);
            this._des2.decryptBlock(a, b);
            this._des3.encryptBlock(a, b);
          },
          decryptBlock: function (a, b) {
            this._des3.decryptBlock(a, b);
            this._des2.encryptBlock(a, b);
            this._des1.decryptBlock(a, b);
          },
          keySize: 6,
          ivSize: 2,
          blockSize: 2
        });
        b.TripleDES = e._createHelper(o);
      })();
      return a.TripleDES;
    });
  }
});
var sm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/rc4.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), Xl(), Yl(), em(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.StreamCipher;
        var e = b.algo;
        var f = e.RC4 = d.extend({
          _doReset: function () {
            var a = this._key;
            var b = a.words;
            var c = a.sigBytes;
            var d = this._S = [];
            for (var e = 0; e < 256; e++) {
              d[e] = e;
            }
            for (var e = 0, f = 0; e < 256; e++) {
              var g = e % c;
              var h = b[g >>> 2] >>> 24 - g % 4 * 8 & 255;
              f = (f + d[e] + h) % 256;
              var i = d[e];
              d[e] = d[f];
              d[f] = i;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function (a, b) {
            a[b] ^= g.call(this);
          },
          keySize: 8,
          ivSize: 0
        });
        function g() {
          var a = this._S;
          var b = this._i;
          var c = this._j;
          var d = 0;
          for (var e = 0; e < 4; e++) {
            b = (b + 1) % 256;
            c = (c + a[b]) % 256;
            var f = a[b];
            a[b] = a[c];
            a[c] = f;
            d |= a[(a[b] + a[c]) % 256] << 24 - e * 8;
          }
          this._i = b;
          this._j = c;
          return d;
        }
        b.RC4 = d._createHelper(f);
        var h = e.RC4Drop = f.extend({
          cfg: f.cfg.extend({
            drop: 192
          }),
          _doReset: function () {
            f._doReset.call(this);
            for (var a = this.cfg.drop; a > 0; a--) {
              g.call(this);
            }
          }
        });
        b.RC4Drop = d._createHelper(h);
      })();
      return a.RC4;
    });
  }
});
var tm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/rabbit.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), Xl(), Yl(), em(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.StreamCipher;
        var e = b.algo;
        var f = [];
        var g = [];
        var h = [];
        var i = e.Rabbit = d.extend({
          _doReset: function () {
            var a = this._key.words;
            var b = this.cfg.iv;
            for (var c = 0; c < 4; c++) {
              a[c] = (a[c] << 8 | a[c] >>> 24) & 16711935 | (a[c] << 24 | a[c] >>> 8) & 4278255360;
            }
            var d = this._X = [a[0], a[3] << 16 | a[2] >>> 16, a[1], a[0] << 16 | a[3] >>> 16, a[2], a[1] << 16 | a[0] >>> 16, a[3], a[2] << 16 | a[1] >>> 16];
            var e = this._C = [a[2] << 16 | a[2] >>> 16, a[0] & 4294901760 | a[1] & 65535, a[3] << 16 | a[3] >>> 16, a[1] & 4294901760 | a[2] & 65535, a[0] << 16 | a[0] >>> 16, a[2] & 4294901760 | a[3] & 65535, a[1] << 16 | a[1] >>> 16, a[3] & 4294901760 | a[0] & 65535];
            this._b = 0;
            for (var c = 0; c < 4; c++) {
              j.call(this);
            }
            for (var c = 0; c < 8; c++) {
              e[c] ^= d[c + 4 & 7];
            }
            if (b) {
              var f = b.words;
              var g = f[0];
              var h = f[1];
              var i = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
              var k = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
              var l = i >>> 16 | k & 4294901760;
              var m = k << 16 | i & 65535;
              e[0] ^= i;
              e[1] ^= l;
              e[2] ^= k;
              e[3] ^= m;
              e[4] ^= i;
              e[5] ^= l;
              e[6] ^= k;
              e[7] ^= m;
              for (var c = 0; c < 4; c++) {
                j.call(this);
              }
            }
          },
          _doProcessBlock: function (a, b) {
            var c = this._X;
            j.call(this);
            f[0] = c[0] ^ c[5] >>> 16 ^ c[3] << 16;
            f[1] = c[2] ^ c[7] >>> 16 ^ c[5] << 16;
            f[2] = c[4] ^ c[1] >>> 16 ^ c[7] << 16;
            f[3] = c[6] ^ c[3] >>> 16 ^ c[1] << 16;
            for (var d = 0; d < 4; d++) {
              f[d] = (f[d] << 8 | f[d] >>> 24) & 16711935 | (f[d] << 24 | f[d] >>> 8) & 4278255360;
              a[b + d] ^= f[d];
            }
          },
          blockSize: 4,
          ivSize: 2
        });
        function j() {
          var a = this._X;
          var b = this._C;
          for (var c = 0; c < 8; c++) {
            g[c] = b[c];
          }
          b[0] = b[0] + 1295307597 + this._b | 0;
          b[1] = b[1] + 3545052371 + (b[0] >>> 0 < g[0] >>> 0 ? 1 : 0) | 0;
          b[2] = b[2] + 886263092 + (b[1] >>> 0 < g[1] >>> 0 ? 1 : 0) | 0;
          b[3] = b[3] + 1295307597 + (b[2] >>> 0 < g[2] >>> 0 ? 1 : 0) | 0;
          b[4] = b[4] + 3545052371 + (b[3] >>> 0 < g[3] >>> 0 ? 1 : 0) | 0;
          b[5] = b[5] + 886263092 + (b[4] >>> 0 < g[4] >>> 0 ? 1 : 0) | 0;
          b[6] = b[6] + 1295307597 + (b[5] >>> 0 < g[5] >>> 0 ? 1 : 0) | 0;
          b[7] = b[7] + 3545052371 + (b[6] >>> 0 < g[6] >>> 0 ? 1 : 0) | 0;
          this._b = b[7] >>> 0 < g[7] >>> 0 ? 1 : 0;
          for (var c = 0; c < 8; c++) {
            var d = a[c] + b[c];
            var e = d & 65535;
            var f = d >>> 16;
            var i = ((e * e >>> 17) + e * f >>> 15) + f * f;
            var j = ((d & 4294901760) * d | 0) + ((d & 65535) * d | 0);
            h[c] = i ^ j;
          }
          a[0] = h[0] + (h[7] << 16 | h[7] >>> 16) + (h[6] << 16 | h[6] >>> 16) | 0;
          a[1] = h[1] + (h[0] << 8 | h[0] >>> 24) + h[7] | 0;
          a[2] = h[2] + (h[1] << 16 | h[1] >>> 16) + (h[0] << 16 | h[0] >>> 16) | 0;
          a[3] = h[3] + (h[2] << 8 | h[2] >>> 24) + h[1] | 0;
          a[4] = h[4] + (h[3] << 16 | h[3] >>> 16) + (h[2] << 16 | h[2] >>> 16) | 0;
          a[5] = h[5] + (h[4] << 8 | h[4] >>> 24) + h[3] | 0;
          a[6] = h[6] + (h[5] << 16 | h[5] >>> 16) + (h[4] << 16 | h[4] >>> 16) | 0;
          a[7] = h[7] + (h[6] << 8 | h[6] >>> 24) + h[5] | 0;
        }
        b.Rabbit = d._createHelper(i);
      })();
      return a.Rabbit;
    });
  }
});
var um = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/rabbit-legacy.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), Xl(), Yl(), em(), fm());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], d);
      } else {
        d(c.CryptoJS);
      }
    })(a, function (a) {
      (function () {
        var b = a;
        var c = b.lib;
        var d = c.StreamCipher;
        var e = b.algo;
        var f = [];
        var g = [];
        var h = [];
        var i = e.RabbitLegacy = d.extend({
          _doReset: function () {
            var a = this._key.words;
            var b = this.cfg.iv;
            var c = this._X = [a[0], a[3] << 16 | a[2] >>> 16, a[1], a[0] << 16 | a[3] >>> 16, a[2], a[1] << 16 | a[0] >>> 16, a[3], a[2] << 16 | a[1] >>> 16];
            var d = this._C = [a[2] << 16 | a[2] >>> 16, a[0] & 4294901760 | a[1] & 65535, a[3] << 16 | a[3] >>> 16, a[1] & 4294901760 | a[2] & 65535, a[0] << 16 | a[0] >>> 16, a[2] & 4294901760 | a[3] & 65535, a[1] << 16 | a[1] >>> 16, a[3] & 4294901760 | a[0] & 65535];
            this._b = 0;
            for (var e = 0; e < 4; e++) {
              j.call(this);
            }
            for (var e = 0; e < 8; e++) {
              d[e] ^= c[e + 4 & 7];
            }
            if (b) {
              var f = b.words;
              var g = f[0];
              var h = f[1];
              var i = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
              var k = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
              var l = i >>> 16 | k & 4294901760;
              var m = k << 16 | i & 65535;
              d[0] ^= i;
              d[1] ^= l;
              d[2] ^= k;
              d[3] ^= m;
              d[4] ^= i;
              d[5] ^= l;
              d[6] ^= k;
              d[7] ^= m;
              for (var e = 0; e < 4; e++) {
                j.call(this);
              }
            }
          },
          _doProcessBlock: function (a, b) {
            var c = this._X;
            j.call(this);
            f[0] = c[0] ^ c[5] >>> 16 ^ c[3] << 16;
            f[1] = c[2] ^ c[7] >>> 16 ^ c[5] << 16;
            f[2] = c[4] ^ c[1] >>> 16 ^ c[7] << 16;
            f[3] = c[6] ^ c[3] >>> 16 ^ c[1] << 16;
            for (var d = 0; d < 4; d++) {
              f[d] = (f[d] << 8 | f[d] >>> 24) & 16711935 | (f[d] << 24 | f[d] >>> 8) & 4278255360;
              a[b + d] ^= f[d];
            }
          },
          blockSize: 4,
          ivSize: 2
        });
        function j() {
          var a = this._X;
          var b = this._C;
          for (var c = 0; c < 8; c++) {
            g[c] = b[c];
          }
          b[0] = b[0] + 1295307597 + this._b | 0;
          b[1] = b[1] + 3545052371 + (b[0] >>> 0 < g[0] >>> 0 ? 1 : 0) | 0;
          b[2] = b[2] + 886263092 + (b[1] >>> 0 < g[1] >>> 0 ? 1 : 0) | 0;
          b[3] = b[3] + 1295307597 + (b[2] >>> 0 < g[2] >>> 0 ? 1 : 0) | 0;
          b[4] = b[4] + 3545052371 + (b[3] >>> 0 < g[3] >>> 0 ? 1 : 0) | 0;
          b[5] = b[5] + 886263092 + (b[4] >>> 0 < g[4] >>> 0 ? 1 : 0) | 0;
          b[6] = b[6] + 1295307597 + (b[5] >>> 0 < g[5] >>> 0 ? 1 : 0) | 0;
          b[7] = b[7] + 3545052371 + (b[6] >>> 0 < g[6] >>> 0 ? 1 : 0) | 0;
          this._b = b[7] >>> 0 < g[7] >>> 0 ? 1 : 0;
          for (var c = 0; c < 8; c++) {
            var d = a[c] + b[c];
            var e = d & 65535;
            var f = d >>> 16;
            var i = ((e * e >>> 17) + e * f >>> 15) + f * f;
            var j = ((d & 4294901760) * d | 0) + ((d & 65535) * d | 0);
            h[c] = i ^ j;
          }
          a[0] = h[0] + (h[7] << 16 | h[7] >>> 16) + (h[6] << 16 | h[6] >>> 16) | 0;
          a[1] = h[1] + (h[0] << 8 | h[0] >>> 24) + h[7] | 0;
          a[2] = h[2] + (h[1] << 16 | h[1] >>> 16) + (h[0] << 16 | h[0] >>> 16) | 0;
          a[3] = h[3] + (h[2] << 8 | h[2] >>> 24) + h[1] | 0;
          a[4] = h[4] + (h[3] << 16 | h[3] >>> 16) + (h[2] << 16 | h[2] >>> 16) | 0;
          a[5] = h[5] + (h[4] << 8 | h[4] >>> 24) + h[3] | 0;
          a[6] = h[6] + (h[5] << 16 | h[5] >>> 16) + (h[4] << 16 | h[4] >>> 16) | 0;
          a[7] = h[7] + (h[6] << 8 | h[6] >>> 24) + h[5] | 0;
        }
        b.RabbitLegacy = d._createHelper(i);
      })();
      return a.RabbitLegacy;
    });
  }
});
var vm = Kh({
  "../../node_modules/.pnpm/crypto-js@3.1.9-1/node_modules/crypto-js/index.js"(a, b) {
    (function (c, d, e) {
      if (typeof a == "object") {
        b.exports = a = d(ie(), ke(), ba(), Qh(), Xl(), Yl(), Zl(), $l(), uc(), _l(), dc(), am(), bm(), cm(), dm(), em(), fm(), Le(), gm(), hm(), im(), jm(), km(), lm(), mm(), nm(), om(), pm(), qm(), rm(), sm(), tm(), um());
      } else if (typeof define == "function" && define.amd) {
        define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy"], d);
      } else {
        c.CryptoJS = d(c.CryptoJS);
      }
    })(a, function (a) {
      return a;
    });
  }
});
var wm;
var sa;
var oa;
var la;
var xm;
var ym = class {
  constructor(a, b) {
    z(this, la);
    z(this, wm, undefined);
    z(this, sa, undefined);
    z(this, oa, undefined);
    Q(this, wm, a);
    Q(this, sa, b);
    Q(this, oa, typeof GetParentResourceName != "function");
  }
  async get(a, b, c = undefined) {
    if (c === undefined) c = {};
    return Wl(this, la, xm).call(this, a, "GET", undefined, b, c);
  }
  async post(a, b = undefined, c, d = undefined) {
    if (b === undefined) b = {};
    if (d === undefined) d = {};
    return Wl(this, la, xm).call(this, a, "POST", b, c, d);
  }
  async delete(a, b = undefined, c, d = undefined) {
    if (b === undefined) b = {};
    if (d === undefined) d = {};
    return Wl(this, la, xm).call(this, a, "DELETE", b, c, d);
  }
  async patch(a, b = undefined, c, d = undefined) {
    if (b === undefined) b = {};
    if (d === undefined) d = {};
    return Wl(this, la, xm).call(this, a, "PUT", b, c, d);
  }
  async put(a, b = undefined, c, d = undefined) {
    if (b === undefined) b = {};
    if (d === undefined) d = {};
    return Wl(this, la, xm).call(this, a, "PUT", b, c, d);
  }
};
wm = new WeakMap();
sa = new WeakMap();
oa = new WeakMap();
la = new WeakSet();
xm = async function (a, b, c, d, e = undefined) {
  if (e === undefined) e = {};
  if (Vl(this, oa)) {
    if (e.delay) {
      await new Promise(a => setTimeout(a, e.delay));
    }
    return [true, {
      status: 200,
      data: e.mockupData ?? null
    }];
  }
  try {
    const e = await fetch("" + Vl(this, wm) + a, {
      ...d,
      method: b,
      body: c ? JSON.stringify(c) : undefined,
      headers: {
        ...Vl(this, sa),
        ...(d?.headers || {})
      }
    });
    const f = await e.json();
    return [true, {
      status: e.status,
      data: f
    }];
  } catch (a) {
    return [false, {
      code: a.code,
      message: a.message
    }];
  }
};
var zm;
var Am = Yh(vm());
var Bm = (a = 128) => Am.lib.WordArray.random(a / 8).toString();
var Cm = (a, b) => typeof a != "string" || typeof b != "string" ? "" : Am.AES.encrypt(a, b).toString();
var Dm = (a, b) => typeof a != "string" || typeof b != "string" ? "" : Am.AES.decrypt(a, b).toString(Am.enc.Utf8);
var Em = a => typeof a != "string" ? "" : Am.enc.Base64.stringify(Am.enc.Utf8.parse(a));
var Fm = a => typeof a != "string" ? "" : Am.enc.Utf8.stringify(Am.enc.Base64.parse(a));
var Gm = (a, b) => Em((0, Am.HmacMD5)(a, b).toString());
var Hm = {};
var Ha = (a, b = undefined) => {
  if (b === undefined) b = Bm();
  if (Hm[a] === undefined) {
    Hm[a] = Gm(a, b);
  }
  return Hm[a];
};
var hc = (a, b = undefined) => {
  if (b === undefined) b = Bm();
  try {
    return Cm(JSON.stringify(a), b);
  } catch {
    console.error("Failed to encode payload");
  }
};
var vc = (a, b = undefined) => {
  if (b === undefined) b = Bm();
  try {
    return JSON.parse(Dm(a, b));
  } catch {
    console.error("Failed to decode payload");
  }
};
var Im = {
  warning: (a, ...b) => {
    console.log("[WARNING] " + a, ...b);
  },
  log: (a, ...b) => {},
  debug: (a, ...b) => {},
  error: (a, ...b) => {}
};
var Jm;
var Km;
var Lm;
var fi;
var ca;
var Mm;
var Nm;
var Ii;
var Om;
var Pm;
var Qm;
var fa;
var Rm;
var Sm;
var ua;
var da;
var Tm;
var Um;
var ei;
var Vm;
var _c = class {
  constructor() {
    z(this, Qm);
    z(this, Rm);
    z(this, ua);
    z(this, Tm);
    z(this, ei);
    z(this, Jm, undefined);
    z(this, Km, undefined);
    z(this, Lm, undefined);
    z(this, fi, undefined);
    z(this, ca, undefined);
    z(this, Mm, undefined);
    z(this, Nm, undefined);
    z(this, Ii, undefined);
    z(this, Om, undefined);
    z(this, Pm, undefined);
    Q(this, Km, typeof GetParentResourceName != "function");
    Q(this, Jm, Vl(this, Km) ? window.crypto.randomUUID() : GetParentResourceName());
    Q(this, Mm, false);
    Q(this, Nm, 0);
    Q(this, Ii, []);
    Q(this, Om, new Map());
    Q(this, Pm, new Map());
    Wl(this, ua, da).call(this, "__npx_sdk:init");
    Wl(this, Qm, fa).call(this, "__npx_sdk:ready", Wl(this, ei, Vm).bind(this));
    window.addEventListener("message", async ({
      data: a
    }) => {
      const {
        event: b,
        args: c
      } = a;
      if (!b) {
        return;
      }
      const d = Vl(this, Om).get(b);
      if (d) {
        d(...c);
      }
    });
  }
  async register(a, b) {
    Wl(this, Rm, Sm).call(this, "__nui_req:" + a, async (c, d) => {
      let e;
      let f;
      const g = vc(c, Vl(this, fi));
      if (!g?.id || !g?.resource) {
        return Im.error("[NUI] " + a + " - Invalid metadata received");
      }
      try {
        e = await b(...d);
        f = true;
      } catch (a) {
        e = a.message;
        f = false;
      }
      Wl(this, Tm, Um).call(this, "__nui_res:" + g.resource, g.id, [f, e]);
    });
  }
  async execute(a, ...b) {
    const c = {
      id: ++oe(this, Nm)._,
      resource: Vl(this, Jm)
    };
    const d = b[b.length - 1];
    const e = typeof d == "object" && d?.mockupData;
    if (!Vl(this, Km) && e) {
      b.splice(b.length - 1, 1);
    } else if (Vl(this, Km) && e) {
      const a = d.delay ?? 0;
      if (a > 0) {
        await new Promise(b => setTimeout(b, a));
      }
      return d.mockupData ?? null;
    }
    const f = new Promise((b, d) => {
      let e;
      if (Vl(this, Mm)) {
        e = +setTimeout(() => d(new Error("RPC timed out | " + a)), 60000);
      } else {
        e = 0;
      }
      Vl(this, Pm).set(c.id, {
        resolve: b,
        reject: d,
        timeout: e
      });
    });
    f.finally(() => Vl(this, Pm).delete(c.id));
    if (Vl(this, Mm)) {
      Wl(this, Tm, Um).call(this, "__nui_req:" + a, hc(c, Vl(this, ca)), b);
    } else {
      Vl(this, Ii).push({
        type: "execute",
        event: "__nui_req:" + a,
        metadata: c,
        args: b
      });
    }
    return f;
  }
};
Jm = new WeakMap();
Km = new WeakMap();
Lm = new WeakMap();
fi = new WeakMap();
ca = new WeakMap();
Mm = new WeakMap();
Nm = new WeakMap();
Ii = new WeakMap();
Om = new WeakMap();
Pm = new WeakMap();
Qm = new WeakSet();
fa = function (a, b) {
  Vl(this, Om).set(a, b);
};
Rm = new WeakSet();
Sm = function (a, b) {
  if (Vl(this, Mm)) {
    const c = Ha(a, Vl(this, Lm));
    return Wl(this, Qm, fa).call(this, c, b);
  }
  Vl(this, Ii).push({
    type: "on",
    event: a,
    callback: b
  });
};
ua = new WeakSet();
da = function (a, ...b) {
  fetch("https://" + Vl(this, Jm) + "/" + a, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      args: b
    })
  });
};
Tm = new WeakSet();
Um = function (a, ...b) {
  if (Vl(this, Mm)) {
    const c = Ha(a, Vl(this, Lm));
    return Wl(this, ua, da).call(this, c, ...b);
  }
  Vl(this, Ii).push({
    type: "emit",
    event: a,
    args: b
  });
};
ei = new WeakSet();
Vm = async function (a) {
  if (Vl(this, Mm)) {
    return Im.error("[NUI] SDK already initialized");
  }
  const b = Fm(a);
  const c = b?.split(":").filter(a => a.length > 0);
  if (!c || c.length === 0) {
    return Im.error("SDK NUI handlers failed to initialize");
  }
  Q(this, Lm, c[0]);
  Q(this, fi, c[2]);
  Q(this, ca, c[1]);
  Q(this, Mm, true);
  Wl(this, Rm, Sm).call(this, "__nui_res:" + Vl(this, Jm), (a, [b, c]) => {
    const d = Vl(this, Pm).get(a);
    if (!d) {
      return Im.error("[NUI] Invalid response received");
    }
    clearTimeout(d.timeout);
    if (b) {
      d.resolve(c);
    } else {
      d.reject(c);
    }
  });
  for (const b of Vl(this, Ii)) {
    if (b.type === "on") {
      Wl(this, Rm, Sm).call(this, b.event, b.callback);
    } else if (b.type === "emit") {
      Wl(this, Tm, Um).call(this, b.event, ...b.args);
    } else if (b.type === "execute") {
      const a = Vl(this, Pm).get(b.metadata.id);
      if (!a) {
        Im.error("[RPC] " + b.event + " - Failed to execute queued RPC call");
        continue;
      }
      a.timeout = +setTimeout(() => a.reject(new Error("NUI execute timed out | " + b.event)), 60000);
      Wl(this, Tm, Um).call(this, b.event, hc(b.metadata, Vl(this, ca)), b.args);
    }
  }
};
var Wm = new _c();
var Xe;
var Fe;
var Xm;
var Ri;
var Ym = class {
  constructor() {
    z(this, Xm);
    z(this, Xe, undefined);
    z(this, Fe, undefined);
    Q(this, Xe, {});
    Q(this, Fe, 10);
  }
  on(a, b) {
    Vl(this, Xe)[a] ||= [];
    Vl(this, Xe)[a].push(b);
    const c = Vl(this, Xe)[a].length;
    if (c > Vl(this, Fe)) {
      Wl(this, Xm, Ri).call(this, a, c);
    }
  }
  off(a, b) {
    const c = Vl(this, Xe)[a];
    if (!c) {
      return;
    }
    const d = c.indexOf(b);
    if (d !== -1) {
      c.splice(d, 1);
    }
  }
  once(a, b) {
    const c = (...d) => {
      b(...d);
      this.off(a, c);
    };
    this.on(a, c);
  }
  emit(a, ...b) {
    const c = Vl(this, Xe)[a];
    if (c) {
      for (const a of c) {
        try {
          a(...b);
        } catch (a) {
          console.error(a);
        }
      }
    }
  }
  addListener(a, b) {
    this.on(a, b);
  }
  prependListener(a, b) {
    Vl(this, Xe)[a] ||= [];
    Vl(this, Xe)[a].unshift(b);
    const c = Vl(this, Xe)[a].length;
    if (c > Vl(this, Fe)) {
      Wl(this, Xm, Ri).call(this, a, c);
    }
  }
  prependOnceListener(a, b) {
    const c = (...d) => {
      b(...d);
      this.off(a, c);
    };
    this.prependListener(a, c);
  }
  removeListener(a, b) {
    this.off(a, b);
  }
  removeAllListeners(a) {
    if (a) {
      delete Vl(this, Xe)[a];
    } else {
      Q(this, Xe, {});
    }
  }
  listenerCount(a) {
    const b = Vl(this, Xe)[a];
    if (b) {
      return b.length;
    } else {
      return 0;
    }
  }
  getMaxListeners() {
    return Vl(this, Fe);
  }
  setMaxListeners(a) {
    Q(this, Fe, a);
  }
  rawListeners(a) {
    return Vl(this, Xe)[a] || [];
  }
  eventNames() {
    return Object.keys(Vl(this, Xe));
  }
};
Xe = new WeakMap();
Fe = new WeakMap();
Xm = new WeakSet();
Ri = function (a, b) {
  Im.warning("Possible EventEmitter memory leak detected. " + b + " listeners added. Use emitter.setMaxListeners() to increase limit");
};
var Zm = ["ACK", "HEARTBEAT"];
var Ai;
var ti;
var ri;
var $m;
var _m;
var an;
var cn;
var dn;
var ni;
var en;
var fn;
var ha;
var gn;
var pc;
var hn;
var yc;
var jn;
var gc;
var ln;
var mc;
var mn;
var wc;
var nn;
var xc;
var on;
var bc;
var pn;
var qn;
var rn;
var kc = class {
  constructor() {
    z(this, en);
    z(this, ha);
    z(this, pc);
    z(this, yc);
    z(this, gc);
    z(this, mc);
    z(this, wc);
    z(this, xc);
    z(this, bc);
    z(this, qn);
    z(this, Ai, undefined);
    z(this, ti, undefined);
    z(this, ri, undefined);
    z(this, $m, undefined);
    z(this, _m, undefined);
    z(this, an, undefined);
    z(this, cn, undefined);
    z(this, dn, undefined);
    z(this, ni, undefined);
    Q(this, _m, 0);
    Q(this, $m, false);
    Q(this, an, new Map());
    Q(this, cn, new Ym());
  }
  async connect() {
    if (typeof GetParentResourceName != "function") {
      return Wl(this, en, fn).call(this, "ws://localhost:5000", "dev");
    }
    const a = await Wm.execute("__npx_sdk:sockets:init");
    if (!a?.API_URL || !a?.API_KEY) {
      return false;
    } else {
      return Wl(this, en, fn).call(this, a.API_URL, a.API_KEY);
    }
  }
  on(a, b) {
    if (!Zm.includes(a)) {
      Vl(this, cn).on(a, b);
    }
  }
  once(a, b) {
    if (!Zm.includes(a)) {
      Vl(this, cn).once(a, b);
    }
  }
  off(a, b) {
    if (!Zm.includes(a)) {
      Vl(this, cn).off(a, b);
    }
  }
  emit(a, b) {
    var c;
    if (Zm.includes(a)) {
      return;
    }
    const d = Wl(this, bc, pn).call(this, {
      id: ++oe(this, _m)._,
      event: a,
      data: b
    });
    if ((c = Vl(this, ri)) != null) {
      c.send(d);
    }
  }
  execute(a, b) {
    var c;
    const d = {
      id: ++oe(this, _m)._,
      data: b
    };
    const e = new Promise(b => {
      const c = +setTimeout(() => b([false, "Request timed out | " + a]), 60000);
      Vl(this, an).set(d.id, {
        resolve: b,
        timeout: c
      });
    });
    e.finally(() => Vl(this, an).delete(d.id));
    const f = Wl(this, bc, pn).call(this, {
      event: a,
      data: d
    });
    if ((c = Vl(this, ri)) != null) {
      c.send(f);
    }
    return e;
  }
  register(a, b) {
    Vl(this, cn).on(a, async a => {
      var c;
      let d;
      try {
        d = {
          success: true,
          data: await b(a.data)
        };
      } catch (a) {
        d = {
          success: false,
          data: a.message
        };
      }
      const e = Wl(this, bc, pn).call(this, {
        id: a.id,
        event: "ACK",
        data: d
      });
      if ((c = Vl(this, ri)) != null) {
        c.send(e);
      }
    });
  }
  onReconnect(a) {
    Q(this, dn, a);
  }
  get isOnline() {
    var a;
    return ((a = Vl(this, ri)) == null ? undefined : a.readyState) === WebSocket.OPEN;
  }
};
Ai = new WeakMap();
ti = new WeakMap();
ri = new WeakMap();
$m = new WeakMap();
_m = new WeakMap();
an = new WeakMap();
cn = new WeakMap();
dn = new WeakMap();
ni = new WeakMap();
en = new WeakSet();
fn = async function (a, b) {
  Q(this, $m, false);
  Q(this, Ai, a);
  Q(this, ti, b);
  Q(this, ri, new WebSocket(a + "?authorization=bearer%20" + b));
  Vl(this, ri).onopen = Wl(this, pc, hn).bind(this);
  Vl(this, ri).onerror = Wl(this, yc, jn).bind(this);
  Vl(this, ri).onclose = Wl(this, gc, ln).bind(this);
  Vl(this, ri).onmessage = Wl(this, mc, mn).bind(this);
  return new Promise(a => {
    let b = 0;
    clearInterval(Vl(this, ni));
    Q(this, ni, +setInterval(() => {
      if (++b > 100) {
        clearInterval(Vl(this, ni));
        a(false);
        return;
      }
      if (Vl(this, $m)) {
        clearInterval(Vl(this, ni));
        a(true);
      }
    }, 100));
  });
};
ha = new WeakSet();
gn = async function () {
  if (typeof Vl(this, Ai) != "string" || typeof Vl(this, ti) != "string") {
    return;
  }
  if ((await Wl(this, en, fn).call(this, Vl(this, Ai), Vl(this, ti))) && Vl(this, dn)) {
    Vl(this, dn).call(this);
  }
};
pc = new WeakSet();
hn = function () {
  Q(this, $m, true);
};
yc = new WeakSet();
jn = function (a) {};
gc = new WeakSet();
ln = function (a) {
  setTimeout(Wl(this, ha, gn).bind(this), 1500);
};
mc = new WeakSet();
mn = function (a) {
  const {
    event: b,
    data: c
  } = Wl(this, qn, rn).call(this, a.data);
  if (b) {
    if (b === "HEARTBEAT") {
      Wl(this, wc, nn).call(this);
    } else if (b === "ACK") {
      const {
        id: a,
        data: b
      } = c;
      Wl(this, xc, on).call(this, a, b);
    } else {
      Vl(this, cn).emit(b, c);
    }
  }
};
wc = new WeakSet();
nn = function () {
  var a;
  const b = Wl(this, bc, pn).call(this, {
    event: "HEARTBEAT",
    data: "PONG"
  });
  if ((a = Vl(this, ri)) != null) {
    a.send(b);
  }
};
xc = new WeakSet();
on = function (a, b) {
  const c = Vl(this, an).get(a);
  if (c) {
    clearTimeout(c.timeout);
    c.resolve([b.success, b.data]);
  }
};
bc = new WeakSet();
pn = function (a) {
  return JSON.stringify(a);
};
qn = new WeakSet();
rn = function (a) {
  return JSON.parse(a);
};
Wm.register("__npx_sdk:sockets:register", async a => {
  sn.register(a, b => Wm.execute("__npx_sdk:sockets:pipe:" + a, b));
});
Wm.register("__npx_sdk:sockets:execute", async (a, b) => sn.execute(a, b));
var sn = new kc();
var Ec = {};
be(Ec, {
  CreateInstance: () => tn,
  Game: () => zm
});
function tn(a, b) {
  return new ym(a, b);
}
var un = {};
be(un, {
  Cache: () => wn,
  PolyZone: () => qo,
  Vector2: () => Ac,
  Vector3: () => Sc
});
var vn;
var Je;
var wn = class {
  constructor(a) {
    z(this, vn, undefined);
    z(this, Je, undefined);
    Q(this, Je, a ?? 5);
    Q(this, vn, new Map());
  }
  setTTL(a) {
    Q(this, Je, a);
  }
  set(a, b, c) {
    Vl(this, vn).set(a, {
      value: b,
      expiration: Date.now() + (c ?? Vl(this, Je)) * 1000
    });
    return this;
  }
  get(a, b = false) {
    const c = Vl(this, vn).get(a);
    const d = c ? b ? true : c.expiration > Date.now() : false;
    if (!c || !d) {
      if (c) {
        Vl(this, vn).delete(a);
      }
      return;
    }
    return c.value;
  }
  has(a, b = false) {
    const c = Vl(this, vn).get(a);
    const d = c ? b ? true : c.expiration > Date.now() : false;
    if (c && !d) {
      Vl(this, vn).delete(a);
    }
    return d;
  }
  delete(a) {
    return Vl(this, vn).delete(a);
  }
  clear() {
    Vl(this, vn).clear();
  }
  values(a = false) {
    const b = [];
    const c = Date.now();
    for (const d of Vl(this, vn).values()) {
      if (a || d.expiration > c) {
        b.push(d.value);
      }
    }
    return b;
  }
  keys(a = false) {
    const b = [];
    const c = Date.now();
    for (const [d, e] of Vl(this, vn).entries()) {
      if (a || e.expiration > c) {
        b.push(d);
      }
    }
    return b;
  }
  entries(a = false) {
    const b = [];
    const c = Date.now();
    for (const [d, e] of Vl(this, vn).entries()) {
      if (a || e.expiration > c) {
        b.push([d, e.value]);
      }
    }
    return b;
  }
};
vn = new WeakMap();
Je = new WeakMap();
var yn;
var zn;
var An = class a {
  constructor(a, b, c) {
    z(this, yn);
    const d = Wl(this, yn, zn).call(this, a, b, c);
    this.x = d.x;
    this.y = d.y;
    this.z = d.z;
  }
  equals(a, b, c) {
    const d = Wl(this, yn, zn).call(this, a, b, c);
    return this.x === d.x && this.y === d.y && this.z === d.z;
  }
  add(a, b, c, d) {
    let e = Wl(this, yn, zn).call(this, a, b, c);
    this.x += d ? e.x * d : e.x;
    this.y += d ? e.y * d : e.y;
    this.z += d ? e.z * d : e.z;
    return this;
  }
  addScalar(a) {
    if (typeof a != "number") {
      throw new Error("Invalid scalar");
    }
    this.x += a;
    this.y += a;
    this.z += a;
    return this;
  }
  sub(a, b, c, d) {
    const e = Wl(this, yn, zn).call(this, a, b, c);
    this.x -= d ? e.x * d : e.x;
    this.y -= d ? e.y * d : e.y;
    this.z -= d ? e.z * d : e.z;
    return this;
  }
  subScalar(a) {
    if (typeof a != "number") {
      throw new Error("Invalid scalar");
    }
    this.x -= a;
    this.y -= a;
    this.z -= a;
    return this;
  }
  multiply(a, b, c) {
    const d = Wl(this, yn, zn).call(this, a, b, c);
    this.x *= d.x;
    this.y *= d.y;
    this.z *= d.z;
    return this;
  }
  multiplyScalar(a) {
    if (typeof a != "number") {
      throw new Error("Invalid scalar");
    }
    this.x *= a;
    this.y *= a;
    this.z *= a;
    return this;
  }
  divide(a, b, c) {
    const d = Wl(this, yn, zn).call(this, a, b, c);
    this.x /= d.x;
    this.y /= d.y;
    this.z /= d.z;
    return this;
  }
  divideScalar(a) {
    if (typeof a != "number") {
      throw new Error("Invalid scalar");
    }
    this.x /= a;
    this.y /= a;
    this.z /= a;
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }
  getCenter(b, c, d) {
    const e = Wl(this, yn, zn).call(this, b, c, d);
    return new a((this.x + e.x) / 2, (this.y + e.y) / 2, (this.z + e.z) / 2);
  }
  getDistance(a, b, c) {
    const [d, e, f] = a instanceof Array ? a : typeof a == "object" ? [a.x, a.y, a.z] : [a, b, c];
    if (typeof d != "number" || typeof e != "number" || typeof f != "number") {
      throw new Error("Invalid vector coordinates");
    }
    const [g, h, i] = [this.x - d, this.y - e, this.z - f];
    return Math.sqrt(g * g + h * h + i * i);
  }
  toArray(a) {
    if (typeof a == "number") {
      return [parseFloat(this.x.toFixed(a)), parseFloat(this.y.toFixed(a)), parseFloat(this.z.toFixed(a))];
    } else {
      return [this.x, this.y, this.z];
    }
  }
  toJSON(a) {
    if (typeof a == "number") {
      return {
        x: parseFloat(this.x.toFixed(a)),
        y: parseFloat(this.y.toFixed(a)),
        z: parseFloat(this.z.toFixed(a))
      };
    } else {
      return {
        x: this.x,
        y: this.y,
        z: this.z
      };
    }
  }
  toString(a) {
    return JSON.stringify(this.toJSON(a));
  }
};
yn = new WeakSet();
zn = function (a, b, c) {
  let d = {
    x: 0,
    y: 0,
    z: 0
  };
  if (a instanceof An) {
    d = a;
  } else if (a instanceof Array) {
    d = {
      x: a[0],
      y: a[1],
      z: a[2]
    };
  } else if (typeof a == "object") {
    d = a;
  } else {
    d = {
      x: a,
      y: b,
      z: c
    };
  }
  if (typeof d.x != "number" || typeof d.y != "number" || typeof d.z != "number") {
    throw new Error("Invalid vector coordinates");
  }
  return d;
};
var Sc = An;
var Bn;
var Cn;
var Dn = class a {
  constructor(a, b) {
    z(this, Bn);
    const c = Wl(this, Bn, Cn).call(this, a, b);
    this.x = c.x;
    this.y = c.y;
  }
  equals(a, b) {
    const c = Wl(this, Bn, Cn).call(this, a, b);
    return this.x === c.x && this.y === c.y;
  }
  add(b, c, d) {
    const e = Wl(this, Bn, Cn).call(this, b, c);
    const f = this.x + (d ? e.x * d : e.x);
    const g = this.y + (d ? e.y * d : e.y);
    return new a(f, g);
  }
  addScalar(b) {
    if (typeof b != "number") {
      throw new Error("Invalid scalar");
    }
    const c = this.x + b;
    const d = this.y + b;
    return new a(c, d);
  }
  sub(b, c, d) {
    const e = Wl(this, Bn, Cn).call(this, b, c);
    const f = this.x - (d ? e.x * d : e.x);
    const g = this.y - (d ? e.y * d : e.y);
    return new a(f, g);
  }
  subScalar(b) {
    if (typeof b != "number") {
      throw new Error("Invalid scalar");
    }
    const c = this.x - b;
    const d = this.y - b;
    return new a(c, d);
  }
  multiply(b, c) {
    const d = Wl(this, Bn, Cn).call(this, b, c);
    const e = this.x * d.x;
    const f = this.y * d.y;
    return new a(e, f);
  }
  multiplyScalar(b) {
    if (typeof b != "number") {
      throw new Error("Invalid scalar");
    }
    const c = this.x * b;
    const d = this.y * b;
    return new a(c, d);
  }
  divide(b, c) {
    const d = Wl(this, Bn, Cn).call(this, b, c);
    const e = this.x / d.x;
    const f = this.y / d.y;
    return new a(e, f);
  }
  divideScalar(b) {
    if (typeof b != "number") {
      throw new Error("Invalid scalar");
    }
    const c = this.x / b;
    const d = this.y / b;
    return new a(c, d);
  }
  round() {
    const b = Math.round(this.x);
    const c = Math.round(this.y);
    return new a(b, c);
  }
  floor() {
    const b = Math.floor(this.x);
    const c = Math.floor(this.y);
    return new a(b, c);
  }
  ceil() {
    const b = Math.ceil(this.x);
    const c = Math.ceil(this.y);
    return new a(b, c);
  }
  getCenter(b, c) {
    const d = Wl(this, Bn, Cn).call(this, b, c);
    return new a((this.x + d.x) / 2, (this.y + d.y) / 2);
  }
  getDistance(a, b) {
    const [c, d] = a instanceof Array ? a : typeof a == "object" ? [a.x, a.y] : [a, b];
    if (typeof c != "number" || typeof d != "number") {
      throw new Error("Invalid vector coordinates");
    }
    const [e, f] = [this.x - c, this.y - d];
    return Math.sqrt(e * e + f * f);
  }
  toArray(a) {
    if (typeof a == "number") {
      return [parseFloat(this.x.toFixed(a)), parseFloat(this.y.toFixed(a))];
    } else {
      return [this.x, this.y];
    }
  }
  toJSON(a) {
    if (typeof a == "number") {
      return {
        x: parseFloat(this.x.toFixed(a)),
        y: parseFloat(this.y.toFixed(a))
      };
    } else {
      return {
        x: this.x,
        y: this.y
      };
    }
  }
  toString(a) {
    return JSON.stringify(this.toJSON(a));
  }
};
Bn = new WeakSet();
Cn = function (a, b) {
  let c = {
    x: 0,
    y: 0
  };
  if (a instanceof Dn || a instanceof Sc) {
    c = a;
  } else if (a instanceof Array) {
    c = {
      x: a[0],
      y: a[1]
    };
  } else if (typeof a == "object") {
    c = a;
  } else {
    c = {
      x: a,
      y: b
    };
  }
  if (typeof c.x != "number" || typeof c.y != "number") {
    throw new Error("Invalid vector coordinates");
  }
  return c;
};
var Ac = Dn;
var Fn = {};
be(Fn, {
  MathUtils: () => Mn
});
var Tc = (a, b, c) => Math.min(Math.max(a, b), c);
var Gn = (a, b, c) => b[0] + (c - a[0]) * (b[1] - b[0]) / (a[1] - a[0]);
var Hn = ([a, b, c], [d, e, f]) => {
  const [g, h, i] = [a - d, b - e, c - f];
  return Math.sqrt(g * g + h * h + i * i);
};
var In = (a, b) => Math.floor(b ? Math.random() * (b - a + 1) + a : Math.random() * a);
var Jn = (a, b) => {
  if (a instanceof Ac) {
    return a;
  }
  if (a instanceof Sc) {
    return new Ac(a);
  }
  if (a instanceof Array) {
    return new Ac(a);
  }
  if (typeof a == "object") {
    return new Ac(a);
  }
  if (typeof a != "number" || typeof b != "number") {
    throw new Error("Invalid vector coordinates");
  }
  return new Ac(a, b);
};
var Kn = (a, b, c) => {
  if (a instanceof Sc) {
    return a;
  }
  if (a instanceof Array) {
    return new Sc(a);
  }
  if (typeof a == "object") {
    return new Sc(a);
  }
  if (typeof a != "number" || typeof b != "number" || typeof c != "number") {
    throw new Error("Invalid vector coordinates");
  }
  return new Sc(a, b, c);
};
var Ln = (a, b) => {
  let c = 0;
  const d = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
  for (let e = 0; e < b.length; e++) {
    const f = b[e];
    const g = b[(e + 1) % b.length];
    if (f.y <= a.y) {
      if (g.y > a.y && d(f, g, a) > 0) {
        c++;
      }
    } else if (g.y <= a.y && d(f, g, a) < 0) {
      c--;
    }
  }
  return c;
};
var Mn = {
  clamp: Tc,
  getMapRange: Gn,
  getDistance: Hn,
  getRandomNumber: In,
  parseVector2: Jn,
  parseVector3: Kn,
  windingNumber: Ln
};
function Nn(a, b) {
  const c = "_";
  const d = On((b, c, ...d) => a(b, ...d), b);
  return {
    get: function (...a) {
      return d.get(c, ...a);
    },
    reset: function () {
      d.reset(c);
    }
  };
}
function On(a, b) {
  const c = b.timeToLive || 60000;
  const d = {};
  async function e(b, ...e) {
    let f = d[b];
    if (!f) {
      f = {
        value: null,
        lastUpdated: 0
      };
      d[b] = f;
    }
    const g = Date.now();
    if (f.lastUpdated === 0 || g - f.lastUpdated > c) {
      const [c, d] = await a(f, b, ...e);
      if (c) {
        f.lastUpdated = g;
        f.value = d;
      }
      return d;
    }
    return await new Promise(a => setTimeout(() => a(f.value), 0));
  }
  return {
    get: async function (a, ...b) {
      return await e(a, ...b);
    },
    reset: function (a) {
      const b = d[a];
      if (b) {
        b.lastUpdated = 0;
      }
    }
  };
}
function $c() {
  if (globalThis && typeof globalThis.crypto == "object") {
    return tg();
  } else {
    return new Wh(4).toString();
  }
}
function Pn(a) {
  return xg(a, xg.URL);
}
function Qn(a, b) {
  return new Promise((c, d) => {
    const e = Date.now();
    const f = setInterval(() => {
      const d = Date.now() - e > b;
      if (a() || d) {
        clearInterval(f);
        return c(d);
      }
    }, 1);
  });
}
function Rn(a) {
  return new Promise(b => setTimeout(() => b(), a));
}
function Bc() {
  return Rn(0);
}
var Sn = {
  cache: Nn,
  cacheableMap: On,
  waitForCondition: Qn,
  getUUID: $c,
  getStringHash: Pn,
  wait: Rn,
  waitForNextFrame: Bc,
  deflate: Fl,
  inflate: Ih,
  ...Fn
};
var Tn;
var xn;
var Un;
var zi;
var Vn;
var Wn;
var bn;
var Xn;
var kn;
var Yn;
var Zn;
var $n;
var _n;
var ao;
var Ic;
var bo;
var Rc;
var co;
var zc;
var va;
var eo;
var fo;
var Dc = class {
  constructor(a, b, c, d, e, f = 30, g = false) {
    z(this, _n);
    z(this, Ic);
    z(this, Rc);
    z(this, zc);
    z(this, eo);
    z(this, Tn, undefined);
    z(this, xn, undefined);
    z(this, Un, undefined);
    z(this, zi, undefined);
    z(this, Vn, undefined);
    z(this, Wn, undefined);
    z(this, bn, undefined);
    z(this, Xn, undefined);
    z(this, kn, undefined);
    z(this, Yn, undefined);
    z(this, Zn, undefined);
    z(this, $n, undefined);
    Q(this, Tn, a);
    Q(this, xn, d);
    Q(this, Un, e);
    Q(this, zi, b);
    Q(this, Vn, c);
    Q(this, Wn, g);
    Q(this, bn, f);
    Q(this, kn, Vl(this, xn).x / f);
    Q(this, Yn, Vl(this, xn).y / f);
    Q(this, Xn, Vl(this, kn) * Vl(this, Yn));
    Q(this, Zn, Wl(this, _n, ao).call(this, Vl(this, Tn), Vl(this, bn), Vl(this, kn), Vl(this, Yn), Vl(this, Wn)));
    Q(this, $n, Wl(this, Ic, bo).call(this, Vl(this, Zn), Vl(this, Xn)));
  }
  get cells() {
    return Vl(this, Zn);
  }
  get cellSize() {
    return Vl(this, bn);
  }
  get cellWidth() {
    return Vl(this, kn);
  }
  get cellHeight() {
    return Vl(this, Yn);
  }
  get gridArea() {
    return Vl(this, $n);
  }
  get gridCoverage() {
    return Vl(this, $n) / Vl(this, Un) * 100;
  }
  isPointInsideGrid(a) {
    var b;
    const c = a.x - Vl(this, zi).x;
    const d = a.y - Vl(this, zi).y;
    const e = Math.floor(c * Vl(this, bn) / Vl(this, xn).x);
    const f = Math.floor(d * Vl(this, bn) / Vl(this, xn).y);
    let g = (b = Vl(this, Zn)[e]) == null ? undefined : b[f];
    if (!g && Vl(this, Wn)) {
      g = Wl(this, zc, va).call(this, e, f, Vl(this, kn), Vl(this, Yn), Vl(this, Tn));
      Vl(this, Zn)[e][f] = g;
      if (!g) {
        return false;
      }
      Q(this, $n, Vl(this, $n) + Vl(this, Xn));
    }
    return g ?? false;
  }
};
Tn = new WeakMap();
xn = new WeakMap();
Un = new WeakMap();
zi = new WeakMap();
Vn = new WeakMap();
Wn = new WeakMap();
bn = new WeakMap();
Xn = new WeakMap();
kn = new WeakMap();
Yn = new WeakMap();
Zn = new WeakMap();
$n = new WeakMap();
_n = new WeakSet();
ao = function (a, b, c, d, e) {
  const f = {};
  for (let g = 0; g < b; g++) {
    f[g] = {};
    if (!e) {
      for (let e = 0; e < b; e++) {
        if (Wl(this, zc, va).call(this, g, e, c, d, a)) {
          f[g][e] = true;
        }
      }
    }
  }
  return f;
};
Ic = new WeakSet();
bo = function (a, b) {
  let c = 0;
  for (const d in a) {
    for (const e in a[d]) {
      c += b;
    }
  }
  return c;
};
Rc = new WeakSet();
co = function (a, b, c, d) {
  const e = [];
  const f = a * c + Vl(this, zi).x;
  const g = b * d + Vl(this, zi).y;
  e.push(new Ac(f, g));
  e.push(new Ac(f + c, g));
  e.push(new Ac(f + c, g + d));
  e.push(new Ac(f, g + d));
  return e;
};
zc = new WeakSet();
va = function (a, b, c, d, e) {
  const f = Wl(this, Rc, co).call(this, a, b, c, d);
  let g = false;
  for (const h of f) {
    if (Sn.MathUtils.windingNumber(h, e) !== 0) {
      g = true;
      break;
    }
  }
  if (!g) {
    return false;
  }
  for (let g = 0; g < f.length; g++) {
    const a = f[g];
    const b = f[(g + 1) % f.length];
    for (let c = 0; c < e.length; c++) {
      const d = e[c];
      const f = e[(c + 1) % e.length];
      if (Wl(this, eo, fo).call(this, a, b, d, f)) {
        return false;
      }
    }
  }
  return true;
};
eo = new WeakSet();
fo = function (a, b, c, d) {
  const e = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
  const f = (a.y - c.y) * (d.x - c.x) - (a.x - c.x) * (d.y - c.y);
  const g = (a.y - c.y) * (b.x - a.x) - (a.x - c.x) * (b.y - a.y);
  if (e === 0) {
    return f === 0 && g === 0;
  }
  const h = f / e;
  const i = g / e;
  return h >= 0 && h <= 1 && i >= 0 && i <= 1;
};
var go;
var Di;
var qe;
var ho;
var io;
var jo;
var ko;
var En;
var lo;
var Fi;
var mo;
var Ui;
var no;
var Ni;
var oo;
var Oi;
var po;
var ji;
var qo = class {
  constructor(a, b = undefined, c = undefined) {
    if (b === undefined) b = {};
    if (c === undefined) c = {};
    z(this, lo);
    z(this, mo);
    z(this, no);
    z(this, oo);
    z(this, po);
    z(this, go, undefined);
    z(this, Di, undefined);
    z(this, qe, undefined);
    z(this, ho, undefined);
    z(this, io, undefined);
    z(this, jo, undefined);
    z(this, ko, undefined);
    z(this, En, undefined);
    Q(this, go, Sn.getUUID());
    Q(this, Di, a);
    Q(this, qe, Wl(this, lo, Fi).call(this, a));
    Q(this, ho, Wl(this, mo, Ui).call(this, a));
    Q(this, io, Wl(this, po, ji).call(this, a));
    Q(this, jo, Wl(this, oo, Oi).call(this, Vl(this, qe), Vl(this, ho)));
    Q(this, ko, Wl(this, no, Ni).call(this, Vl(this, qe), Vl(this, ho)));
    this.options = b;
    this.data = c;
    if (!!this.options.useGrid || !!this.options.useLazyGrid) {
      Q(this, En, new Dc(Vl(this, Di), Vl(this, qe), Vl(this, ho), Vl(this, jo), Vl(this, io), b.gridCellSize, b.useLazyGrid));
    }
  }
  get id() {
    return Vl(this, go);
  }
  get center() {
    return Vl(this, ko);
  }
  get min() {
    return Vl(this, qe);
  }
  get max() {
    return Vl(this, ho);
  }
  get points() {
    return [...Vl(this, Di)];
  }
  isPointInside(a) {
    if (a.x < Vl(this, qe).x || a.x > Vl(this, ho).x) {
      return false;
    }
    if (a.y < Vl(this, qe).y || a.y > Vl(this, ho).y) {
      return false;
    }
    if ((this.options.minZ || this.options.maxZ) && a instanceof Sc) {
      const b = this.options.minZ ?? -Infinity;
      const c = this.options.maxZ ?? Infinity;
      if (a.z < b || a.z > c) {
        return false;
      }
    }
    if ((this.options.useGrid || this.options.useLazyGrid) && Vl(this, En)) {
      return Vl(this, En).isPointInsideGrid(a);
    } else {
      return Sn.MathUtils.windingNumber(a, Vl(this, Di)) !== 0;
    }
  }
  addPoint(a) {
    Vl(this, Di).push(a);
  }
  removePoint(a) {
    const b = Vl(this, Di).findIndex(b => b.x === a.x && b.y === a.y);
    if (b !== -1) {
      Vl(this, Di).splice(b, 1);
    }
  }
  removeLastPoint() {
    Vl(this, Di).pop();
  }
  recalculate() {
    Q(this, qe, Wl(this, lo, Fi).call(this, Vl(this, Di)));
    Q(this, ho, Wl(this, mo, Ui).call(this, Vl(this, Di)));
    Q(this, io, Wl(this, po, ji).call(this, Vl(this, Di)));
    Q(this, jo, Wl(this, oo, Oi).call(this, Vl(this, qe), Vl(this, ho)));
    Q(this, ko, Wl(this, no, Ni).call(this, Vl(this, qe), Vl(this, ho)));
    if (this.options.useGrid) {
      Q(this, En, new Dc(Vl(this, Di), Vl(this, qe), Vl(this, ho), Vl(this, jo), Vl(this, io), this.options.gridCellSize, this.options.useLazyGrid));
    }
  }
};
go = new WeakMap();
Di = new WeakMap();
qe = new WeakMap();
ho = new WeakMap();
io = new WeakMap();
jo = new WeakMap();
ko = new WeakMap();
En = new WeakMap();
lo = new WeakSet();
Fi = function (a) {
  let b = Number.MAX_SAFE_INTEGER;
  let c = Number.MAX_SAFE_INTEGER;
  for (const d of a) {
    b = Math.min(b, d.x);
    c = Math.min(c, d.y);
  }
  return new Ac(b, c);
};
mo = new WeakSet();
Ui = function (a) {
  let b = Number.MIN_SAFE_INTEGER;
  let c = Number.MIN_SAFE_INTEGER;
  for (const d of a) {
    b = Math.max(b, d.x);
    c = Math.max(c, d.y);
  }
  return new Ac(b, c);
};
no = new WeakSet();
Ni = function (a, b) {
  return b.add(a).divideScalar(2);
};
oo = new WeakSet();
Oi = function (a, b) {
  return b.sub(a);
};
po = new WeakSet();
ji = function (a) {
  let b = 0;
  for (let c = 0, d = a.length - 1; c < a.length; d = c++) {
    const e = a[c];
    const f = a[d];
    b += e.x * f.y;
    b -= e.y * f.x;
  }
  return Math.abs(b / 2);
};
/*! Bundled license information:
crypto-js/ripemd160.js:
(** @preserve
(c) 2012 by Cédric Mesnil. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*)
crypto-js/mode-ctr-gladman.js:
(** @preserve
* Counter block mode compatible with  Dr Brian Gladman fileenc.c
* derived from CryptoJS.mode.CTR
* Jan Hruby jhruby.web@gmail.com
*)
*/
const ro = "_controller_1qj2g_1";
const so = "_column_1qj2g_12";
const to = "_title_1qj2g_19";
const uo = "_description_1qj2g_28";
const vo = "_keybind_1qj2g_36";
const wo = "_text_1qj2g_52";
const xo = "_button_1qj2g_55";
const yo = "_list_1qj2g_65";
const zo = "_item_1qj2g_83";
const Ao = "_texts_1qj2g_96";
const Bo = "_active_1qj2g_138";
const Co = "_slider_1qj2g_156";
const Do = {
  controller: ro,
  column: so,
  title: to,
  description: uo,
  keybind: vo,
  text: wo,
  button: xo,
  list: yo,
  item: zo,
  texts: Ao,
  active: Bo,
  switch: "_switch_1qj2g_145",
  slider: Co
};
const ue = _("<div><div><div>Antenna Scan</div><div>Scan traffic in the opposite/same lane</div></div><div class=\"flex flex-row justify-center items-center gap-[0.5vh]\"><div>SAME</div><div>OPP");
const Eo = _("<div><div><div>XMIT</div><div>Turns on/off the antenna</div></div><label><input type=\"checkbox\"><span>");
const Fo = _("<div><div class=\"w-full flex flex-row justify-between items-center\"><div class=\"flex flex-row justify-start items-center gap-[0.85vh] mb-[1.25vh]\"><svg width=\"1.8vh\" height=\"1.98vh\" viewBox=\"0 0 27 29\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.6005 0.125616C10.6701 0.393673 9.86309 1.15662 9.52028 2.09223C9.45893 2.25953 9.40083 2.73338 9.37145 3.30574C9.31626 4.38023 9.22632 4.66402 8.79142 5.13593C8.41173 5.54792 7.87331 5.77572 7.2795 5.77572C6.83936 5.77572 6.77835 5.75585 5.97385 5.35014C5.0602 4.88936 4.75653 4.79675 4.15929 4.79675C3.65536 4.79675 3.28776 4.88457 2.78273 5.12564C2.11321 5.44521 1.72491 5.89014 0.96416 7.20939C0.0323889 8.82524 -0.119477 9.3468 0.0731541 10.2697C0.278079 11.2515 0.80537 11.9473 1.78515 12.5287C2.77218 13.1144 3.1194 13.6277 3.1194 14.5011C3.1194 15.3745 2.77218 15.8879 1.78515 16.4735C0.808347 17.0532 0.27782 17.7512 0.0751599 18.7236C-0.0321879 19.2384 0.00508303 19.7808 0.183737 20.3028C0.295032 20.628 1.2853 22.3902 1.67554 22.9575C2.18517 23.6983 3.22681 24.2117 4.21099 24.2071C4.75634 24.2045 5.08149 24.1021 5.97385 23.6521C6.77835 23.2464 6.83936 23.2265 7.2795 23.2265C7.87331 23.2265 8.41173 23.4543 8.79142 23.8663C9.22632 24.3382 9.31626 24.622 9.37145 25.6965C9.40083 26.2688 9.45893 26.7427 9.52028 26.91C9.87189 27.8696 10.7173 28.6488 11.6745 28.8953C12.1436 29.0161 14.7693 29.0397 15.2564 28.9275C15.966 28.764 16.7808 28.183 17.1739 27.5603C17.5131 27.0229 17.5991 26.6852 17.6485 25.6965C17.7023 24.6218 17.7917 24.3389 18.2273 23.8663C18.607 23.4543 19.1454 23.2265 19.7392 23.2265C20.1793 23.2265 20.2404 23.2464 21.0449 23.6521C21.5091 23.8862 22.0199 24.1065 22.18 24.1416C23.1735 24.3596 24.2877 24.0345 25.0174 23.3139C25.2908 23.0439 25.5649 22.642 26.0531 21.7953C26.782 20.5312 26.8849 20.2959 26.9738 19.6897C27.1021 18.8146 26.7496 17.7676 26.1132 17.1334C25.9251 16.946 25.5202 16.6414 25.2134 16.4566C24.9066 16.2717 24.5607 16.0255 24.4449 15.9094C23.7126 15.1761 23.7126 13.8261 24.4449 13.0928C24.5607 12.9767 24.9066 12.7305 25.2134 12.5456C25.5202 12.3608 25.9251 12.0562 26.1132 11.8688C26.7496 11.2346 27.1021 10.1877 26.9738 9.31256C26.8849 8.7063 26.782 8.47099 26.0531 7.20687C25.2939 5.89027 24.9052 5.44508 24.236 5.12564C23.7309 4.88457 23.3633 4.79675 22.8594 4.79675C22.2622 4.79675 21.9585 4.88936 21.0449 5.35014C20.2404 5.75585 20.1793 5.77572 19.7392 5.77572C19.1454 5.77572 18.607 5.54792 18.2273 5.13593C17.7924 4.66402 17.7025 4.38023 17.6473 3.30574C17.6179 2.73338 17.5598 2.25953 17.4984 2.09223C17.1495 1.13992 16.2971 0.350119 15.3525 0.104065C14.7791 -0.0453013 12.1412 -0.0301576 11.6005 0.125616ZM14.8301 9.51642C15.1018 9.58599 15.5928 9.78073 15.9212 9.94925C16.4104 10.2003 16.6297 10.3673 17.1361 10.8737C17.6425 11.3802 17.8094 11.5996 18.0605 12.0889C18.4954 12.9364 18.6357 13.5131 18.6399 14.4688C18.6441 15.4473 18.5301 15.9367 18.09 16.8309C17.7951 17.4302 17.6826 17.5831 17.1369 18.1254C16.0783 19.1776 15.0081 19.6262 13.5417 19.6324C12.6451 19.6363 12.1238 19.5308 11.4102 19.201C10.3328 18.7031 9.49045 17.9154 8.96277 16.9123C8.5194 16.0695 8.38112 15.4964 8.38112 14.5011C8.38112 13.5117 8.5148 12.9531 8.95824 12.0889C9.2093 11.5996 9.37617 11.3802 9.88257 10.8737C10.3852 10.371 10.6092 10.2001 11.0829 9.95747C12.0251 9.47494 12.7551 9.31127 13.7448 9.36058C14.07 9.37683 14.5584 9.44692 14.8301 9.51642Z\" fill=\"#a4e124\"></path></svg><div><div>Settings menu</div><div>Change your settings</div></div></div><div><div>Exit</div><div>Escape</div></div></div><div><div class=\"w-full flex flex-col justify-start items-start gap-[0.3vh]\"><div>Front Antenna</div></div><div class=\"w-full flex flex-col justify-start items-start gap-[0.3vh]\"><div>Rear Antenna</div></div><div class=\"w-full flex flex-col justify-start items-start gap-[0.3vh]\"><div>Misc</div><div><div><div>Fast Limit</div><div>Detect vehicles over the speed limit</div></div><input type=\"number\"></div><div><div><div>Toggle Radar</div><div>Turns on/off the radar</div></div><label><input type=\"checkbox\"><span></span></label></div><div><div><div>Lockfast Reset</div><div>Resets the lockfast</div></div><div>Reset</div></div><div><div><div>Plate locking</div><div>Locks the plate of the vehicle</div></div><label><input type=\"checkbox\"><span>");
function Go(a) {
  const {
    data: b
  } = yb();
  return (() => {
    const c = ue();
    const d = c.firstChild;
    const e = d.firstChild;
    const f = e.nextSibling;
    const g = d.nextSibling;
    const h = g.firstChild;
    const i = h.nextSibling;
    h.$$click = () => {
      Wm.execute("radar:selectMode", a.type, "same");
    };
    i.$$click = () => {
      Wm.execute("radar:selectMode", a.type, "opp");
    };
    q(g => {
      const j = Do.item;
      const k = Do.texts;
      const l = Do.title;
      const m = Do.description;
      const n = Do.button;
      const o = {
        [Do.active]: b[a.type].Mode === "same"
      };
      const p = Do.button;
      const q = {
        [Do.active]: b[a.type].Mode === "opp"
      };
      if (j !== g._v$) {
        Ea(c, g._v$ = j);
      }
      if (k !== g._v$2) {
        Ea(d, g._v$2 = k);
      }
      if (l !== g._v$3) {
        Ea(e, g._v$3 = l);
      }
      if (m !== g._v$4) {
        Ea(f, g._v$4 = m);
      }
      if (n !== g._v$5) {
        Ea(h, g._v$5 = n);
      }
      g._v$6 = Pa(h, o, g._v$6);
      if (p !== g._v$7) {
        Ea(i, g._v$7 = p);
      }
      g._v$8 = Pa(i, q, g._v$8);
      return g;
    }, {
      _v$: undefined,
      _v$2: undefined,
      _v$3: undefined,
      _v$4: undefined,
      _v$5: undefined,
      _v$6: undefined,
      _v$7: undefined,
      _v$8: undefined
    });
    return c;
  })();
}
function Ho(a) {
  const {
    data: b
  } = yb();
  return (() => {
    const c = Eo();
    const d = c.firstChild;
    const e = d.firstChild;
    const f = e.nextSibling;
    const g = d.nextSibling;
    const h = g.firstChild;
    const i = h.nextSibling;
    h.$$input = () => {
      Wm.execute("radar:toggleXmit", a.type);
    };
    q(a => {
      const b = Do.item;
      const h = Do.texts;
      const j = Do.title;
      const k = Do.description;
      const l = Do.switch;
      const m = Do.slider;
      if (b !== a._v$9) {
        Ea(c, a._v$9 = b);
      }
      if (h !== a._v$10) {
        Ea(d, a._v$10 = h);
      }
      if (j !== a._v$11) {
        Ea(e, a._v$11 = j);
      }
      if (k !== a._v$12) {
        Ea(f, a._v$12 = k);
      }
      if (l !== a._v$13) {
        Ea(g, a._v$13 = l);
      }
      if (m !== a._v$14) {
        Ea(i, a._v$14 = m);
      }
      return a;
    }, {
      _v$9: undefined,
      _v$10: undefined,
      _v$11: undefined,
      _v$12: undefined,
      _v$13: undefined,
      _v$14: undefined
    });
    q(() => h.checked = b[a.type].Xmit);
    return c;
  })();
}
function el() {
  const {
    data: a
  } = yb();
  const [b, c] = p(false);
  const [d, e] = p("");
  const [f, g] = p(false);
  const h = a => {
    if (a.key === "Escape") {
      g(false);
      Wm.execute("radar:closeController");
    }
  };
  v(async () => {
    document.addEventListener("keydown", h);
  });
  w(() => {
    document.removeEventListener("keydown", h);
  });
  let i;
  r(() => {
    if (i) {
      clearTimeout(i);
    }
    if (f() && a.fwd) {
      c(true);
      setTimeout(() => {
        e("translateX(0%)");
      }, 100);
    } else {
      e("translateX(125%)");
      i = setTimeout(() => {
        c(false);
      }, 250);
    }
  }, [f(), a]);
  Wm.register("radar:openController", async () => {
    g(true);
  });
  return V(X, {
    get when() {
      return b();
    },
    get children() {
      const b = Fo();
      const c = b.firstChild;
      const e = c.firstChild;
      const f = e.firstChild;
      const g = f.nextSibling;
      const h = g.firstChild;
      const i = h.nextSibling;
      const j = e.nextSibling;
      const k = j.firstChild;
      const l = k.nextSibling;
      const m = c.nextSibling;
      const n = m.firstChild;
      const o = n.firstChild;
      const p = n.nextSibling;
      const r = p.firstChild;
      const s = p.nextSibling;
      const t = s.firstChild;
      const u = t.nextSibling;
      const v = u.firstChild;
      const w = v.firstChild;
      const x = w.nextSibling;
      const y = v.nextSibling;
      const z = u.nextSibling;
      const A = z.firstChild;
      const B = A.firstChild;
      const C = B.nextSibling;
      const D = A.nextSibling;
      const E = D.firstChild;
      const F = E.nextSibling;
      const G = z.nextSibling;
      const H = G.firstChild;
      const I = H.firstChild;
      const J = I.nextSibling;
      const K = H.nextSibling;
      const L = G.nextSibling;
      const M = L.firstChild;
      const N = M.firstChild;
      const O = N.nextSibling;
      const P = M.nextSibling;
      const Q = P.firstChild;
      const R = Q.nextSibling;
      Wa(n, V(Ho, {
        type: "fwd"
      }), null);
      Wa(n, V(Go, {
        type: "fwd"
      }), null);
      Wa(p, V(Ho, {
        type: "bwd"
      }), null);
      Wa(p, V(Go, {
        type: "bwd"
      }), null);
      y.addEventListener("change", a => {
        Wm.execute("radar:setLimit", a.target.value);
      });
      E.$$input = () => {
        Wm.execute("radar:toggle");
      };
      K.$$click = () => {
        Wm.execute("radar:lockfastReset");
      };
      Q.$$input = () => {
        Wm.execute("radar:plateLock");
      };
      q(a => {
        const c = Do.controller;
        const e = d();
        const n = Do.icon;
        const p = Do.column;
        const q = Do.title;
        const s = Do.description;
        const E = Do.keybind;
        const Q = Do.text;
        const S = Do.button;
        const T = Do.list;
        const U = Do.title;
        const V = Do.title;
        const W = Do.title;
        const X = Do.item;
        const Y = Do.texts;
        const Z = Do.title;
        const $ = Do.description;
        const _ = Do.input;
        const aa = Do.item;
        const ba = Do.texts;
        const ca = Do.title;
        const da = Do.description;
        const ea = Do.switch;
        const fa = Do.slider;
        const ga = Do.item;
        const ha = Do.texts;
        const ia = Do.title;
        const ja = Do.description;
        const ka = Do.button;
        const la = {
          [Do.active]: true
        };
        const ma = Do.item;
        const na = Do.texts;
        const oa = Do.title;
        const qa = Do.description;
        const ra = Do.switch;
        const sa = Do.slider;
        if (c !== a._v$15) {
          Ea(b, a._v$15 = c);
        }
        if (e !== a._v$16) {
          if ((a._v$16 = e) != null) {
            b.style.setProperty("transform", e);
          } else {
            b.style.removeProperty("transform");
          }
        }
        if (n !== a._v$17) {
          pa(f, "class", a._v$17 = n);
        }
        if (p !== a._v$18) {
          Ea(g, a._v$18 = p);
        }
        if (q !== a._v$19) {
          Ea(h, a._v$19 = q);
        }
        if (s !== a._v$20) {
          Ea(i, a._v$20 = s);
        }
        if (E !== a._v$21) {
          Ea(j, a._v$21 = E);
        }
        if (Q !== a._v$22) {
          Ea(k, a._v$22 = Q);
        }
        if (S !== a._v$23) {
          Ea(l, a._v$23 = S);
        }
        if (T !== a._v$24) {
          Ea(m, a._v$24 = T);
        }
        if (U !== a._v$25) {
          Ea(o, a._v$25 = U);
        }
        if (V !== a._v$26) {
          Ea(r, a._v$26 = V);
        }
        if (W !== a._v$27) {
          Ea(t, a._v$27 = W);
        }
        if (X !== a._v$28) {
          Ea(u, a._v$28 = X);
        }
        if (Y !== a._v$29) {
          Ea(v, a._v$29 = Y);
        }
        if (Z !== a._v$30) {
          Ea(w, a._v$30 = Z);
        }
        if ($ !== a._v$31) {
          Ea(x, a._v$31 = $);
        }
        if (_ !== a._v$32) {
          Ea(y, a._v$32 = _);
        }
        if (aa !== a._v$33) {
          Ea(z, a._v$33 = aa);
        }
        if (ba !== a._v$34) {
          Ea(A, a._v$34 = ba);
        }
        if (ca !== a._v$35) {
          Ea(B, a._v$35 = ca);
        }
        if (da !== a._v$36) {
          Ea(C, a._v$36 = da);
        }
        if (ea !== a._v$37) {
          Ea(D, a._v$37 = ea);
        }
        if (fa !== a._v$38) {
          Ea(F, a._v$38 = fa);
        }
        if (ga !== a._v$39) {
          Ea(G, a._v$39 = ga);
        }
        if (ha !== a._v$40) {
          Ea(H, a._v$40 = ha);
        }
        if (ia !== a._v$41) {
          Ea(I, a._v$41 = ia);
        }
        if (ja !== a._v$42) {
          Ea(J, a._v$42 = ja);
        }
        if (ka !== a._v$43) {
          Ea(K, a._v$43 = ka);
        }
        a._v$44 = Pa(K, la, a._v$44);
        if (ma !== a._v$45) {
          Ea(L, a._v$45 = ma);
        }
        if (na !== a._v$46) {
          Ea(M, a._v$46 = na);
        }
        if (oa !== a._v$47) {
          Ea(N, a._v$47 = oa);
        }
        if (qa !== a._v$48) {
          Ea(O, a._v$48 = qa);
        }
        if (ra !== a._v$49) {
          Ea(P, a._v$49 = ra);
        }
        if (sa !== a._v$50) {
          Ea(R, a._v$50 = sa);
        }
        return a;
      }, {
        _v$15: undefined,
        _v$16: undefined,
        _v$17: undefined,
        _v$18: undefined,
        _v$19: undefined,
        _v$20: undefined,
        _v$21: undefined,
        _v$22: undefined,
        _v$23: undefined,
        _v$24: undefined,
        _v$25: undefined,
        _v$26: undefined,
        _v$27: undefined,
        _v$28: undefined,
        _v$29: undefined,
        _v$30: undefined,
        _v$31: undefined,
        _v$32: undefined,
        _v$33: undefined,
        _v$34: undefined,
        _v$35: undefined,
        _v$36: undefined,
        _v$37: undefined,
        _v$38: undefined,
        _v$39: undefined,
        _v$40: undefined,
        _v$41: undefined,
        _v$42: undefined,
        _v$43: undefined,
        _v$44: undefined,
        _v$45: undefined,
        _v$46: undefined,
        _v$47: undefined,
        _v$48: undefined,
        _v$49: undefined,
        _v$50: undefined
      });
      q(() => y.value = a.fastLimit);
      q(() => E.checked = a.radarEnabled);
      q(() => Q.checked = a.lockPlates);
      return b;
    }
  });
}
ka(["click", "input"]);
const Io = _("<div>");
function Jo() {
  const {
    data: a,
    setData: b,
    setTransform: c
  } = yb();
  Wm.register("radar:setData", async a => {
    b(b => ({
      ...b,
      ...a
    }));
  });
  const [d, e] = p(false);
  let f;
  r(() => {
    if (f) {
      clearTimeout(f);
    }
    if (a.radarEnabled) {
      e(true);
      setTimeout(() => {
        c("translateY(0%)");
      }, 100);
    } else {
      c("translateY(100%)");
      f = setTimeout(() => {
        e(false);
      }, 250);
    }
  }, [a]);
  return (() => {
    const a = Io();
    Wa(a, V(el, {}), null);
    Wa(a, V(X, {
      get when() {
        return d();
      },
      get children() {
        return V($b, {});
      }
    }), null);
    q(() => Ea(a, fb.App));
    return a;
  })();
}
$(() => V(wb, {
  get children() {
    return V(Jo, {});
  }
}), document.getElementById("root"));