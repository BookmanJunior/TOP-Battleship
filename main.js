(() => {
  function e() {
    const e = [];
    for (let t = 0; t < 2; t++) e.push(Math.floor(10 * Math.random()));
    return e;
  }
  function t(a) {
    let n = e();
    const r = a.attackedSquares;
    if (r.length)
      for (let e = 0; e < r.length; e++)
        for (; r[e][0] === n[0] && r[e][1] === n[1]; ) n = t(a);
    return n;
  }
  const a = (t, a) => {
    let n = [];
    let r = [];
    let o = !1;
    let s = [5, 4, 3, 2, 2];
    const i = (e, t) => {
      if (!d(t)) return;
      const r = a(e);
      const s = r.info;
      const i = c(e, t);
      return i
        ? (s.coordinates.push(...i),
          n.push(r),
          (function (e) {
            const t = [
              [-1, 1],
              [-1, -1],
              [1, 0],
              [-1, 0],
              [0, 1],
              [0, -1],
              [1, 1],
              [1, -1],
            ];
            const a = e.info.coordinates;
            for (let n = 0; n < a.length; n++) {
              const r = a[n][0];
              const s = a[n][1];
              o
                ? (n === 0 &&
                    r - 1 >= 0 &&
                    e.info.adjacentSquares.push([r - 1, s]),
                  n === a.length - 1 &&
                    r + 1 <= 9 &&
                    e.info.adjacentSquares.push([r + 1, s]))
                : (n === 0 &&
                    s - 1 >= 0 &&
                    e.info.adjacentSquares.push([r, s - 1]),
                  n === a.length - 1 &&
                    s + 1 <= 9 &&
                    e.info.adjacentSquares.push([r, s + 1]));
              for (let a = 0; a < t.length; a++) {
                const n = t[a][0] + r;
                const o = t[a][1] + s;
                l([n, o]) &&
                  !u(e.info.adjacentSquares, [n, o]) &&
                  n !== r &&
                  o !== s &&
                  e.info.adjacentSquares.push([n, o]);
              }
            }
          })(r),
          r)
        : void 0;
    };
    function c(e, t) {
      const a = [];
      for (let n = 0; n < e; n++) {
        const e = [t[0], t[1] + n];
        const r = [t[0] + n, t[1]];
        const s = o ? r : e;
        if (!d(s)) return;
        a.push(s);
      }
      return a;
    }
    function u(e, t) {
      return e.find((e) => e.every((e, a) => e === t[a]));
    }
    function d(e) {
      return (
        l(e) && !p("coordinates", e).length && !p("adjacentSquares", e).length
      );
    }
    function l(e) {
      return e[0] >= 0 && e[0] <= 9 && e[1] >= 0 && e[1] <= 9;
    }
    function p(e, t) {
      return n.filter((a) =>
        a.info[e].find((e) => e.every((e, a) => e === t[a]))
      );
    }
    return {
      placeShip: i,
      changePlacementPlane: () => {
        o = !o;
      },
      receiveAttack: (e) => {
        const t = p("coordinates", e);
        if (t.length) {
          t[0].hit(), (t[0].info.isSunk = !!t[0].isSunk()), r.push(e);
          const a = t[0].isSunk() ? t[0].info : "hit";
          return (
            typeof a === "object" && r.push(...t[0].info.adjacentSquares), a
          );
        }
        return r.push(e), "miss";
      },
      allShipsSunk: () => n.every((e) => e.info.isSunk),
      randomizeShipPlacement: () => {
        for (let t = 0; t < s.length; t++) {
          const a = Math.floor(2 * Math.random());
          o = !!a;
          let n = e();
          for (; !i(s[t], n); ) n = e();
        }
      },
      getNewCoordinates: c,
      getAvailableShips: () => s,
      resetShips: () => {
        n = [];
      },
      resetAttackedSquares: () => {
        r = [];
      },
      resetAvailableShips: () => {
        s = [5, 4, 3, 2, 2];
      },
      get attackedSquares() {
        return r;
      },
      get ships() {
        return n;
      },
      get name() {
        return t;
      },
    };
  };
  const n = (e) => {
    const t = {
      length: e,
      hitCount: 0,
      isSunk: !1,
      coordinates: [],
      adjacentSquares: [],
    };
    return {
      hit: () => {
        t.hitCount += 1;
      },
      isSunk: () => t.length === t.hitCount,
      get info() {
        return t;
      },
    };
  };
  const r = (e) => ({ attack: (t) => e.receiveAttack(t) });
  const o = () => {
    const e = document.getElementById("main");
    const t = (e, t) => {
      a(e, t.coordinates, "occupied", "ship");
    };
    function a(e, t, a, n) {
      const r = document.querySelector(`.${e.name}`);
      t.forEach((e) => {
        r.querySelector(`[data-coordinates="${e}"]`).dataset[a] = n;
      });
    }
    return {
      renderBoard: (t, a) => {
        const n = ((e, t) => {
          const a = {
            A: 1,
            B: 2,
            C: 3,
            D: 4,
            E: 5,
            F: 6,
            G: 7,
            H: 8,
            I: 9,
            J: 10,
          };
          return {
            createGameboardComponents() {
              const e = document.createElement("div");
              e.classList.add("gameboard-wrapper");
              const n = (function () {
                const e = document.createElement("div");
                return (
                  e.classList.add(`${t}-fleet`, "fleet-sign"),
                  (e.textContent = e.classList.contains("player1-fleet")
                    ? "Your Fleet"
                    : "Opponent"),
                  e
                );
              })();
              const r = (function () {
                const e = document.createElement("div");
                e.classList.add("row-numeration");
                for (const t of Object.values(a)) {
                  const a = document.createElement("p");
                  (a.textContent = t), e.appendChild(a);
                }
                return e;
              })();
              const o = (function () {
                const e = document.createElement("div");
                e.classList.add("column-letters");
                for (const t of Object.keys(a)) {
                  const a = document.createElement("p");
                  (a.textContent = t), e.appendChild(a);
                }
                return e;
              })();
              const s = (function () {
                const e = document.createElement("div");
                e.classList.add(`${t}-gameboard`, "gameboard");
                for (let t = 0; t < 10; t++) {
                  const a = document.createElement("div");
                  a.classList.add("row");
                  for (let e = 0; e < 10; e++) {
                    const n = document.createElement("div");
                    n.classList.add("square"),
                      (n.dataset.coordinates = [t, e]),
                      (n.dataset.status = "none"),
                      (n.dataset.occupied = "empty"),
                      (n.dataset.name = ""),
                      a.appendChild(n);
                  }
                  e.appendChild(a);
                }
                return e;
              })();
              return e.append(n, r, o, s), e;
            },
          };
        })(0, a);
        e.appendChild(n.createGameboardComponents());
      },
      renderShip: t,
      updateSquare: a,
      updateAttackedSquare: (e, n, r) => {
        if (typeof r === "object")
          return (
            t(e, r),
            ((e, t) => {
              a(e, t.adjacentSquares, "status", "fog");
            })(e, r),
            void (n.dataset.status = "hit")
          );
        n.dataset.status = r;
      },
    };
  };
  (() => {
    const e = (() => {
      const e = a("player1-gameboard", n);
      const t = a("player2-gameboard", n);
      const o = r(t);
      const s = r(e);
      const i = "playing";
      const c = "placing-ship";
      const u = "gameover";
      let d = o;
      let l = e;
      let p = c;
      let h = "ai";
      function m() {
        (d = d === o ? s : o), f();
      }
      function g() {
        switch (p) {
          case "playing":
            p = u;
            break;
          case "placing-ship":
            p = i;
            break;
          case "gameover":
            p = c;
        }
      }
      function f() {
        l = l === t ? e : t;
      }
      return {
        playRound(a) {
          const n = d.attack(a);
          return (e.allShipsSunk() || t.allShipsSunk()) && g(), m(), n;
        },
        isReadyToStart() {
          return e.ships.length === 5 && t.ships.length === 5;
        },
        switchTurns: m,
        changeState: g,
        changeGameMode() {
          h = h === "ai" ? "player" : "ai";
        },
        changeCurrentBoard: f,
        winner() {
          return e.allShipsSunk() ? "You lose" : "You win";
        },
        restartGame() {
          const a = [e, t];
          (d = o),
            (l = e),
            g(),
            a.forEach((e) => {
              e.resetShips(), e.resetAttackedSquares(), e.resetAvailableShips();
            });
        },
        get player1Gameboard() {
          return e;
        },
        get player2Gameboard() {
          return t;
        },
        get player1() {
          return o;
        },
        get player2() {
          return s;
        },
        get currentPlayer() {
          return d;
        },
        get currentBoard() {
          return l;
        },
        get state() {
          return p;
        },
        get mode() {
          return h;
        },
      };
    })();
    const s = o();
    const i = ((e) => {
      const t = { invalidSquares: [], validSquares: [] };
      function a(a) {
        const n = r(a);
        const o = e.getNewCoordinates(e.getAvailableShips()[0], n);
        if (!o)
          return (
            (a.style.cursor = "not-allowed"),
            t.invalidSquares.push(a),
            void t.validSquares.push(a)
          );
        o.forEach((e) => {
          const a = document.querySelector(`[data-coordinates="${e}"]`);
          a.classList.add("potential-placement"), t.validSquares.push(a);
        });
      }
      function n() {
        t.validSquares.forEach((e) => {
          e.classList.remove("potential-placement"),
            e.hasAttribute("style") && e.removeAttribute("style");
        }),
          (t.validSquares = []);
      }
      function r(e) {
        return e.dataset.coordinates.split(",").map((e) => parseInt(e, 10));
      }
      return {
        highlightShipCoordinates: a,
        removeShipCoordinatesHighlight: n,
        changeShipPlacement(r) {
          if (r.key.toLocaleLowerCase() === "r" && t.validSquares.length) {
            e.changePlacementPlane();
            const r = t.validSquares[0];
            n(),
              setTimeout(() => {
                a(r);
              }, 20);
          }
        },
        placeShip(a) {
          const n = r(a);
          e.placeShip(e.getAvailableShips()[0], n) &&
            (t.validSquares.forEach((e) => {
              (e.dataset.occupied = "ship"),
                e.classList.remove("potential-placement");
            }),
            (t.validSquares = []),
            e.getAvailableShips().shift());
        },
      };
    })(e.currentBoard);
    const c = (() => {
      const e = document.querySelector("dialog");
      return {
        resetScreen: () => {
          (document.getElementById("main").textContent = ""), e.close();
        },
        displayWinner(t) {
          e.showModal(), (e.querySelector(".winner").textContent = t);
        },
      };
    })();
    function u() {
      e.player2Gameboard.randomizeShipPlacement(),
        s.renderBoard(e.player1Gameboard, "player1"),
        s.renderBoard(e.player2Gameboard, "player2");
    }
    function d(a, n, r) {
      const o = e.playRound(r);
      if ((s.updateAttackedSquare(a, n, o), e.state !== "gameover")) {
        if (e.mode === "ai" && e.currentPlayer === e.player2) {
          const a = t(e.player1Gameboard);
          const n = document.querySelector(`[data-coordinates="${a}"]`);
          d(e.player1Gameboard, n, a);
        }
      } else c.displayWinner(e.winner());
    }
    function l(t) {
      const a = t.closest(".gameboard");
      return (
        (e.currentPlayer === e.player1 &&
          a.classList.contains("player2-gameboard")) ||
        (e.currentPlayer === e.player2 &&
          a.classList.contains("player1-gameboard"))
      );
    }
    return (
      document.body.addEventListener("mouseover", (t) => {
        t.target.matches(".square") &&
          e.state === "placing-ship" &&
          (l(t.target) || i.highlightShipCoordinates(t.target));
      }),
      document.body.addEventListener("mouseout", (t) => {
        t.target.matches(".square") &&
          e.state === "placing-ship" &&
          i.removeShipCoordinatesHighlight(t.target);
      }),
      document.body.addEventListener("click", (t) => {
        t.target.matches(".square") &&
          e.state === "placing-ship" &&
          !l(t.target) &&
          (i.placeShip(t.target),
          e.isReadyToStart() &&
            e.mode === "ai" &&
            (e.changeState(), e.changeCurrentBoard()));
      }),
      document.body.addEventListener("click", (t) => {
        t.target.matches(".restart-game") &&
          e.state === "gameover" &&
          (c.resetScreen(), e.restartGame(), u());
      }),
      document.body.addEventListener("keydown", (t) => {
        e.state === "placing-ship" && i.changeShipPlacement(t);
      }),
      document.body.addEventListener("click", (t) => {
        t.target.matches(".square") &&
          (function (t) {
            const a = t.dataset.coordinates
              .split(",")
              .map((e) => parseInt(e, 10));
            e.state === "playing" &&
              t.dataset.status === "none" &&
              l(t) &&
              d(e.currentBoard, t, a);
          })(t.target);
      }),
      { init: u }
    );
  })().init();
})();
