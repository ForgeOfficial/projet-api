/*
 Copyright(c) 2024 TransUnion LLC. All Rights Reserved. 80808bae-d4c3-47ac-9929-5d77264d823c
*/
(function() {
    function Za(H) {
        var J = 0;
        return function() {
            return J < H.length ? {
                done: !1,
                value: H[J++]
            } : {
                done: !0
            }
        }
    }
    var $a = "function" == typeof Object.defineProperties ? Object.defineProperty : function(H, J, M) {
        if (H == Array.prototype || H == Object.prototype)
            return H;
        H[J] = M.value;
        return H
    }
    ;
    function ab(H) {
        H = ["object" == typeof globalThis && globalThis, H, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var J = 0; J < H.length; ++J) {
            var M = H[J];
            if (M && M.Math == Math)
                return M
        }
        throw Error("Cannot find global object");
    }
    var bb = ab(this);
    function cb(H, J) {
        if (J)
            a: {
                var M = bb;
                H = H.split(".");
                for (var R = 0; R < H.length - 1; R++) {
                    var ma = H[R];
                    if (!(ma in M))
                        break a;
                    M = M[ma]
                }
                H = H[H.length - 1];
                R = M[H];
                J = J(R);
                J != R && null != J && $a(M, H, {
                    configurable: !0,
                    writable: !0,
                    value: J
                })
            }
    }
    cb("Object.entries", function(H) {
        return H ? H : function(J) {
            var M = [], R;
            for (R in J)
                Object.prototype.hasOwnProperty.call(J, R) && M.push([R, J[R]]);
            return M
        }
    });
    (function db() {
        function J() {
            var a = {
                optional: [{
                    RtpDataChannels: !0
                }]
            }, b;
            if (b = "function" === typeof x.RTCPeerConnection && x.RTCPeerConnection || "function" === typeof x.mozRTCPeerConnection && x.mozRTCPeerConnection || "function" === typeof x.webkitRTCPeerConnection && x.webkitRTCPeerConnection) {
                f.add("RTCT", b.name);
                var c = Ha();
                try {
                    if (c && c.config) {
                        var d = new b(c.config,a);
                        d.onicecandidate = function(g) {
                            var k = c.pb;
                            g && g.target && g.target.localDescription && g.target.localDescription.sdp && (g = g.target.localDescription.sdp) && (g = D.encode(I.aa(g.substring(0, 2E3))),
                            f.add("RTCSDP", g),
                            f.add("RTCH", k))
                        }
                        ;
                        d.onerror = M;
                        d.createDataChannel("");
                        d.createOffer && 0 === d.createOffer.length ? d.createOffer().then(function(g) {
                            "object" === typeof g && d.setLocalDescription(g).then(function() {}).catch(R)
                        }).catch(ma) : d.createOffer && d.createOffer(function(g) {
                            "object" === typeof g && d.setLocalDescription(g, function() {}, R)
                        }, ma)
                    } else
                        f.add("RTCERR", "RTCOptions failed to generate")
                } catch (g) {
                    f.add("RTCERR", w("pmc: ", g, !0))
                }
            } else
                try {
                    if (x.RTCIceGatherer) {
                        c = Ha();
                        var e = new x.RTCIceGatherer(c);
                        f.add("RTCT", "RTCIceGatherer");
                        e.onlocalcandidate = function(g) {
                            g.candidate && (Ia += JSON.stringify(g.candidate) + ";",
                            f.add("ORTCC", Ia))
                        }
                        ;
                        e.onerror = M
                    }
                } catch (g) {
                    f.add("RTCERR", w("rtcig: ", g, !0))
                }
        }
        function M(a) {
            f.add("RTCERR", a ? "onerror: " + a : "onerror")
        }
        function R(a) {
            f.add("RTCERR", a ? "sld: " + a : "sld")
        }
        function ma(a) {
            f.add("RTCERR", a ? "co: " + a : "co")
        }
        function Ha() {
            if (l[p.Ea]) {
                var a = l[p.Ea].split(",");
                if (1 < a.length) {
                    var b = Math.floor(Math.random() * a.length);
                    a = a[b]
                } else
                    a = a[0];
                if (a) {
                    var c = {
                        iceServers: [{}]
                    };
                    var d = c.iceServers[0];
                    b = a.split("@");
                    if (1 < b.length) {
                        var e = D.decode(b[0]);
                        e[1] ? (d.username = e[0],
                        d.credential = e[1]) : e[0] && (d.credential = e[0]);
                        d.urls = b[1]
                    } else
                        d.urls = b[0]
                }
            }
            return {
                nb: a,
                config: c
            }
        }
        function eb() {
            var a = !1;
            K.readyState && "loaded" !== K.readyState && "complete" !== K.readyState && "interactive" !== K.readyState || (sa() || 30 < Ja ? (fa.Wa && fa.$a(),
            a = !0) : Ja++);
            return a
        }
        function ha(a, b) {
            var c = !1;
            "string" === typeof a && "object" === typeof b && (na.push(a),
            ia[a] = b,
            c = !0);
            return c
        }
        function Ka(a) {
            var b = {
                isUnex: !0,
                scriptList: ""
            }, c, d, e = "static" === a;
            a = oa;
            e && (ta = document.URL.split("/").splice(0, 3).join("/"));
            try {
                var g = (ta + "/").replace(/\/+$/, "/");
                var k = g.match(/^(http|https):\/\/([^:\/]+)(:[0-9]+)?(\/.*)$/);
                var n = k[1];
                var h = k[2].replace(/\./g, "\\.");
                var y = k[3] && ":80" !== k[3] && ":443" !== k[3] ? k[3] : "";
                var q = "^(" + n + ":)?//" + h + y + "/";
                var G = e ? "([^\\?]*\\/)?(static_)?(wdp)\\.js(\\?.*)?$" : "([^\\?]*\\/)?(dyn_)?wdp\\.js(\\?.*)?$";
                var z = new RegExp(q + G);
                G = new RegExp("^" + G);
                var N = document.getElementsByTagName("script");
                for (c = 0; c < N.length; c++)
                    if (d = N.item(c).getAttribute("src") || "") {
                        var A = d.split(":")[0];
                        "https" === A ? d = d.replace(":443/", "/") : "http" === A ? d = d.replace(":80/", "/") : A = "";
                        z.test(d) ? b.isUnex = !1 : ta && /^(?!(https?:)?\/\/).*$/i.test(d) && G.test(d) ? b.isUnex = !1 : G.test(d) && 0 > d.indexOf(a) && (b.scriptList += d.split("?")[0] + ";")
                    }
                b.scriptList = b.scriptList.replace(/;$/, "")
            } catch (B) {
                w("", B, !0)
            }
            return b
        }
        function La(a) {
            if (!f.g.ORPY) {
                var b = r.round(a.gamma, 4)
                  , c = r.round(a.beta, 4)
                  , d = r.round(a.alpha, 4);
                (b || 0 === b || c || 0 === c || d || 0 === d) && f.add("ORPY", b + ";" + c + ";" + d)
            }
            f.g.CMPAS || (b = r.round(a.mb || a.webkitCompassHeading, 4),
            a = r.round(a.lb || a.webkitCompassAccuracy, 4),
            (b || a) && f.add("CMPAS", (b + ";" + a).toString()));
            f.g.ORPY && f.g.CMPAS && ba("deviceorientation", La)
        }
        function Ma(a) {
            if (!f.g.AXEL && a && a.accelerationIncludingGravity) {
                var b = r.round(a.accelerationIncludingGravity.x, 4)
                  , c = r.round(a.accelerationIncludingGravity.y, 4)
                  , d = r.round(a.accelerationIncludingGravity.z, 4);
                (b || 0 === b || c || 0 === c || d || 0 === d) && f.add("AXEL", b + ";" + c + ";" + d)
            }
            !f.g.AXINT && a && a.interval && f.add("AXINT", r.round(a.interval, 2).toString());
            f.g.AXEL && f.g.AXINT && ba("devicemotion", Ma)
        }
        function fb() {
            if (navigator.getBattery)
                return navigator.getBattery().then(function(b) {
                    b && b.level && f.add("BATL", b.level.toString())
                }).catch(function() {});
            var a = navigator.h || navigator.I || navigator.B;
            a && void 0 !== a.level && f.add("BATL", a.level.toString());
            return null
        }
        function gb(a, b) {
            function c(d) {
                !f.g[b] && d && (f.add(b, (d.isTrusted || "undefined").toString()),
                ba(a, c))
            }
            P(a, c)
        }
        function hb() {
            var a = l.secure_websockets ? "wss:" : "ws:";
            za = setTimeout(ca, 5E3);
            try {
                if (x.WebSocket) {
                    var b = oa.replace(/http(s)?:\/\//i, a + "//") + "/star";
                    var c = new x.WebSocket(b);
                    c.onmessage = function(e) {
                        e && e.data && e.target.close ? (f.add("WSTRIP", e.data.toString(), !0),
                        e.target.close()) : ca()
                    }
                    ;
                    c.onerror = function(e) {
                        Na = !0;
                        e && e.data && e.target.close ? e.target.close() : ca();
                        w(D.decode("V1NUUklQIEVycm9yIEhhbmRsZXIgRmlyZWQ="), void 0, !0)
                    }
                    ;
                    c.onclose = function(e) {
                        if (e && Na) {
                            var g = e.reason ? ": " + e.reason : "";
                            f.add("WSERR", e.code.toString() + g);
                            w(D.decode("V1NUUklQIFNvY2tldCBDbG9zaW5nIHcvIGNvZGUgLSA=") + e.code + g, void 0, !0)
                        }
                        ca()
                    }
                } else {
                    var d = D.decode("d2luZG93LldlYlNvY2tldCBub3QgZGVmaW5lZA==");
                    f.add("WSERR", d);
                    ca();
                    w(d, void 0, !0)
                }
            } catch (e) {
                c && c.close(),
                f.add("WSERR", w(D.decode("V1NUUklQIENhdGNoIFRyaWdnZXJlZDo="), e, !0)),
                ca()
            }
        }
        function ca() {
            za && clearTimeout(za);
            T.wa = !0;
            T.j = T.i && T.wa
        }
        function Q(a) {
            var b = ""
              , c = ""
              , d = ""
              , e = ""
              , g = {};
            try {
                b = a.changedTouches.item(0).identifier
            } catch (ua) {}
            try {
                c = 0 === a.button || a.button ? a.button : "";
                d = 0 === a.keyCode || a.keyCode ? a.keyCode : "";
                e = a.code || "";
                var k = b + ";" + c + ";" + d + ";" + e;
                if ("keydown" === a.type || "keyup" === a.type) {
                    var n = "kp";
                    g.P = "KEY"
                } else
                    "mousedown" === a.type || "mouseup" === a.type ? (n = "mc",
                    g.P = "CLICK") : "touchstart" === a.type || "touchend" === a.type ? (n = "tc",
                    g.P = "TOUCH") : n = a.type;
                if (n && -1 < n.toUpperCase().indexOf("MOVE"))
                    g.P = n.toUpperCase()[0] + "MOV";
                else if ("scroll" === n || "wheel" === n)
                    g.P = n.toUpperCase();
                W[n] || (W[n] = g);
                var h = W[n];
                h.M = (new Date).getTime();
                h.la || (a.pointerType ? (f.g.PTYP || f.add("PTYP", a.pointerType),
                ba("pointerdown", Q),
                ba("pointermove", Q)) : (h.la = h.M,
                h.isTrusted = a.isTrusted));
                if (/^(key|mouse)down$/.test(a.type) || "touchstart" === a.type)
                    h.L = "down",
                    h.ka = a.type.replace("down", "up");
                else if (/^(key|mouse)up$/.test(a.type) || "touchend" === a.type)
                    h.L = "up",
                    h.ka = a.type.replace("up", "down");
                h.count || (h.count = 0);
                W.na && (W.sa = !0);
                "wheel" !== n || 20 !== h.count + 1 || W.na || (W.sa = !1,
                W.na = !0);
                var y = 20 > h.count || "scroll" === a.type && !W.sa;
                if (y) {
                    if (h.L) {
                        b = !1;
                        try {
                            if ("" !== k)
                                if (h.l || (h.l = {}),
                                "down" === h.L)
                                    h.l[k] || (h.l[k] = []),
                                    h.V || (h.V = []),
                                    20 > h.l[k].length && h.l[k].push(h.M),
                                    b = !!(h.l[k] && 1 < h.l[k].length),
                                    b || (h.count += 1),
                                    20 > h.V.length ? (h.fa && !b && h.V.push(h.M - h.fa.time),
                                    1 === h.l[k].length && (h.fa = {
                                        time: h.M,
                                        id: k
                                    })) : (delete h.l,
                                    delete h.fa);
                                else if ("up" === h.L && h.l && h.l[k] && (h.S || (h.S = []),
                                20 > h.S.length && h.S.push(h.M - h.l[k][0]),
                                h.l)) {
                                    var q = h.l[k]
                                      , G = q.length;
                                    1 < G && (h.T || (h.T = []),
                                    20 > h.T.length && h.T.push(q[1] - q[0]),
                                    2 < G && (h.U || (h.U = []),
                                    20 > h.U.length && h.U.push(q[G - 1] - q[G - 2])));
                                    delete h.l[k]
                                }
                        } catch (ua) {
                            w("hbde:", ua, !0)
                        }
                    } else
                        h.count += 1;
                    if ("wheel" !== n) {
                        h.L || "scroll" === n || (h.Da && (h.$ || (h.$ = []),
                        20 > h.$.length && h.$.push(h.M - h.Da)),
                        h.Da = h.M);
                        var z, N, A, B, L = null != (B = null != (A = null == a ? void 0 : a.screenX) ? A : null == a ? void 0 : null == (z = a.touches) ? void 0 : null == (N = z[0]) ? void 0 : N.clientX) ? B : null, C, u, t, m, v = null != (m = null != (t = null == a ? void 0 : a.screenY) ? t : null == a ? void 0 : null == (C = a.touches) ? void 0 : null == (u = C[0]) ? void 0 : u.clientY) ? m : null;
                        "number" === typeof L && "number" === typeof v && "up" !== h.L && (h.v || h.A || (h.v = [],
                        h.A = []),
                        20 > h.v.length && (h.v.push(L),
                        h.A.push(v)))
                    }
                } else
                    delete h.l,
                    delete h.fa,
                    ba(a.type, Q),
                    h.ka && ba(h.ka, Q),
                    Oa(h);
                if ("down" !== h.L) {
                    y && Oa(h);
                    if (h.S && 0 < h.S.length) {
                        var E = a.type[0].toUpperCase() + "DOWN";
                        var X = Pa(h.S, 2);
                        f.add(E, X)
                    }
                    if (h.V && 0 < h.V.length) {
                        var ja = a.type[0].toUpperCase() + "BTWN";
                        var Aa = Pa(h.V, 2);
                        f.add(ja, Aa)
                    }
                    if (h.T && 0 < h.T.length) {
                        var ib = Math.round(r.ha(h.T));
                        f.add("KDEL", ib.toString())
                    }
                    if (h.U && 0 < h.U.length) {
                        var jb = Math.round(r.ha(h.U));
                        f.add("KREP", jb.toString())
                    }
                }
            } catch (ua) {
                w("re:", ua, !0)
            }
        }
        function Oa(a) {
            try {
                if (a && a.P && a.la && a.count) {
                    var b = a.la - pa + ";" + a.isTrusted + ";" + a.count;
                    if (a.v && a.A) {
                        var c = r.round(r.F(a.v), 2)
                          , d = r.round(r.F(a.A), 2)
                          , e = r.round(r.Z(a.v), 2)
                          , g = r.round(r.Z(a.A), 2)
                          , k = r.round(r.ra(a.v), 2)
                          , n = r.round(r.ra(a.A), 2)
                          , h = r.round(r.ma(a.v), 2)
                          , y = r.round(r.ma(a.A), 2);
                        b += ";" + c + ";" + d + ";" + e + ";" + g + ";" + k + ";" + n + ";" + h + ";" + y;
                        if (a.$) {
                            var q = r.round(r.max(a.v), 2)
                              , G = r.round(r.max(a.A), 2)
                              , z = r.round(r.Ja({
                                v: a.v,
                                A: a.A
                            }), 4)
                              , N = Math.round(r.ha(a.$));
                            b += ";" + q + ";" + G + ";" + z + ";" + N
                        }
                    }
                    f.add(a.P, b)
                }
            } catch (A) {
                w("bfsss:", A, !0)
            }
        }
        function Qa() {
            this.version = F.appVersion.trim();
            this.B = F.appName;
            this.I = void 0;
            this.h = [];
            this.cb();
            "string" === typeof F.oscpu && 0 < F.oscpu.length ? this.W = F.oscpu : (this.W = F.platform,
            this.bb());
            if (("string" !== typeof this.B || 1 > this.B.length) && this.I) {
                var a = this.I[0].split("/");
                a && (this.B = a[0],
                this.version = 1 < a.length ? a[1] : "")
            }
            this.Ya()
        }
        function Ra(a) {
            this.j = this.i = this.J = !1;
            this.name = "fp_" + a;
            this.h = "";
            this.label = "io_ls:" + a
        }
        function sa(a) {
            a = void 0 === a ? !1 : a;
            var b = !0;
            try {
                for (var c = na.length, d = 0; d < c; d++) {
                    var e = ia[na[d]]
                      , g = void 0 !== e.H && null !== e.H;
                    if (!("object" !== typeof e || fa.Va && !e.ja && !a || g && e.H !== Y.ia || e.i && (!e.i || e.J)))
                        try {
                            e.N()
                        } catch (k) {
                            e.i = !1,
                            w("performCollection: unable to complete handler setup", k, !0),
                            b = !1
                        }
                }
            } catch (k) {
                w("performCollection error:", k, !0)
            }
            return b && f.qb
        }
        function kb(a) {
            l[p.s] && (l[p.s] && K.getElementById(l[p.s]) ? K.getElementById(l[p.s]).value = a : w(p.Za + '[ "' + p.s + '" ] or corresponding object is not defined', void 0, !0))
        }
        function qa(a) {
            var b = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
              , c = !0;
            if (!a || "string" !== typeof a || 44 !== a.length && 50 !== a.length || !b.test(a))
                c = !1;
            return c
        }
        function Ba() {
            if (pa) {
                var a = (new Date).getTime();
                a = parseInt(a - pa, 10);
                f.add("JIFFY", a.toString());
                a = !0
            }
            return a
        }
        function P(a, b, c) {
            c = void 0 === c ? x : c;
            try {
                if (c && "string" === typeof a && "function" === typeof b) {
                    var d = l.ignore_events;
                    !d || d && -1 === d.indexOf(a) ? c.addEventListener ? c.addEventListener(a, b, va) : c.attachEvent && c.attachEvent("on" + a, b) : d && -1 !== d.indexOf(a) && V(D.decode("ZXhjbHVkaW5nIA==") + a + D.decode("IGV2ZW50TGlzdGVuZXI="))
                }
            } catch (e) {
                w("", e, !0)
            }
        }
        function ba(a, b, c) {
            if ((c = void 0 === c ? x : c) && "string" === typeof a && "function" === typeof b) {
                var d = l.ignore_events;
                if (!d || d && -1 === d.indexOf(a))
                    c.removeEventListener ? c.removeEventListener(a, b, va) : c.detachEvent && c.detachEvent("on" + a, b)
            }
        }
        function Ca(a, b, c) {
            var d = !1;
            void 0 !== b && null !== b && (d = !0,
            "float" === c && isNaN(parseFloat(b)) || "int" === c && isNaN(parseInt(b, 10)) || "id" === c && !K.getElementById(b.toString()) || "Array" === c && b.constructor !== Array || c === p.G && typeof b !== p.G) && (d = !1,
            w('config "' + a + '" with a value of "' + b + '" did not match expected type of "' + c + '" or referenced element did not exist.', "", !0));
            return d
        }
        function w(a, b, c) {
            var d = ""
              , e = ""
              , g = ""
              , k = ""
              , n = ""
              , h = "";
            a = a ? a.toString() + " " : "";
            b && (d = b.name ? "[ name: " + b.name + " ] " : "",
            e = b.Oa ? "[ errorObj: " + b.Oa + " ] " : "",
            g = b.description ? "[ description: " + b.description + " ] " : "",
            k = b.message ? "[ message: " + b.message + " ] " : "",
            n = b.lineNumber ? "[ line: " + b.lineNumber + " ] " : "",
            h = b.fileName ? "[ file: " + b.fileName.split("?")[0] + " ] " : "");
            a = "fp " + a + d + e + g + k + n + h;
            O[p.ga] = l[p.ga] = a;
            ("boolean" === typeof c ? c : 1) && V(a.toString());
            return a.toString().slice(0, 400)
        }
        function Z(a) {
            var b, c = null !== a && void 0 !== a;
            !c || "1" !== a.toString() && "true" !== a.toString().toLowerCase() ? !c || "0" !== a.toString() && "false" !== a.toString().toLowerCase() || (b = !1) : b = !0;
            return b
        }
        function S(a, b, c, d) {
            var e = {};
            var g = (d = typeof d === p.u ? d : !0) ? "io_" + a : "fp_" + a;
            c === p.u ? typeof Z(l[a]) === p.u ? (e.source = "fp",
            l[a] = Z(l[a])) : d && typeof Z(O[a]) === p.u ? (e.source = wa,
            l[a] = Z(O[a])) : typeof Z(x[g]) === p.u ? (e.source = "window",
            l[a] = Z(x[g])) : (e.source = "default",
            l[a] = b) : (Ca(a, l[a], c) ? e.source = "fp" : d && Ca(a, O[a], c) ? (e.source = wa,
            l[a] = O[a]) : Ca(g, x[g], c) ? (e.source = "window",
            l[a] = x[g]) : (e.source = "default",
            l[a] = b),
            "float" === c ? l[a] = parseFloat(l[a]) : "int" === c && (l[a] = parseInt(l[a], 10)));
            e.value = l[a];
            e.sharable = d;
            e["default"] = b;
            l.configMeta[a] = e;
            l.configMeta.configIndex.push(a)
        }
        function Pa(a, b) {
            try {
                if (a && "number" === typeof b) {
                    var c = r.round(r.F(a), b)
                      , d = r.round(r.ha(a), b)
                      , e = r.round(r.Z(a), b)
                      , g = a.length
                      , k = r.round(r.ra(a), b)
                      , n = r.round(r.ma(a), b);
                    return c + ";" + d + ";" + e + ";" + g + ";" + k + ";" + n
                }
            } catch (h) {
                w("bsssfa:", h, !0)
            }
            return ""
        }
        function Sa(a) {
            return a ? a.reduce(function(b, c) {
                var d = JSON.stringify(c.brand);
                c = JSON.stringify(c.version);
                return b + (0 < b.length ? ", " : "") + d + ";V=" + c
            }, "") : ""
        }
        function lb() {
            var a = navigator.userAgentData;
            return a && a.getHighEntropyValues ? a.getHighEntropyValues("platform platformVersion architecture model uaFullVersion fullVersionList bitness wow64".split(" ")).then(function(b) {
                var c = Sa(a.brands);
                f.add("chjua", c);
                var d;
                f.add("chjmob", null == (d = a.mobile) ? void 0 : d.toString());
                if (b) {
                    c = Sa(b.fullVersionList);
                    f.add("chjarch", b.architecture);
                    f.add("chjplat", b.platform);
                    f.add("chjplatv", b.platformVersion);
                    f.add("chjmodel", b.model);
                    f.add("chjbit", b.bitness);
                    f.add("chjvrlist", c);
                    var e;
                    f.add("chjwow64", null == (e = b.wow64) ? void 0 : e.toString());
                    f.add("chjbrvr", b.uaFullVersion)
                }
            }).catch(function(b) {
                b = w("getHighEntropyValues", b, !1);
                f.add("chjerr", b)
            }) : null
        }
        function mb(a) {
            a && ia && Object.entries(a).forEach(function(b) {
                var c;
                if (c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator])
                    c = c.call(b);
                else if ("number" == typeof b.length)
                    c = {
                        next: Za(b)
                    };
                else
                    throw Error(String(b) + " is not an iterable or ArrayLike");
                b = c.next().value;
                c = c.next().value;
                ia[b] && (c = Y.fb(c, !1),
                ia[b].H = c)
            })
        }
        var x = window || this, wa = x.io_global_object_name || "IGLOO", O = x[wa] = x[wa] || {}, l = O.fp = O.fp || {}, pa = (new Date).getTime(), Na = !1, da = -1, ia = {}, na = [], ea, ka, Ta, Ua, oa, Va = !1, ta, Da, Ea, Ia, za, va, W = {
            sa: !0,
            na: !1
        }, xa, p = {
            s: "bbout_element_id",
            u: "boolean",
            O: "combine_tp_fp_output",
            G: "function",
            ea: "invalid token: ",
            ga: "last_error",
            C: "loader",
            Za: "localNamespace",
            ob: "ripServerUrl",
            Fa: "staticMain",
            ba: "trace_handler",
            Ea: "rtcServerList"
        }, ra;
        var la = l.staticVer = "5.9.0";
        var K = x.document
          , F = x.navigator;
        var ya = x.isSecureContext;
        (function() {
            var a = !1;
            try {
                var b = Object.defineProperty({}, "passive", {
                    get: function() {
                        a = !0
                    }
                });
                x.addEventListener("test", null, b)
            } catch (c) {}
            va = a ? {
                passive: !0,
                capture: !1
            } : !1;
            try {
                Ea = !(!F || !F.plugins)
            } catch (c) {
                Ea = !1
            }
            String.prototype.trim || (String.prototype.trim = function() {
                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            }
            );
            K.getElementById || (document.getElementById = function(c) {
                var d, e;
                if (K.getElementsByTagName) {
                    var g = K.getElementsByTagName("*");
                    var k = g.length;
                    for (e = 0; e < k; e++)
                        "object" !== typeof g[e] || g[e].id !== c && g[e].name !== c || (d = g[e])
                } else
                    "object" === typeof c && c.tagName && (d = c);
                return d
            }
            );
            Array.prototype.indexOf || (Array.prototype.indexOf = function(c, d) {
                var e = -1;
                if (null !== this) {
                    var g = Object(this);
                    var k = g.length >>> 0;
                    if (0 === k)
                        e = -1;
                    else if (d = Number(d) || 0,
                    Infinity === Math.abs(d) && (d = 0),
                    d >= k)
                        e = -1;
                    else
                        for (d = Math.max(0 <= d ? d : k - Math.abs(d), 0); d < k; )
                            if (d in g && g[d] === c) {
                                e = d;
                                break
                            } else
                                d++
                }
                return e
            }
            )
        }
        )();
        l[p.ga] = "";
        l.configMeta = {
            configIndex: []
        };
        var I = {
            o: function(a, b) {
                var c = ""
                  , d = "";
                if (a && "number" === typeof b) {
                    a = a.toString();
                    for (b -= a.length; c.length < b; )
                        c += "0";
                    d = c + a
                }
                return d
            },
            rb: function(a) {
                var b = "";
                a && (b = a.replace(/\//g, "-").replace(" ", "T") + "Z");
                return b
            },
            Qa: function(a) {
                var b = "";
                a && (b = a.getUTCFullYear() + "/" + I.o((a.getUTCMonth() + 1).toString(), 2) + "/" + I.o(a.getUTCDate().toString(), 2) + " " + I.o(a.getUTCHours().toString(), 2) + ":" + I.o(a.getUTCMinutes().toString(), 2) + ":" + I.o(a.getUTCSeconds().toString(), 2) + "." + I.o(a.getUTCMilliseconds().toString(), 3));
                return b
            },
            ua: function(a, b) {
                var c = "";
                "number" === typeof a && b && (a = a.toString(16),
                c = b ? I.o(a, b) : a);
                return c
            },
            aa: function(a) {
                var b = "", c;
                if (a) {
                    var d = a.length;
                    for (c = 0; c < d; c++) {
                        var e = a.charCodeAt(c);
                        if (128 > e)
                            b += String.fromCharCode(e);
                        else if (2048 > e)
                            b += String.fromCharCode(192 + (e >> 6)) + String.fromCharCode(128 + (e & 63));
                        else if (65536 > e) {
                            if (!(56320 <= e && 57344 > e)) {
                                if (55296 <= e && 56320 > e)
                                    if (c + 1 >= d)
                                        continue;
                                    else {
                                        var g = a.charCodeAt(++c);
                                        if (56320 > g || 56832 <= e)
                                            continue;
                                        else
                                            e = (e - 55296 << 10) + (e - 56320) + 65536
                                    }
                                b += String.fromCharCode(224 + (e >> 12)) + String.fromCharCode(128 + (e >> 6 & 63)) + String.fromCharCode(128 + (e & 63))
                            }
                        } else
                            b += String.fromCharCode(240 + (e >> 18)) + String.fromCharCode(128 + (e >> 12 & 63)) + String.fromCharCode(128 + (e >> 6 & 63)) + String.fromCharCode(128 + (e & 63))
                    }
                }
                return b
            }
        }
          , D = {
            K: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            Ua: function(a) {
                var b = !1;
                if (a)
                    try {
                        b = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(a)
                    } catch (c) {
                        w("isBase64: ", c, !0)
                    }
                return b
            },
            encode: function(a) {
                var b, c = "";
                if (a)
                    if (x.btoa)
                        c = btoa(a);
                    else {
                        var d = a.length;
                        for (b = 0; b < d; b += 3) {
                            var e = a.charCodeAt(b);
                            var g = a.charCodeAt(b + 1);
                            var k = a.charCodeAt(b + 2);
                            var n = e >> 2;
                            e = (e & 3) << 4 | g >> 4;
                            var h = (g & 15) << 2 | k >> 6;
                            var y = k & 63;
                            isNaN(g) ? h = y = 64 : isNaN(k) && (y = 64);
                            c += D.K.charAt(n) + D.K.charAt(e) + D.K.charAt(h) + D.K.charAt(y)
                        }
                    }
                return c
            },
            decode: function(a) {
                var b = "";
                if (a)
                    if (x.atob && D.Ua(a))
                        b = x.atob(a);
                    else
                        try {
                            for (var c = 0, d = a.length; c < d; ) {
                                var e = D.K.indexOf(a.charAt(c++))
                                  , g = D.K.indexOf(a.charAt(c++))
                                  , k = D.K.indexOf(a.charAt(c++))
                                  , n = D.K.indexOf(a.charAt(c++))
                                  , h = (g & 15) << 4 | k >> 2
                                  , y = (k & 3) << 6 | n;
                                b += String.fromCharCode(e << 2 | g >> 4);
                                64 !== k && (b += String.fromCharCode(h));
                                64 !== n && (b += String.fromCharCode(y))
                            }
                        } catch (q) {
                            w("", q, !0),
                            b = ""
                        }
                return b
            }
        };
        var V = function(a) {
            if (typeof l[p.ba] === p.G)
                try {
                    var b = new Date;
                    l[p.ba](I.o(b.getHours(), 2) + ":" + I.o(b.getMinutes(), 2) + ":" + I.o(b.getSeconds(), 2) + "." + I.o(b.getMilliseconds(), 3) + " fp_" + a)
                } catch (c) {
                    w("trace: ", c, !1)
                }
        };
        (function() {
            S(p.ba, "", p.G);
            S("enable_atrip", !1, p.u);
            S("enable_wstrip", !0, p.u);
            S("enable_rtc", !1, p.u);
            S("enable_static_token", !0, p.u);
            S("atrip_resource_name", "/time.mp3");
            S("bb_max_len", 4E3, "int");
            S(p.O, !0, p.u);
            S("bb_callback", "", p.G, l[p.O]);
            S(p.s, "", "", l[p.O]);
            S("secure_websockets", !0, p.u);
            S("ignore_events", [], "Array");
            l[p.s] && !document.getElementById(l[p.s]) && w(D.decode("YmJvdXQgZWxlbWVudCBkaWQgbm90IGV4aXN0IGF0IHJ1bnRpbWU="), "", !0);
            S(p.C);
            var a = l[p.C];
            a && (oa = a.tp_host,
            Va = a.url_dots_to_dashes || !1,
            ra = a.enable_ip);
            var b;
            ra = null != (b = Z(ra)) ? b : !0;
            oa = oa || D.decode("aHR0cHM6Ly9tcHNuYXJlLmllc25hcmUuY29t");
            l[p.C] && (l[p.C].uri_hook && (xa = l[p.C].uri_hook),
            Ua = !1 === O[p.C].fp_dyn,
            Ta = !1 === O[p.C].fp_static);
            xa = xa || "/iojs"
        }
        )();
        if (Ta || l[p.Fa])
            return w(D.decode("c3RhdGljIGV4aXRpbmcgYmVjYXVzZSBpdCBoYXMgYWxyZWFkeSBydW4gb3IgaXMgZGlzYWJsZWQ="), "", !0),
            !1;
        l[p.Fa] = db;
        typeof l[p.ba] === p.G && V(D.decode("KioqOiBCZWdpbm5pbmcgZXhlY3V0aW9u"));
        (function() {
            try {
                var a = l[p.s]
                  , b = a && K.getElementById(a)
                  , c = b && b.form;
                c && P("submit", Ba, c)
            } catch (d) {
                w("", d, !0)
            }
        }
        )();
        var aa = {
            va: function(a) {
                if (!a)
                    return "";
                a = a.toString();
                var b = a.length, c = "", d = 0, e = 0, g;
                for (g = 0; g < b; g++) {
                    var k = a.charCodeAt(g);
                    var n = null;
                    128 > k ? e++ : n = 127 < k && 2048 > k ? String.fromCharCode(k >> 6 | 192) + String.fromCharCode(k & 63 | 128) : String.fromCharCode(k >> 12 | 224) + String.fromCharCode(k >> 6 & 63 | 128) + String.fromCharCode(k & 63 | 128);
                    n && (e > d && (c += a.slice(d, e)),
                    c += n,
                    d = e = g + 1)
                }
                e > d && (c += a.slice(d, b));
                return c
            },
            qa: function(a) {
                function b(u) {
                    var t = "", m;
                    for (m = 7; 0 <= m; m--) {
                        var v = u >>> 4 * m & 15;
                        t += v.toString(16)
                    }
                    return t
                }
                function c(u, t) {
                    return u << t | u >>> 32 - t
                }
                a = aa.va(a);
                var d, e = Array(80), g = 1732584193, k = 4023233417, n = 2562383102, h = 271733878, y = 3285377520;
                var q = a.length;
                var G = [];
                for (d = 0; d < q - 3; d += 4) {
                    var z = a.charCodeAt(d) << 24 | a.charCodeAt(d + 1) << 16 | a.charCodeAt(d + 2) << 8 | a.charCodeAt(d + 3);
                    G.push(z)
                }
                switch (q % 4) {
                case 0:
                    d = 2147483648;
                    break;
                case 1:
                    d = a.charCodeAt(q - 1) << 24 | 8388608;
                    break;
                case 2:
                    d = a.charCodeAt(q - 2) << 24 | a.charCodeAt(q - 1) << 16 | 32768;
                    break;
                case 3:
                    d = a.charCodeAt(q - 3) << 24 | a.charCodeAt(q - 2) << 16 | a.charCodeAt(q - 1) << 8 | 128
                }
                for (G.push(d); 14 !== G.length % 16; )
                    G.push(0);
                G.push(q >>> 29);
                G.push(q << 3 & 4294967295);
                var N = G.length;
                for (a = 0; a < N; a += 16) {
                    for (d = 0; 16 > d; d++)
                        e[d] = G[a + d];
                    for (d = 16; 79 >= d; d++)
                        e[d] = c(e[d - 3] ^ e[d - 8] ^ e[d - 14] ^ e[d - 16], 1);
                    z = g;
                    q = k;
                    var A = n;
                    var B = h;
                    var L = y;
                    for (d = 0; 19 >= d; d++) {
                        var C = c(z, 5) + (q & A | ~q & B) + L + e[d] + 1518500249 & 4294967295;
                        L = B;
                        B = A;
                        A = c(q, 30);
                        q = z;
                        z = C
                    }
                    for (d = 20; 39 >= d; d++)
                        C = c(z, 5) + (q ^ A ^ B) + L + e[d] + 1859775393 & 4294967295,
                        L = B,
                        B = A,
                        A = c(q, 30),
                        q = z,
                        z = C;
                    for (d = 40; 59 >= d; d++)
                        C = c(z, 5) + (q & A | q & B | A & B) + L + e[d] + 2400959708 & 4294967295,
                        L = B,
                        B = A,
                        A = c(q, 30),
                        q = z,
                        z = C;
                    for (d = 60; 79 >= d; d++)
                        C = c(z, 5) + (q ^ A ^ B) + L + e[d] + 3395469782 & 4294967295,
                        L = B,
                        B = A,
                        A = c(q, 30),
                        q = z,
                        z = C;
                    g = g + z & 4294967295;
                    k = k + q & 4294967295;
                    n = n + A & 4294967295;
                    h = h + B & 4294967295;
                    y = y + L & 4294967295
                }
                C = b(g) + b(k) + b(n) + b(h) + b(y);
                return C.toLowerCase()
            },
            Na: function(a, b) {
                var c = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756]
                  , d = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344]
                  , e = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584]
                  , g = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928]
                  , k = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080]
                  , n = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312]
                  , h = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154]
                  , y = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];
                a = aa.Ma(a);
                var q = 0, G = b.length, z = 0, N = [0, 32, 2], A, B, L = "", C = "";
                try {
                    for (b += "\x00\x00\x00\x00\x00\x00\x00\x00"; q < G; ) {
                        var u = b.charCodeAt(q++) << 24 ^ b.charCodeAt(q++) << 16 ^ b.charCodeAt(q++) << 8 ^ b.charCodeAt(q++);
                        var t = b.charCodeAt(q++) << 24 ^ b.charCodeAt(q++) << 16 ^ b.charCodeAt(q++) << 8 ^ b.charCodeAt(q++);
                        var m = (u >>> 4 ^ t) & 252645135;
                        t ^= m;
                        u ^= m << 4;
                        m = (u >>> 16 ^ t) & 65535;
                        t ^= m;
                        u ^= m << 16;
                        m = (t >>> 2 ^ u) & 858993459;
                        u ^= m;
                        t ^= m << 2;
                        m = (t >>> 8 ^ u) & 16711935;
                        u ^= m;
                        t ^= m << 8;
                        m = (u >>> 1 ^ t) & 1431655765;
                        t ^= m;
                        u ^= m << 1;
                        u = u << 1 | u >>> 31;
                        t = t << 1 | t >>> 31;
                        for (B = 0; 3 > B; B += 3) {
                            var v = N[B + 1];
                            var E = N[B + 2];
                            for (A = N[B]; A !== v; A += E) {
                                var X = t ^ a[A];
                                var ja = (t >>> 4 | t << 28) ^ a[A + 1];
                                m = u;
                                u = t;
                                t = m ^ (d[X >>> 24 & 63] | g[X >>> 16 & 63] | n[X >>> 8 & 63] | y[X & 63] | c[ja >>> 24 & 63] | e[ja >>> 16 & 63] | k[ja >>> 8 & 63] | h[ja & 63])
                            }
                            m = u;
                            u = t;
                            t = m
                        }
                        u = u >>> 1 | u << 31;
                        t = t >>> 1 | t << 31;
                        m = (u >>> 1 ^ t) & 1431655765;
                        t ^= m;
                        u ^= m << 1;
                        m = (t >>> 8 ^ u) & 16711935;
                        u ^= m;
                        t ^= m << 8;
                        m = (t >>> 2 ^ u) & 858993459;
                        u ^= m;
                        t ^= m << 2;
                        m = (u >>> 16 ^ t) & 65535;
                        t ^= m;
                        u ^= m << 16;
                        m = (u >>> 4 ^ t) & 252645135;
                        t ^= m;
                        u ^= m << 4;
                        C += String.fromCharCode(u >>> 24, u >>> 16 & 255, u >>> 8 & 255, u & 255, t >>> 24, t >>> 16 & 255, t >>> 8 & 255, t & 255);
                        z += 8;
                        512 === z && (L += C,
                        C = "",
                        z = 0)
                    }
                } catch (Aa) {
                    w("ioc: error while to encrypting", Aa, !0)
                }
                return L + C
            },
            Ma: function(a) {
                var b = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], c = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], d = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], e = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], g = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], k = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], n = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], h = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], y = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], q = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], G = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], z = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], N = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], A = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261], B = [32], L = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0], C, u = C = 0, t, m = a.charCodeAt(C++) << 24 | a.charCodeAt(C++) << 16 | a.charCodeAt(C++) << 8 | a.charCodeAt(C++), v = a.charCodeAt(C++) << 24 | a.charCodeAt(C++) << 16 | a.charCodeAt(C++) << 8 | a.charCodeAt(C++);
                var E = (m >>> 4 ^ v) & 252645135;
                v ^= E;
                m ^= E << 4;
                E = (v >>> -16 ^ m) & 65535;
                m ^= E;
                v ^= E << -16;
                E = (m >>> 2 ^ v) & 858993459;
                v ^= E;
                m ^= E << 2;
                E = (v >>> -16 ^ m) & 65535;
                m ^= E;
                v ^= E << -16;
                E = (m >>> 1 ^ v) & 1431655765;
                v ^= E;
                m ^= E << 1;
                E = (v >>> 8 ^ m) & 16711935;
                m ^= E;
                v ^= E << 8;
                E = (m >>> 1 ^ v) & 1431655765;
                v ^= E;
                E = (m ^ E << 1) << 8 | v >>> 20 & 240;
                m = v << 24 | v << 8 & 16711680 | v >>> 8 & 65280 | v >>> 24 & 240;
                v = E;
                a = L.length;
                for (t = 0; t < a; t++) {
                    L[t] ? (m = m << 2 | m >>> 26,
                    v = v << 2 | v >>> 26) : (m = m << 1 | m >>> 27,
                    v = v << 1 | v >>> 27);
                    m &= -15;
                    v &= -15;
                    C = b[m >>> 28] | c[m >>> 24 & 15] | d[m >>> 20 & 15] | e[m >>> 16 & 15] | g[m >>> 12 & 15] | k[m >>> 8 & 15] | n[m >>> 4 & 15];
                    var X = h[v >>> 28] | y[v >>> 24 & 15] | q[v >>> 20 & 15] | G[v >>> 16 & 15] | z[v >>> 12 & 15] | N[v >>> 8 & 15] | A[v >>> 4 & 15];
                    E = (X >>> 16 ^ C) & 65535;
                    B[u++] = C ^ E;
                    B[u++] = X ^ E << 16
                }
                return B
            }
        }
          , Y = {
            za: 2,
            Ia: 3,
            ia: 4,
            fb: function(a, b) {
                a = Z(a);
                return !0 === ("boolean" === typeof a ? a : "boolean" === typeof b ? b : !1) ? Y.ia : Y.Ia
            }
        };
        Object.freeze && Object.freeze(Y);
        var Fa = function() {
            for (var a = "", b = !0, c = 0; c < na.length; c++) {
                var d = na[c]
                  , e = ia[d]
                  , g = void 0 === e.H || null === e.H;
                if ("object" !== typeof e) {
                    g = !1;
                    var k = "complete (not an object)";
                    w("allComplete expecting all collectors to be objects but received: " + typeof e, void 0, !0)
                } else
                    g || e.H === Y.ia ? (g = !e.j,
                    k = e.j ? "complete" : "incomplete") : (g = !1,
                    k = "complete (not enabled)");
                a += d + ": " + k + "; ";
                g && (b = !1)
            }
            V(a);
            return b
        };
        var Wa = function(a, b, c) {
            var d;
            O.io && O.io.getBlackbox && (d = O.io.getBlackbox(!0, c));
            d && d.blackbox && (a = d.blackbox + ";" + a,
            b = !0 === b && !0 === d.finished);
            return {
                blackbox: a,
                finished: b
            }
        };
        var f = {
            Ca: "",
            R: "",
            da: "",
            oa: void 0,
            ca: !0,
            g: {},
            D: [],
            Y: l.bb_max_len,
            hb: function() {
                var a = 0, b = "", c, d;
                var e = f.Y - 6;
                e = Math.floor(.75 * e);
                e = e - (e % 4 + 4) - 4;
                f.add("LOST", "0000;00000", 1);
                4E3 > f.Y && f.remove("FFONTS");
                var g = f.D.length;
                var k = f.D.join("").length;
                for (d = c = 0; d < g; d++)
                    c += f.g[f.D[d]].length;
                k = 8 * g + k + c;
                for (d = 0; d < g; d++)
                    if (c = f.D[d],
                    "string" === typeof c && "string" === typeof f.g[c]) {
                        c = I.ua(c.length, 4) + c.toUpperCase() + I.ua(f.g[c].length, 4) + f.g[c];
                        var n = c.length;
                        if (0 >= f.Y || b.length + n + 3 < e)
                            a++,
                            b += c
                    }
                b.length !== k || a !== g ? (d = k - b.length,
                g = I.o(g - a, 4) + ";" + I.o((99999 >= d ? d : "100k+").toString(), 5),
                b = b.replace("0004LOST000a0000;00000", "0004LOST000A" + g)) : (--a,
                b = b.replace("0004LOST000a0000;00000", ""));
                return I.ua(a, 4) + b
            },
            ta: function() {
                var a = ""
                  , b = String.fromCharCode(124, 76, 69, 0, 99, 2, 200, 163);
                try {
                    var c = aa.Na(b, f.hb());
                    var d = "0400" + D.encode(c);
                    0 >= f.Y || d.length <= f.Y ? (a = d,
                    f.Ca = d) : a = f.Ca
                } catch (e) {
                    w("", e, !0)
                }
                return a
            },
            Ba: function(a) {
                return a && "string" === typeof a && 0 < a.length
            },
            La: function(a, b) {
                var c = !1;
                a in f.g && (c = f.g[a] === b || f.g[a] === aa.va(b));
                return c
            },
            add: function(a, b, c) {
                f.Ba(a) && f.Ba(b) && (b = b.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ""),
                b = aa.va(b),
                0 > f.D.indexOf(a) && (c ? f.D.unshift(a) : f.D.push(a)),
                f.g[a] !== b && (f.g[a] = b,
                f.ca = !0,
                f.pa()))
            },
            remove: function(a) {
                var b;
                if (f.g[a]) {
                    delete f.g[a];
                    for (b = f.D.indexOf(a); 0 <= b; )
                        f.D.splice(b, 1),
                        b = f.D.indexOf(a);
                    f.ca = !0;
                    f.pa()
                }
            },
            pa: function() {
                "number" !== typeof f.oa && (f.oa = setTimeout(function() {
                    f.update()
                }, 100))
            },
            update: function() {
                var a = ""
                  , b = ""
                  , c = Fa();
                try {
                    if (f.ca || c) {
                        Ba();
                        f.add("JINT", f.R);
                        typeof l.bb_callback === p.G ? (f.R = "callback",
                        l.cbflag = !0,
                        a = f.ta(),
                        b = c,
                        f.da = l.bb_callback) : l[p.s] && K.getElementById(l[p.s]) && (f.R = "form",
                        a = f.ta(),
                        b = c,
                        f.da = kb);
                        if (!0 === l[p.O]) {
                            var d = Wa(a, b, f.R);
                            a = d.blackbox;
                            b = d.finished
                        }
                        f.da && (f.da(a, b),
                        l.cbflag = !1);
                        f.oa = void 0;
                        f.ca = !1
                    }
                    var e = !0
                } catch (g) {
                    w("io_bb.update", g, !0),
                    e = !1
                }
                return e
            },
            truncate: function(a, b) {
                return a && a.slice && null !== b && void 0 !== b && 0 <= b ? a.slice(0, b) : a
            }
        };
        f.pa();
        var fa = function() {
            var a = {
                Aa: "OFF",
                ya: "STARTING",
                xa: "POLLING"
            };
            Object.freeze && Object.freeze(a);
            var b = a.Aa
              , c = null;
            return {
                X: null,
                get Xa() {
                    return b === a.Aa
                },
                get Wa() {
                    return b === a.ya
                },
                get Va() {
                    return b === a.xa
                },
                ab: function() {
                    var d = a.ya;
                    this.X && (c && clearInterval(c),
                    c = setInterval(this.X, 100),
                    b = d)
                },
                $a: function() {
                    var d = a.xa;
                    this.X && (c && clearInterval(c),
                    c = setInterval(this.X, 2E3),
                    b = d)
                }
            }
        }();
        l.getBlackbox = function(a, b) {
            var c;
            typeof a !== p.u && (a = !1);
            O.io && O.io.cbflag && (c = O.io.cbflag);
            if (l.cbflag || !b && c)
                b = {
                    blackbox: D.decode("SW52YWxpZCBJbnRlZ3JhdGlvbjogY2Fubm90IGNhbGwgZ2V0QmxhY2tib3ggZnJvbSBpbnNpZGUgYmJfY2FsbGJhY2su"),
                    finished: Fa()
                };
            else if (sa(),
            f.R = b || p.G,
            f.add("JINT", f.R),
            b = {
                blackbox: f.ta(),
                finished: Fa()
            },
            !a) {
                try {
                    Ba()
                } catch (d) {
                    w("", d, !0)
                }
                l[p.O] && (b = Wa(b.blackbox, b.finished, null))
            }
            return b
        }
        ;
        !0 === l[p.O] && (O.getBlackbox = l.getBlackbox);
        Ra.prototype = {
            N: function() {
                this.i = !0;
                try {
                    if (x.localStorage) {
                        var a = x.localStorage.getItem(this.name) || x.localStorage.getItem("fp_temp");
                        if (a)
                            da && (qa(a) ? (x.localStorage.getItem(this.name) || x.localStorage.setItem(this.name, a),
                            f.add("LSTOKEN", a, !0),
                            this.h = a) : f.add("LSERROR", p.ea + I.aa(a)));
                        else if (1 === da)
                            if (qa(this.h)) {
                                x.localStorage.setItem(this.name, this.h);
                                var b = x.localStorage.getItem(this.name);
                                qa(b) ? f.add("LSTOKEN", b, !0) : f.add("LSERROR", D.decode("dG9rZW4gbm90IHBlcnNpc3Rpbmc="))
                            } else
                                f.add("LSERROR", p.ea + I.aa(this.h))
                    }
                } catch (c) {
                    f.add("LSERROR", w("", c, !0)),
                    V(D.decode("bHNwOiBMb2NhbFN0b3JhZ2UgY29sbGVjdGlvbiBmYWlsZWQuLi4="))
                }
                this.j = !0;
                this.h && ea && (this.J = !0)
            }
        };
        Qa.prototype = {
            cb: function() {
                var a, b, c;
                if (F && F.userAgent) {
                    var d = F.userAgent.match(/\([^)]*\)/g);
                    var e = d.length;
                    if (d)
                        for (a = 0; a < e; a++)
                            if (c = d[a].match(/[^;]*;?/g)) {
                                var g = c.length;
                                for (b = 0; b < g; b++)
                                    if (0 < c[b].length && "undefined" !== typeof this.h) {
                                        var k = c[b].replace(/[();]/g, "").trim();
                                        this.h.push(k)
                                    }
                            }
                    this.I = F.userAgent.match(/([\w]+\s )?[^\s/]*\/[^\s]*/g)
                }
            },
            Ya: function() {
                var a = "MSIE Maxthon Minimo AOL Browser iCab Lunascape".split(" "), b = a.length, c, d;
                if (this.h) {
                    var e = this.h.length;
                    for (c = 0; c < b; c++) {
                        var g = new RegExp("^.*" + a[c] + " ?[^0-9.]*","g");
                        for (d = 0; d < e; d++)
                            if (0 <= this.h[d].toUpperCase().search(a[c].toUpperCase())) {
                                this.version = this.h[d].replace(g, "").replace(/\s+/g, "");
                                this.version === this.h[d] && (this.version = "");
                                0 < c ? (c = new RegExp(this.version + "$","g"),
                                this.B = this.h[d].replace(c, "")) : this.B = "Internet Explorer";
                                return
                            }
                    }
                }
                b = "Classilla;Gnuzilla;SeaMonkey;Maxthon;K-Meleon;Flock;Epic;Camino;Firebird;Conkeror;Fennec;Skyfire;MicroB;GranParadiso;Opera Mini;Netscape;Sleipnir;Browser;IceCat;weasel;iCab;Opera;OPR;OPiOS;Minimo;Konqueror;Galeon;Lunascape;Thunderbird;BonEcho;Navigator;Epiphany;Minefield;TizenBrowser;Namoroka;Shiretoko;NetFront;IEMobile;Puffin;Firefox;FxiOS;Edge;Edg;Chrome;CriOS;Safari;Mobile;Mobile Safari;Trident".split(";");
                g = b.length;
                if (this.I)
                    for (e = this.I.length,
                    c = 0; c < g; c++)
                        for (d = 0; d < e; d++)
                            if (a = this.I[d].split("/"))
                                if (this.B || (this.B = a[0],
                                this.version = a[1].replace(";$", "")),
                                0 <= a[0].toUpperCase().search(b[c].toUpperCase())) {
                                    this.B = a[0];
                                    this.version = a[1].replace(";$", "");
                                    return
                                }
            },
            bb: function() {
                var a = "Linux;Windows Phone;Android;BSD;Ubuntu;Irix;MIDP;Xbox One;Xbox;Windows ;Mac OS X;Debian;Mac;Playstation;Wii;Win9;BlackBerry;WinNT;iPhone;iPad;OS".split(";"), b = a.length, c, d;
                if (this.h) {
                    var e = this.h.length;
                    for (c = 0; c < b; c++)
                        for (d = 0; d < e; d++)
                            if (0 <= this.h[d].toUpperCase().search(a[c].toUpperCase()) && (this.W = this.h[d],
                            0 < c))
                                return
                }
                a = "BlackBerry;MIDP;Debian;Ubuntu;BSD;AIX;Irix;Gentoo;Fedora;Red Hat;OS".split(";");
                b = a.length;
                if (e = this.I) {
                    var g = e.length;
                    for (c = 0; c < b; c++)
                        for (d = 0; d < g; d++)
                            if (0 <= e[d].toUpperCase().search(a[c].toUpperCase())) {
                                this.W = e[d].replace("/", " ").replace(/\s+/g, " ");
                                return
                            }
                }
            }
        };
        var r = {
            max: function(a) {
                return Math.max.apply(null, a)
            },
            round: function(a, b) {
                if ("number" === typeof a && "number" === typeof b) {
                    b = parseInt(b, 10);
                    b = Math.pow(10, b);
                    var c = Math.round(a * b) / b
                }
                return c
            },
            ha: function(a) {
                a = a.slice();
                var b = Math.floor(a.length / 2);
                if (0 === a.length)
                    var c = NaN;
                else
                    a.sort(function(d, e) {
                        return d - e
                    }),
                    1 === a.length % 2 ? c = a[b] : c = (a[b - 1] + a[b]) / 2;
                return c
            },
            Ha: function(a) {
                var b = 0, c = a.length, d;
                for (d = 0; d < c; d++) {
                    var e = a[d];
                    b += e
                }
                return b
            },
            F: function(a) {
                return r.Ha(a) / a.length
            },
            Ga: function(a) {
                a = a.slice();
                var b = r.F(a), c = [], d = a.length, e;
                for (e = 0; e < d; e++) {
                    var g = a[e];
                    g -= b;
                    g = Math.pow(g, 2);
                    c.push(g)
                }
                return Math.sqrt(r.Ha(c) / d)
            },
            Z: function(a) {
                var b = a.length;
                if (2 > b)
                    return NaN;
                var c = r.F(a);
                a = a.reduce(function(d, e) {
                    e -= c;
                    return d + e * e
                }, 0) / (b - 1);
                return Math.sqrt(a)
            },
            Ja: function(a) {
                var b = a.v;
                a = a.A;
                var c = r.F(b), d = r.F(a), e = r.Ga(b), g = r.Ga(a), k = b.length, n = 0, h;
                if (0 === e * g)
                    b = 1;
                else {
                    for (h = 0; h < k; h++) {
                        var y = (b[h] - c) / e;
                        var q = (a[h] - d) / g;
                        n += y * q
                    }
                    b = Math.abs(n / k)
                }
                return b
            },
            ra: function(a) {
                var b = a.length;
                if (3 > b)
                    return NaN;
                var c = r.F(a)
                  , d = r.Z(a);
                if (0 === d)
                    return NaN;
                a = a.reduce(function(e, g) {
                    return e + Math.pow((g - c) / d, 3)
                }, 0);
                return b / ((b - 1) * (b - 2)) * a
            },
            ma: function(a) {
                var b = a.length;
                if (4 > b)
                    return NaN;
                var c = r.F(a)
                  , d = r.Z(a);
                if (0 === d)
                    return NaN;
                a = a.reduce(function(e, g) {
                    return e + Math.pow((g - c) / d, 4)
                }, 0);
                return b * (b + 1) / ((b - 1) * (b - 2) * (b - 3)) * a - 3 * (b - 1) * (b - 1) / ((b - 2) * (b - 3))
            },
            getStringValue: function(a) {
                return "number" === typeof a ? a.toString() : "NaN"
            }
        };
        l.handleATRIPResponse = function() {}
        ;
        var T = {
            label: "io_sdp",
            j: !1,
            i: !1,
            J: !0,
            wa: !1,
            Sa: function() {
                function a(d) {
                    var e = d.toGMTString().split(" ");
                    e = new Date(e.pop() && e.join(" "));
                    return Math.round((e - d) / 6E4)
                }
                var b = (new Date).getFullYear()
                  , c = a(new Date(b,0,1,0,0,0,0));
                b = a(new Date(b,6,1,0,0,0,0));
                return Math.max(c, b)
            },
            N: function() {
                if (!T.i)
                    try {
                        T.i = !0;
                        var a, b = "";
                        var c = I.Qa(new Date);
                        K.URL ? f.add("INTLOC", K.URL.split("?")[0]) : K.documentURI && f.add("INTLOC", K.documentURI.split("?")[0]);
                        f.add("STVER", la);
                        var d, e = null == (d = l[p.C]) ? void 0 : d.loaderVer, g = f.truncate(e, 40);
                        f.add("LDVER", g);
                        f.add("BBNS", "FP");
                        f.add("TZON", T.Sa().toString());
                        F && F.userAgent && f.add("UAGT", F.userAgent.slice(0, 400));
                        if (screen) {
                            f.add("JRES", screen.height + "x" + screen.width);
                            var k;
                            f.add("JCLDPT", null == (k = screen.colorDepth) ? void 0 : k.toString())
                        }
                        f.add("JENBL", "1");
                        var n = new Qa;
                        f.add("JBRNM", n.B);
                        f.add("JBRVR", n.version);
                        f.add("JBROS", n.W);
                        if (F) {
                            if (Ea) {
                                var h = F.plugins.length;
                                for (a = 0; a < h; a++)
                                    b += F.plugins[a].filename + ";";
                                f.add("JPLGNS", b)
                            }
                            f.add("JLANG", F.language || F.systemLanguage);
                            var y;
                            f.add("JLANGS", null == (y = F.languages) ? void 0 : y.toString());
                            f.add("JCOX", F.cookieEnabled ? "" : "1")
                        }
                        if (n) {
                            var q = new RegExp("^.*" + n.W + ";? ?","g");
                            if (n.h) {
                                var G = n.h.join("; ");
                                f.add("JBRCM", G.replace(q, ""))
                            }
                        }
                        f.add("JSTIME", c.substr(0, 19), !0);
                        var z = Ka("static");
                        V(' { "staticStatus": ' + z.isUnex + ", 'scriptList': \"" + z.scriptList + '" }');
                        f.add("MIST", z.scriptList);
                        ra && l.enable_wstrip ? hb() : ca();
                        F && (f.add("NPLAT", F.platform),
                        f.add("APVER", F.appVersion),
                        f.add("OSCPU", F.oscpu),
                        f.add("CCUR", F.hardwareConcurrency && F.hardwareConcurrency.toString()));
                        f.add("JREFRR", K.referrer);
                        gb("offline", "OFFLN");
                        fb();
                        (ya || void 0 === ya) && P("devicemotion", Ma);
                        (ya || void 0 === ya) && P("deviceorientation", La);
                        lb();
                        P("mousemove", Q);
                        P("mousedown", Q);
                        P("mouseup", Q);
                        P("touchstart", Q);
                        P("touchend", Q);
                        P("keydown", Q);
                        P("keyup", Q);
                        P("wheel", Q);
                        P("scroll", Q);
                        P("pointermove", Q);
                        P("pointerdown", Q);
                        typeof l[p.ba] === p.G && f.add("TRACE", "1");
                        f.add("BBOUT", l[p.s])
                    } catch (N) {
                        f.add("EMSG", w("io_sdp:", N, !0))
                    }
                T.j = T.i && T.wa
            }
        }
          , U = l.io_ddp = {
            label: "io_ddp",
            j: !1,
            i: !1,
            J: !1,
            N: function() {
                var a = ea;
                if (a) {
                    U.i = !0;
                    if (!U.j) {
                        try {
                            var b = a.nuidIndex, c = b && b.length, d;
                            for (d = 0; d < c; d++) {
                                var e = a[b[d]];
                                var g = b[d].toUpperCase();
                                var k = -1 < g.indexOf("TOKEN") || "SVRTIME" === g;
                                f.add(g, e, k)
                            }
                            F.userAgent === f.g.SUAGT ? f.remove("SUAGT") : f.add("JDIFF", "1");
                            if (ka = f.g.JSTOKEN)
                                da ? qa(ka) || (f.remove("JSTOKEN"),
                                f.add("JTERR", p.ea + I.aa(ka))) : (f.remove("JSTOKEN"),
                                f.add("FLRTD", ka))
                        } catch (n) {
                            f.add("EMSG", w(D.decode("aW9fZGRwOiBlcnJvciBoYW5kbGluZyBkeW4gZGF0YQ=="), n, !0))
                        }
                        U.j = !0
                    }
                    U.J = !0
                } else
                    l[p.C] && l[p.C]["fp" + D.decode("X2R5bl93ZHBfbG9hZF9mYWlsdXJl")] ? U.j = !0 : Ua ? U.j = !0 : w(D.decode("aW9fZGRwLmNvbGxlY3Q6IGlvX2R5bl9vYmogdW5kZWZpbmVk"), "", !0)
            },
            _if_ubb: function() {
                1 === da && U && U._CTOKEN && (qa(U._CTOKEN) ? f.add("CTOKEN", U._CTOKEN, !0) : f.add("CTERR", p.ea + I.aa(U._CTOKEN)))
            }
        }
          , Xa = {
            label: "nidCollector",
            j: !0,
            i: !1,
            J: !1,
            ja: !0,
            N: function() {
                Xa.i = !0;
                var a = window.nid;
                if (a) {
                    var b = a.getUserId;
                    b && b() ? (b = b().toString(),
                    100 < b.length && (b = b.substring(0, 100)),
                    f.La("BAID", b) || (f.add("BAID", b),
                    f.remove("BAERR"),
                    pa && f.add("BADGER", ((new Date).getTime() - pa).toString()))) : f.add("BAERR", "userId is not defined but BA library is present");
                    var c;
                    a.getVersion ? c = a.getVersion() : a.version && (c = a.version);
                    c && f.add("BAVER", c)
                }
            }
        }
          , Ya = {
            label: "io_cv",
            j: !1,
            i: !1,
            J: !0,
            ja: !1,
            H: Y.za,
            kb: "attribute vec2 a_position; \nattribute vec4 a_color; \nuniform mat3 u_matrix; \nvarying vec4 v_color; \nvoid main() { \n   vec2 position = (u_matrix * vec3(a_position, 1)).xy; \n   gl_Position = vec4(position, 0, 1); \n   v_color = a_color; \n} \n",
            Ra: "precision mediump float; \nvarying vec4 v_color; \nvoid main() { \tgl_FragColor = v_color; \n} \n",
            createShader: function(a, b, c) {
                b = a.createShader(b);
                a.shaderSource(b, c);
                a.compileShader(b);
                if (!a.getShaderParameter(b, a.COMPILE_STATUS))
                    throw Error(a.getShaderInfoLog(b));
                return b
            },
            createProgram: function(a, b, c) {
                var d = a.createProgram();
                a.attachShader(d, b);
                a.attachShader(d, c);
                a.linkProgram(d);
                if (!a.getProgramParameter(d, a.LINK_STATUS))
                    throw Error(a.getProgramInfoLog(d));
                return d
            },
            m: function(a, b) {
                var c = a.getError();
                if (c !== a.NO_ERROR)
                    throw Error(b + c);
            },
            Ka: function(a, b, c) {
                var d = this.createShader(b, b.VERTEX_SHADER, this.kb)
                  , e = this.createShader(b, b.FRAGMENT_SHADER, this.Ra);
                d = this.createProgram(b, d, e);
                e = b.getAttribLocation(d, "a_position");
                if (-1 === e)
                    throw Error("Unable to find attribute location for a_position");
                var g = b.getAttribLocation(d, "a_color");
                if (-1 === g)
                    throw Error("Unable to find attribute location for a_color");
                var k = b.getUniformLocation(d, "u_matrix");
                if (null === k)
                    throw Error("Unable to find attribute location for u_matrix");
                var n = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, n);
                var h = [0, 0, 0, .5, .7, 0, 0, -.1, .35, .7, .5, -.1];
                b.bufferData(b.ARRAY_BUFFER, new Float32Array(h), b.STATIC_DRAW);
                this.m(b, "Error buffering position data: ");
                var y = b.createBuffer();
                b.bindBuffer(b.ARRAY_BUFFER, y);
                b.bufferData(b.ARRAY_BUFFER, new Float32Array([1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, .8, 0, 1, 1, .8, 1, 0, 1, .8]), b.STATIC_DRAW);
                this.m(b, "Error buffering color data: ");
                b.viewport(0, 0, b.canvas.width, b.canvas.height);
                this.m(b, "Error setting viewport: ");
                b.clearColor(0, 0, 0, 0);
                b.clear(b.COLOR_BUFFER_BIT);
                this.m(b, "Error clearing: ");
                b.enable(b.BLEND);
                b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
                this.m(b, "Error enabling blend: ");
                b.useProgram(d);
                b.enableVertexAttribArray(e);
                this.m(b, "Error enabling vertex attribute for position: ");
                b.bindBuffer(b.ARRAY_BUFFER, n);
                this.m(b, "Error binding buffer for position: ");
                b.vertexAttribPointer(e, 2, b.FLOAT, !1, 0, 0);
                this.m(b, "Error in vertexAttribPointer for position: ");
                b.enableVertexAttribArray(g);
                this.m(b, "Error enabling vertex attribute for color: ");
                b.bindBuffer(b.ARRAY_BUFFER, y);
                this.m(b, "Error binding buffer for color: ");
                b.vertexAttribPointer(g, 4, b.FLOAT, !1, 0, 0);
                this.m(b, "Error in vertexAttribPointer for color: ");
                b.uniformMatrix3fv(k, !1, [1.5863117781980967, -.20884190755208254, 0, .20884190755208254, 1.5863117781980967, 0, -.3, -.2, 1]);
                this.m(b, "Error setting uniform matrix: ");
                b.drawArrays(b.TRIANGLES, 0, h.length / 2);
                this.m(b, "Error drawing arrays: ");
                a = a.toDataURL();
                return c(a)
            },
            Ta: function(a) {
                var b = {}
                  , c = a.getExtension("WEBGL_debug_renderer_info");
                c && (b.jb = a.getParameter(c.UNMASKED_VENDOR_WEBGL),
                b.ib = a.getParameter(c.UNMASKED_RENDERER_WEBGL));
                if (c = a.getSupportedExtensions())
                    c = aa.qa(c.join()),
                    b.Pa = c;
                c = "ALIASED_POINT_SIZE_RANGE MAX_VIEWPORT_DIMS MAX_VARYING_VECTORS MAX_COMBINED_TEXTURE_IMAGE_UNITS SHADING_LANGUAGE_VERSION MAX_TEXTURE_IMAGE_UNITS SAMPLE_BUFFERS".split(" ").map(function(d) {
                    var e = a.getParameter(a[d]);
                    "SHADING_LANGUAGE_VERSION" === d && e && (e = aa.qa(e).slice(0, 8));
                    return e
                });
                b.eb = c.join(";");
                return b
            },
            N: function() {
                V("cv collect()");
                Ya.i = !0;
                try {
                    var a = document.createElement("canvas");
                    var b = a.getContext("webgl") || a.getContext("experimental-webgl");
                    if (!b)
                        throw Error("WebGL not supported");
                } catch (k) {
                    a = f.truncate(k.message, 100);
                    f.add("CVERR", a);
                    f.add("GLERR", a);
                    return
                }
                try {
                    var c = this.Ta(b)
                      , d = f.truncate(c.jb, 100);
                    f.add("GLUV", d);
                    var e = f.truncate(c.ib, 200);
                    f.add("GLUR", e);
                    f.add("GLEL", c.Pa);
                    f.add("GLOPS", c.eb)
                } catch (k) {
                    c = f.truncate(k.message, 100),
                    f.add("GLERR", c)
                }
                try {
                    var g = this.Ka(a, b, aa.qa);
                    f.add("CVGRAD", g)
                } catch (k) {
                    a = f.truncate(k.message, 100),
                    f.add("CVERR", a)
                }
                this.j = !0
            }
        }
          , nb = {
            label: "io_au",
            j: !1,
            i: !1,
            J: !0,
            ja: !1,
            H: Y.za,
            gb: function(a) {
                try {
                    var b = window.OfflineAudioContext || window.webkitOfflineAudioContext;
                    if (!b)
                        throw Error("Audio context is not defined");
                    var c = new b(1,2E5,95E3)
                      , d = c.createOscillator();
                    d.type = "sawtooth";
                    d.frequency.value = 3E3;
                    var e = c.createDynamicsCompressor();
                    e.threshold.value = -80;
                    e.knee.value = 40;
                    e.ratio.value = 12;
                    e.reduction.value = -20;
                    e.attack.value = .003;
                    e.release.value = 0;
                    d.connect(e);
                    e.connect(c.destination);
                    d.start(0);
                    c.oncomplete = function(g) {
                        try {
                            var k, n = null == g ? void 0 : null == (k = g.renderedBuffer) ? void 0 : k.getChannelData(0);
                            if (!n)
                                throw Error("No PCM data");
                            var h = n.reduce(function(y, q) {
                                return y + Math.abs(q)
                            }).toString();
                            a(null, h)
                        } catch (y) {
                            a(y)
                        }
                    }
                    ;
                    c.startRendering()
                } catch (g) {
                    a(g)
                }
            },
            N: function(a) {
                var b = this;
                V("au collect()");
                this.i = !0;
                this.gb(function(c, d) {
                    try {
                        if (c) {
                            var e = f.truncate(c.toString(), 100);
                            f.add("AUDERR", e)
                        } else {
                            var g = f.truncate(d, 50);
                            f.add("AUD", g)
                        }
                        b.j = !0;
                        a && a()
                    } catch (k) {
                        V("Error in au collect: " + k.toString())
                    }
                })
            }
        };
        try {
            ha("io_sdp", T);
            ha("io_ddp", l.io_ddp);
            var Ga = new Ra("f604be51-ccf5-4d26-9cc2-3c44e1fdceb9");
            ha("io_ls", Ga);
            ha("nidCollector", Xa);
            ha("io_cv", Ya);
            ha("io_au", nb)
        } catch (a) {
            w("io_collect", a, !0)
        }
        var Ja = 0;
        fa.Xa && (fa.X = eb,
        fa.ab());
        K.addEventListener && K.addEventListener("DOMContentLoaded", sa, va);
        (function() {
            l.api = {
                io_bb: {
                    add: function(a, b) {
                        return f.add(a, b)
                    }
                },
                ds_cb: function(a, b) {
                    var c;
                    if (ea = a) {
                        var d = ea.jsver;
                        a = ea.jstoken;
                        ea.skey && (c = x.encodeURIComponent(ea.skey));
                        ta = (l.contentServerHost || "").replace(/\/+$/, "");
                        Da = ("/" + (l.ctokenScriptPath || "")).replace(/\/\//g, "/").replace(/\/+$/, "");
                        var e = Ka("dyn");
                        V(' { "dynStatus": ' + e.isUnex + ", 'scriptList': \"" + e.scriptList + '" }');
                        da = !1 === e.isUnex ? 1 : 0;
                        e.isUnex && f.add("FULOC", e.scriptList);
                        e = /^\d+\.\d+\.\d+$/;
                        e.test(la) && e.test(d) && la.split(".")[0] === d.split(".")[0] || w("ver mismatch: ( S:" + la + ", D:" + d + " )", void 0, !0);
                        try {
                            da && (ka = a,
                            Ga && (Ga.h = ka),
                            ra && l.enable_rtc && J())
                        } catch (h) {
                            w("", h, !0)
                        }
                        a = "";
                        d = la;
                        Va && (d = d.replace(/\./g, "-"));
                        try {
                            var g = K.getElementsByTagName("head")[0];
                            var k = K.createElement("script");
                            k.setAttribute("language", "javascript");
                            k.setAttribute("type", "text/javascript");
                            if (Da) {
                                var n = Da;
                                n = c ? n.replace("latest", d + "/" + c) : n.replace("latest", d);
                                a += n;
                                a = a.replace("/iojs", xa).replace(/\/\//g, "/");
                                k.setAttribute("src", a);
                                g.appendChild(k)
                            } else
                                w("unable to find logo.js url", void 0, !0)
                        } catch (h) {
                            w("", h, !0)
                        }
                    }
                    mb(b);
                    sa(!0)
                },
                sic: function() {
                    return 0 === da
                },
                logError: function(a, b, c) {
                    return w(a, b, c)
                },
                decode: function(a) {
                    return D.decode(a)
                },
                last_error: l[p.ga],
                stver: la
            }
        }
        )()
    }
    )();
}
).call(this);