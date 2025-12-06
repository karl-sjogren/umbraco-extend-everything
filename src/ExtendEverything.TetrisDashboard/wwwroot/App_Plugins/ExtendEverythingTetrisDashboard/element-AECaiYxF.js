import { html as lt, css as dt, query as Et, customElement as pt } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as ut } from "@umbraco-cms/backoffice/lit-element";
const t = class t {
  // constructor needs a canvas
  constructor(e, {
    boardWidth: i = t.BOARD_WIDTH,
    boardHeight: s = t.BOARD_HEIGHT,
    boardX: o = 30,
    boardY: n = -35,
    squareSide: a = 28,
    scoreX: c = 330,
    scoreY: l = 100,
    levelX: d = 330,
    levelY: _ = 130,
    linesX: T = 330,
    linesY: I = 160,
    nextX: x = 330,
    nextY: w = 260,
    nextOffsetX: L = 330,
    nextOffsetY: D = 280,
    pauseX: y = 145,
    pauseY: M = 220,
    zColor: k = ["#fe103c", "#f890a7"],
    sColor: G = ["#66fd00", "#c4fe93"],
    oColor: N = ["#ffde00", "#fff88a"],
    lColor: B = ["#ff7308", "#ffca9b"],
    jColor: X = ["#1801ff", "#5a95ff"],
    tColor: H = ["#b802fd", "#f591fe"],
    iColor: U = ["#00e6fe", "#86fefe"],
    gameOverColor: V = ["#fff", "#ddd"],
    ghostColor: W = ["#000", "#fff"],
    canvasFont: q = "17px georgia",
    canvasFontColor: F = "#fff",
    backgroundColor: Y = "#222",
    tetrisBackgroundColor: j = "#fff",
    borderColor: K = "#fff",
    gridColor: z = "#ddd",
    tapClickMaxDuration: Z = 500,
    tapClickMaxDistance: J = 10,
    rotateSound: $ = void 0,
    moveSound: Q = void 0,
    setSound: tt = void 0,
    gameOverSound: et = void 0,
    lineSound: it = void 0,
    tetrisSound: st = void 0,
    levelChangeSound: ot = void 0,
    pauseSound: ht = void 0,
    gameTheme: at = void 0
  } = {}) {
    this._handleContextMenu = (h) => {
      h.preventDefault();
    }, this._handleKeyDown = (h) => {
      switch (h.keyCode || h.which) {
        case 37:
        case 65:
          h.preventDefault(), this.moveRight = !(this.moveLeft = !0);
          break;
        case 39:
        case 68:
          h.preventDefault(), this.moveLeft = !(this.moveRight = !0);
          break;
        case 38:
        case 75:
        case 87:
        case 88:
          h.preventDefault(), this.rotateAnticlockwise = !(this.rotateClockwise = !0);
          break;
        case 76:
        case 90:
          h.preventDefault(), this.rotateClockwise = !(this.rotateAnticlockwise = !0);
          break;
        case 40:
        case 83:
          h.preventDefault(), this.moveDown = !0;
          break;
        case 32:
          h.preventDefault(), this.hardDrop = !0;
          break;
        case 27:
        case 80:
          h.preventDefault(), this.gameState != t.STATE_GAME_OVER && (this.doUndoPause = !0);
          break;
      }
    }, this._handlePointerMove = (h) => {
      if (h.preventDefault(), this.gameState === t.STATE_PAUSE) return;
      const { x: E, y: p } = this._getEventCoords(h), u = (p - this.boardY) / this.squareSide | 0, f = (E - this.boardX) / this.squareSide | 0, { top: g, bottom: b, left: nt, right: rt } = this._getPieceBounds(), ct = (g + b) / 2 | 0, C = (nt + rt) / 2 | 0;
      u <= b && (this.pointerMoveDownEnabled = !0), f < C && (this.moveRight = !(this.moveLeft = !0)), f > C && (this.moveLeft = !(this.moveRight = !0)), this.pointerMoveDownEnabled && u > ct && (this.moveDown = !0);
    }, this._handlePointerDown = (h) => {
      if (this.gameState === t.STATE_PAUSE) return;
      const { x: E, y: p } = this._getEventCoords(h);
      this.xIni = E, this.yIni = p, this.tIni = performance.now();
    }, this._handlePointerUp = (h) => {
      if (h.preventDefault(), this.gameState === t.STATE_PAUSE) return;
      const { x: E, y: p } = this._getEventCoords(h), u = this.xIni - E, f = this.yIni - p;
      Math.sqrt(u * u + f * f) <= this.tapClickMaxDistance && // similar coords
      performance.now() - this.tIni <= this.tapClickMaxDuration && (h.button === 0 ? this.rotateAnticlockwise = !(this.rotateClockwise = !0) : this.rotateClockwise = !(this.rotateAnticlockwise = !0));
    }, this._handlePointerCancel = (h) => {
      h.preventDefault(), this.pointerMoveDownEnabled = !1;
    }, this._handleWheel = (h) => {
      h.preventDefault(), this.gameState !== t.STATE_PAUSE && (h.deltaY > 0 ? this.rotateAnticlockwise = !(this.rotateClockwise = !0) : h.deltaY < 0 && (this.rotateClockwise = !(this.rotateAnticlockwise = !0)));
    }, this.canvas = e, this.context = this.canvas.getContext("2d"), this.context.lineJoin = "round", this.boardWidth = i, this.boardHeight = s, this.board = [];
    for (let h = 0; h < this.boardHeight; ++h) {
      const E = [];
      for (let p = 0; p < this.boardWidth; ++p) E.push(7);
      this.board.push(E);
    }
    this.boardX = o, this.boardY = n, this.squareSide = a, this.boardBorder = [
      -0.5 + this.boardX,
      -0.5 + this.boardY + 2 * this.squareSide,
      0.5 + this.boardX + this.boardWidth * this.squareSide,
      0.5 + this.boardY + this.boardHeight * this.squareSide
    ], this.scoreX = c, this.scoreY = l, this.levelX = d, this.levelY = _, this.linesX = T, this.linesY = I, this.nextX = x, this.nextY = w, this.nextOffsetX = L, this.nextOffsetY = D, this.pauseX = y, this.pauseY = M, this.canvasFont = q, this.canvasFontColor = F, this.zColor = [...k], this.sColor = [...G], this.oColor = [...N], this.lColor = [...B], this.jColor = [...X], this.tColor = [...H], this.iColor = [...U], this.gameOverColor = [...V], this.ghostColor = [...W], this.backgroundColor = Y, this.tetrisBackgroundColor = j, this.borderColor = K, this.gridColor = z, this.tapClickMaxDuration = Z, this.tapClickMaxDistance = J, this.rotateSound = $, this.moveSound = Q, this.setSound = tt, this.gameOverSound = et, this.lineSound = it, this.tetrisSound = st, this.levelChangeSound = ot, this.pauseSound = ht, this.gameTheme = at, this.pieces = [
      {
        id: 0,
        name: t.Z_PIECE,
        rot: t.Z_ROT,
        iniPos: t.Z_INI_POS,
        col: this.zColor,
        box: t.Z_BOX
      },
      {
        id: 1,
        name: t.S_PIECE,
        rot: t.S_ROT,
        iniPos: t.S_INI_POS,
        col: this.sColor,
        box: t.S_BOX
      },
      {
        id: 2,
        name: t.O_PIECE,
        rot: t.O_ROT,
        iniPos: t.O_INI_POS,
        col: this.oColor,
        box: t.O_BOX
      },
      {
        id: 3,
        name: t.L_PIECE,
        rot: t.L_ROT,
        iniPos: t.L_INI_POS,
        col: this.lColor,
        box: t.L_BOX
      },
      {
        id: 4,
        name: t.J_PIECE,
        rot: t.J_ROT,
        iniPos: t.J_INI_POS,
        col: this.jColor,
        box: t.J_BOX
      },
      {
        id: 5,
        name: t.T_PIECE,
        rot: t.T_ROT,
        iniPos: t.T_INI_POS,
        col: this.tColor,
        box: t.T_BOX
      },
      {
        id: 6,
        name: t.I_PIECE,
        rot: t.I_ROT,
        iniPos: t.I_INI_POS,
        col: this.iColor,
        box: t.I_BOX
      }
    ], this.moveLeft = !1, this.moveRight = !1, this.moveDown = !1, this.rotateClockwise = !1, this.rotateAnticlockwise = !1, this.hardDrop = !0, this.doUndoPause = !1, this.xIni = void 0, this.yIni = void 0, this.tIni = void 0, this.pointerMoveDownEnabled = !1, this.playing = !1, this.gameLoop = !1, this.piece = this.pieces[0], this.piecePosition = [0, 0], this.pieceRotation = 0, this.next = this.pieces[0], this.startLevel = 0, this.level = 0, this.lines = 0, this.score = 0, this.pressDownScore = 0, this.handlers = /* @__PURE__ */ new Map(), this.handlers.set(t.GAME_START, []), this.handlers.set(t.GAME_OVER, []), this.handlers.set(t.GAME_OVER_START, []), this.handlers.set(t.GAME_OVER_END, []), this.handlers.set(t.GAME_PAUSE, []), this.handlers.set(t.GAME_RESUME, []), this.handlers.set(t.PIECE_MOVE_LEFT, []), this.handlers.set(t.PIECE_MOVE_RIGHT, []), this.handlers.set(t.PIECE_MOVE_DOWN, []), this.handlers.set(t.PIECE_HARD_DROP, []), this.handlers.set(t.PIECE_ROTATE_CLOCKWISE, []), this.handlers.set(t.PIECE_ROTATE_ANTICLOCKWISE, []), this.handlers.set(t.PIECE_LOCK, []), this.handlers.set(t.NEXT_PIECE, []), this.handlers.set(t.LEVEL_CHANGE, []), this.handlers.set(t.SCORE_CHANGE, []), this.handlers.set(t.LINE_CLEAR_START, []), this.handlers.set(t.LINE_CLEAR_END, []), this.handlers.set(t.LINE_CLEAR, []), this.frameCounter = 0, this.areFrames = -1, this.framesTilDrop = -1, this.columnsCleared = -1, this.gameOverLine = -1, this.previousGameState = t.STATE_GAME_OVER, this.gameState = t.STATE_GAME_OVER, this.emptyRow = [];
    for (let h = 0; h < this.boardWidth; ++h) this.emptyRow.push(-1);
    this._render();
  }
  //----------------------------------------------------------------------------------------
  //
  // setters
  //
  //----------------------------------------------------------------------------------------
  // set the starting level
  // does nothing if playing
  setStartLevel(e) {
    this.gameState === t.STATE_GAME_OVER && (this.startLevel = Math.max(0, Math.min(19, e)));
  }
  // set the border and fill colors for game-over squares
  setGameOverColor(e) {
    this.gameOverColor = [...e];
  }
  // set ghost piece colors
  setGhostColor(e) {
    this.ghostColor = [...e];
  }
  // set the border and fill colors for a piece
  setPieceColor(e, i) {
    switch (e) {
      case t.Z_PIECE:
        this.zColor = [...i];
        break;
      case t.S_PIECE:
        this.sColor = [...i];
        break;
      case t.O_PIECE:
        this.oColor = [...i];
        break;
      case t.L_PIECE:
        this.lColor = [...i];
        break;
      case t.J_PIECE:
        this.jColor = [...i];
        break;
      case t.T_PIECE:
        this.tColor = [...i];
        break;
      case t.I_PIECE:
        this.iColor = [...i];
        break;
    }
  }
  //----------------------------------------------------------------------------------------
  //
  // helper functions
  //
  //----------------------------------------------------------------------------------------
  // frames before the piece drops 1 tile
  // depends on the level
  _getFramesPerGridcell(e) {
    return e === 0 ? 96 : e === 1 ? 86 : e === 2 ? 76 : e === 3 ? 66 : e === 4 ? 56 : e === 5 ? 46 : e === 6 ? 36 : e === 7 ? 26 : e === 8 ? 16 : e === 9 ? 12 : e <= 12 ? 10 : e <= 15 ? 8 : e <= 18 ? 6 : e <= 28 ? 4 : 2;
  }
  //----------------------------------------------------------------------------------------
  //
  // public functions
  //
  //  - play
  //
  //----------------------------------------------------------------------------------------
  togglePlayPause() {
    this.playing ? this.doUndoPause = !0 : this.play();
  }
  quit() {
    this.playing && this.gameState != t.STATE_GAME_OVER && this._triggerGameOver();
  }
  // start new game
  async play() {
    if (!this.playing) {
      this.playing = !0, this._disableUI(), this._addEventListeners(), this._resetParams(), this.gameTheme && (this.gameTheme.currentTime = 0, this.gameTheme.loop = !0, this.gameTheme.play()), this._dispatch(t.GAME_START, {
        type: t.GAME_START,
        level: this.level,
        score: this.score,
        lines: this.lines
      }), this._dispatch(t.NEXT_PIECE, {
        type: t.NEXT_PIECE,
        piece: this.piece.name,
        nextPiece: this.next.name
      }), this.gameLoop = !0;
      do
        this._process(), this._render(), await this._sleep();
      while (this.gameLoop);
      this._removeEventListeners(), this._enableUI(), this.playing = !1, this._dispatch(t.GAME_OVER, {
        type: t.GAME_OVER,
        level: this.level,
        score: this.score,
        lines: this.lines
      });
    }
  }
  // get game params ready for a new game
  _resetParams() {
    this.pointerMoveDownEnabled = !1, this.moveLeft = !1, this.moveRight = !1, this.moveDown = !1, this.rotateClockwise = !1, this.rotateAnticlockwise = !1, this.hardDrop = !1, this.doUndoPause = !1, this.xIni = void 0, this.yIni = void 0, this.tIni = void 0, this.piece = this.pieces[Math.random() * this.pieces.length | 0], this.next = this.pieces[this._nextPieceId()], this.piecePosition = this.piece.iniPos.slice(0), this.pieceRotation = 0, this.level = this.startLevel, this.lines = 0, this.score = 0, this.pressDownScore = 0;
    for (let e = 0; e < this.boardHeight; ++e)
      for (let i = 0; i < this.boardWidth; ++i)
        this.board[e][i] = -1;
    this.frameCounter = 0, this.areFrames = -1, this.framesTilDrop = -1, this.columnsCleared = -1, this.gameOverLine = -1, this.framesTilDrop = 36 + this._getFramesPerGridcell(this.level), this.previousGameState = t.STATE_DROP, this.gameState = t.STATE_DROP;
  }
  // add and remove event listeners
  _addEventListeners() {
    this.canvas.addEventListener("contextmenu", this._handleContextMenu, { capture: !0, passive: !1 }), document.addEventListener("pointerdown", this._handlePointerDown, { capture: !0, passive: !1 }), document.addEventListener("pointermove", this._handlePointerMove, { capture: !0, passive: !1 }), document.addEventListener("pointerup", this._handlePointerUp, { capture: !0, passive: !1 }), document.addEventListener("pointercancel", this._handlePointerCancel, { capture: !0, passive: !1 }), document.addEventListener("wheel", this._handleWheel, { capture: !0, passive: !1 }), document.addEventListener("keydown", this._handleKeyDown, { capture: !0, passive: !1 });
  }
  _removeEventListeners() {
    this.canvas.removeEventListener("contextmenu", this._handleContextMenu, !0), document.removeEventListener("pointerdown", this._handlePointerDown, !0), document.removeEventListener("pointermove", this._handlePointerMove, !0), document.removeEventListener("pointerup", this._handlePointerUp, !0), document.removeEventListener("pointercancel", this._handlePointerCancel, !0), document.removeEventListener("wheel", this._handleWheel, !0), document.removeEventListener("keydown", this._handleKeyDown, !0);
  }
  // disable/enable UI
  _disableUI() {
    this.canvas.style.touchAction = "none";
  }
  _enableUI() {
    this.canvas.style.touchAction = "auto";
  }
  // pointer coordinates
  _getEventCoords(e) {
    const i = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - i.left,
      y: e.clientY - i.top
    };
  }
  // get current piece's left and right bounds
  _getPieceBounds() {
    const e = this.piece.rot[this.pieceRotation];
    let i = this.boardHeight, s = 0, o = this.boardWidth, n = 0;
    for (let a = 0; a < e.length; ++a)
      for (let c = 0; c < e[a].length; ++c)
        if (e[a][c] != 0) {
          const l = this.piecePosition[0] + c, d = this.piecePosition[1] + a;
          o = Math.min(o, l), n = Math.max(n, l), i = Math.min(i, d), s = Math.max(s, d);
        }
    return {
      top: i,
      bottom: s,
      left: o,
      right: n
    };
  }
  //-----------------------------------------------------------
  //
  // game logic
  //
  //-----------------------------------------------------------
  _process() {
    switch (this._pauseCheck(), this.gameState) {
      case t.STATE_DROP:
        this._processDrop();
        break;
      case t.STATE_BURN:
        this._processBurn();
        break;
      case t.STATE_ARE:
        this._processARE();
        break;
      case t.STATE_GAME_OVER:
        this._processGameOver();
        break;
    }
    this._resetInputs(), ++this.frameCounter;
  }
  _processDrop() {
    if (--this.framesTilDrop, this.moveLeft && this._canMovePiece(-1, 0)) {
      const e = [...this.piecePosition];
      --this.piecePosition[0], this.moveSound && (this.moveSound.currentTime = 0, this.moveSound.play()), this._dispatch(t.PIECE_MOVE_LEFT, {
        type: t.PIECE_MOVE_LEFT,
        piece: this.piece.name,
        rotation: this.pieceRotation,
        oldPosition: e,
        newPosition: [...this.piecePosition]
      });
    }
    if (this.moveRight && this._canMovePiece(1, 0)) {
      const e = [...this.piecePosition];
      ++this.piecePosition[0], this.moveSound && (this.moveSound.currentTime = 0, this.moveSound.play()), this._dispatch(t.PIECE_MOVE_RIGHT, {
        type: t.PIECE_MOVE_RIGHT,
        piece: this.piece.name,
        rotation: this.pieceRotation,
        oldPosition: e,
        newPosition: [...this.piecePosition]
      });
    }
    if (this.rotateClockwise && this._canRot((this.pieceRotation + 1) % this.piece.rot.length)) {
      const e = this.pieceRotation;
      this.pieceRotation = (this.pieceRotation + 1) % this.piece.rot.length, this.rotateSound && (this.rotateSound.currentTime = 0, this.rotateSound.play()), this._dispatch(t.PIECE_ROTATE_CLOCKWISE, {
        type: t.PIECE_ROTATE_CLOCKWISE,
        piece: this.piece.name,
        position: [...this.piecePosition],
        oldRotation: e,
        newRotation: this.pieceRotation
      });
    }
    if (this.rotateAnticlockwise && this._canRot((this.pieceRotation + this.piece.rot.length - 1) % this.piece.rot.length)) {
      const e = this.pieceRotation;
      this.pieceRotation = (this.pieceRotation + this.piece.rot.length - 1) % this.piece.rot.length, this.rotateSound && (this.rotateSound.currentTime = 0, this.rotateSound.play()), this._dispatch(t.PIECE_ROTATE_ANTICLOCKWISE, {
        type: t.PIECE_ROTATE_ANTICLOCKWISE,
        piece: this.piece.name,
        position: [...this.piecePosition],
        oldRotation: e,
        newRotation: this.pieceRotation
      });
    }
    if (this.hardDrop) {
      const e = [...this.piecePosition];
      for (; this._canMovePiece(0, 1); )
        ++this.piecePosition[1], this.pressDownScore += 2;
      this._dispatch(t.PIECE_HARD_DROP, {
        type: t.PIECE_HARD_DROP,
        piece: this.piece.name,
        rotation: this.pieceRotation,
        oldPosition: e,
        newPosition: [...this.piecePosition]
      }), this._lockPiece();
    } else if (this.moveDown || this.framesTilDrop === 0)
      if (this._canMovePiece(0, 1)) {
        this.moveDown && ++this.pressDownScore;
        const e = [...this.piecePosition];
        ++this.piecePosition[1], this.framesTilDrop = this._getFramesPerGridcell(this.level), this._dispatch(t.PIECE_MOVE_DOWN, {
          type: t.PIECE_MOVE_DOWN,
          piece: this.piece.name,
          rotation: this.pieceRotation,
          oldPosition: e,
          newPosition: [...this.piecePosition],
          downPressed: this.moveDown
        });
      } else
        this._lockPiece();
  }
  _lockPiece() {
    if (this.framesTilDrop = -1, this._setPiece(), this._dispatch(t.PIECE_LOCK, {
      type: t.PIECE_LOCK,
      piece: this.piece.name,
      rotation: this.pieceRotation,
      position: [...this.piecePosition]
    }), this.linesCleared = this._getLinesCleared(), this.linesCleared.length > 0) {
      this.columnsCleared = 0, this.gameState = t.STATE_BURN;
      const e = this.boardWidth / 2;
      for (let s = 0; s < this.linesCleared.length; ++s)
        this.board[this.linesCleared[s]][e + this.columnsCleared] = -1, this.board[this.linesCleared[s]][e - 1 - this.columnsCleared] = -1;
      const i = this.linesCleared.length === 4 ? this.tetrisSound : this.lineSound;
      i && (i.currentTime = 0, i.play()), this._dispatch(t.LINE_CLEAR_START, {
        type: t.LINE_CLEAR_START,
        linesBurnt: [...this.linesCleared]
      });
    } else {
      this.setSound && (this.setSound.currentTime = 0, this.setSound.play());
      const e = this.score;
      this.score += this.pressDownScore, this._dispatch(t.SCORE_CHANGE, {
        type: t.SCORE_CHANGE,
        oldScore: e,
        newScore: this.score
      }), this.areFrames = this._getARE(), this.gameState = t.STATE_ARE;
    }
  }
  _processBurn() {
    if (this.frameCounter % 8 === 0)
      if (++this.columnsCleared, this.columnsCleared < 5) {
        const e = this.boardWidth / 2;
        for (let i = 0; i < this.linesCleared.length; ++i)
          this.board[this.linesCleared[i]][e + this.columnsCleared] = -1, this.board[this.linesCleared[i]][e - 1 - this.columnsCleared] = -1;
      } else {
        this.columnsCleared = -1;
        for (let o = this.linesCleared.length - 1; o >= 0; --o)
          this.board.splice(this.linesCleared[o], 1);
        for (; this.board.length < this.boardHeight; )
          this.board.unshift([...this.emptyRow]);
        const e = this.score, i = this.lines;
        this.score += this.pressDownScore + this._getLinesScore(this.linesCleared.length, this.level), this.lines += this.linesCleared.length, this._dispatch(t.LINE_CLEAR_END, {
          type: t.LINE_CLEAR_END,
          linesBurnt: [...this.linesCleared]
        }), this._dispatch(t.LINE_CLEAR, {
          type: t.LINE_CLEAR,
          oldLines: i,
          newLines: this.lines
        }), this._dispatch(t.SCORE_CHANGE, {
          type: t.SCORE_CHANGE,
          oldScore: e,
          newScore: this.score
        });
        const s = this._getLevel();
        if (this.level != s) {
          const o = this.level;
          this.level = s, this.levelChangeSound && (this.levelChangeSound.currentTime = 0, this.levelChangeSound.play()), this._dispatch(t.LEVEL_CHANGE, {
            type: t.LEVEL_CHANGE,
            oldLevel: o,
            newLevel: this.level
          });
        }
        this.areFrames = this._getARE(), this.gameState = t.STATE_ARE;
      }
  }
  _processARE() {
    --this.areFrames, this.areFrames === 0 && (this.areFrames = -1, this.pressDownScore = 0, this.pointerMoveDownEnabled = !1, this.piece = this.next, this.piecePosition = this.piece.iniPos.slice(0), this.pieceRotation = 0, this.next = this.pieces[this._nextPieceId()], this._canMovePiece(0, 0) ? (this.framesTilDrop = this._getFramesPerGridcell(this.level), this.gameState = t.STATE_DROP, this._dispatch(t.NEXT_PIECE, {
      type: t.NEXT_PIECE,
      piece: this.piece.name,
      nextPiece: this.next.name
    })) : (this._setPiece(), this._triggerGameOver()));
  }
  _triggerGameOver() {
    this.gameTheme && this.gameTheme.pause(), this.gameOverSound && (this.gameOverSound.currentTime = 0, this.gameOverSound.play()), this.gameOverLine = 1, this.gameState = t.STATE_GAME_OVER, this._dispatch(t.GAME_OVER_START, {
      type: t.GAME_OVER_START,
      level: this.level,
      score: this.score,
      lines: this.lines
    });
  }
  _processGameOver() {
    if (this.frameCounter % 8 === 0)
      if (++this.gameOverLine, this.gameOverLine < this.boardHeight)
        for (let e = 0; e < this.boardWidth; ++e) this.board[this.gameOverLine][e] = 7;
      else
        this.gameLoop = !1, this._dispatch(t.GAME_OVER_END, {
          type: t.GAME_OVER_END,
          level: this.level,
          score: this.score,
          lines: this.lines
        });
  }
  // pause or unpause if requested
  _pauseCheck() {
    this.doUndoPause && (this.gameState === t.STATE_PAUSE ? (this.gameState = this.previousGameState, this.pointerMoveDownEnabled = !1, this.gameTheme && this.gameTheme.play(), this._dispatch(t.GAME_RESUME, {
      type: t.GAME_RESUME,
      level: this.level,
      score: this.score,
      lines: this.lines
    })) : (this.previousGameState = this.gameState, this.gameState = t.STATE_PAUSE, this.gameTheme && this.gameTheme.pause(), this.pauseSound && (this.pauseSound.currentTime = 0, this.pauseSound.play()), this._dispatch(t.GAME_PAUSE, {
      type: t.GAME_PAUSE,
      level: this.level,
      score: this.score,
      lines: this.lines
    })));
  }
  // get them inputs ready for the next iteration
  _resetInputs() {
    this.moveLeft = !1, this.moveRight = !1, this.moveDown = !1, this.rotateClockwise = !1, this.rotateAnticlockwise = !1, this.hardDrop = !1, this.doUndoPause = !1;
  }
  //--------------------------------------------------------------------------------------------
  //
  // game rules: https://tetris.wiki/ClassicTetris_(NES,_Nintendo)
  //
  //--------------------------------------------------------------------------------------------
  _nextPieceId() {
    let e = Math.random() * 8 | 0;
    return (e === 7 || e === this.piece.id) && (e = Math.random() * 8 | 0, e = (e + this.piece.id) % 7), e;
  }
  // score for lines cleared
  // depends on the level and # of lines cleared
  _getLinesScore(e, i) {
    return e === 1 ? 40 * (i + 1) : e === 2 ? 100 * (i + 1) : e === 3 ? 300 * (i + 1) : 1200 * (i + 1);
  }
  // ARE is 10~18 frames depending on the height at which the piece locked;
  // pieces that lock in the bottom two rows are followed by 10 frames of entry delay,
  // and each group of 4 rows above that has an entry delay 2 frames longer than the last
  _getARE() {
    return (10 + ((this._getLockHeight() + 2) / 4 | 0) * 2) * 2;
  }
  // height at which the piece locked
  _getLockHeight() {
    let e = 0;
    const i = this.piece.rot[this.pieceRotation];
    for (let s = 0; s < i.length; ++s)
      for (let o = 0; o < i[s].length; ++o)
        i[s][o] != 0 && (e = Math.max(e, this.piecePosition[1] + s));
    return this.boardHeight - 1 - e;
  }
  // when the player clears (startLevel × 10 + 10) or max(100, (startLevel × 10 - 50)) lines,
  // whatever comes first, the level advances by 1. After this, the level advances by 1 for every 10 lines.
  _getLevel() {
    const e = this.lines - Math.min(this.startLevel * 10 + 10, Math.max(100, this.startLevel * 10 - 50));
    return this.startLevel + (e >= 0 ? (e / 10 | 0) + 1 : 0);
  }
  // line clear delay is an additional 17~20 frames depending on the frame that the piece locks;
  // the animation has 5 steps that advance when the global frame counter modulo 4 equals 0.
  // As a consequence, the first step of the line clear animation is not always a set number of frames
  _getLinesCleared() {
    const e = [];
    for (let i = 0; i < this.boardHeight; ++i) {
      let s = !0;
      for (let o = 0; s && o < this.boardWidth; ++o)
        this.board[i][o] === -1 && (s = !1);
      s && e.push(i);
    }
    return e;
  }
  // set piece down on board (lock it)
  _setPiece() {
    const e = this.piece.rot[this.pieceRotation];
    for (let i = 0; i < e.length; ++i)
      for (let s = 0; s < e[i].length; ++s)
        e[i][s] != 0 && (this.board[this.piecePosition[1] + i][this.piecePosition[0] + s] = this.piece.id);
  }
  // can the piece move
  _canMovePiece(e, i) {
    return this._canMove(this.piece, this.pieceRotation, this.piecePosition, e, i);
  }
  _canMove(e, i, s, o, n) {
    const a = e.rot[i];
    for (let c = 0; c < a.length; ++c)
      for (let l = 0; l < a[c].length; ++l)
        if (a[c][l] != 0) {
          const d = o + s[0] + l, _ = n + s[1] + c;
          if (d < 0 || d >= this.boardWidth || _ >= this.boardHeight || this.board[_][d] != -1)
            return !1;
        }
    return !0;
  }
  // can the piece rotate
  _canRot(e) {
    const i = this.piece.rot[e];
    for (let s = 0; s < i.length; ++s)
      for (let o = 0; o < i[s].length; ++o)
        if (i[s][o] != 0) {
          const n = this.piecePosition[0] + o, a = this.piecePosition[1] + s;
          if (n < 0 || n >= this.boardWidth || a >= this.boardHeight || this.board[a][n] != -1)
            return !1;
        }
    return !0;
  }
  //-----------------------------------------------------------
  //
  // render
  //
  //-----------------------------------------------------------
  _render() {
    this._drawBackground(), this._drawBoard(), this._drawGhost(), this._drawPiece(), this._drawHUD(), this._drawNext();
  }
  _drawBackground() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.lineWidth = 1;
    const e = this.gameState === t.STATE_BURN && this.linesCleared.length === 4 && this.frameCounter % 8 ? (
      //4 ?
      this.tetrisBackgroundColor
    ) : this.backgroundColor;
    if (this.context.beginPath(), this.context.moveTo(this.boardBorder[0], this.boardBorder[1]), this.context.lineTo(this.boardBorder[2], this.boardBorder[1]), this.context.lineTo(this.boardBorder[2], this.boardBorder[3]), this.context.lineTo(this.boardBorder[0], this.boardBorder[3]), this.context.closePath(), this.context.fillStyle = e, this.context.strokeStyle = this.borderColor, this.context.fill(), this.context.stroke(), this.gameState === t.STATE_PAUSE)
      this.context.font = this.canvasFont, this.context.fillStyle = this.canvasFontColor, this.context.fillText("PAUSE", this.pauseX, this.pauseY);
    else {
      this.context.lineWidth = 0.5, this.context.strokeStyle = this.gridColor;
      const i = this.boardX + this.squareSide * this.boardWidth;
      for (let n = 3; n < this.boardHeight; ++n) {
        const a = this.boardY + n * this.squareSide;
        this.context.beginPath(), this.context.moveTo(this.boardX, a), this.context.lineTo(i, a), this.context.closePath(), this.context.stroke();
      }
      const s = this.boardY + 2 * this.squareSide, o = this.boardY + this.boardHeight * this.squareSide;
      for (let n = 0; n < this.boardWidth; ++n) {
        const a = this.boardX + n * this.squareSide;
        this.context.beginPath(), this.context.moveTo(a, s), this.context.lineTo(a, o), this.context.closePath(), this.context.stroke();
      }
      this.context.lineWidth = 1;
    }
  }
  _drawBoard() {
    if (this.gameState !== t.STATE_PAUSE) {
      for (let e = 2; e < this.boardHeight; ++e)
        for (let i = 0; i < this.boardWidth; ++i)
          if (this.board[e][i] != -1) {
            const s = this.board[e][i] == 7 ? this.gameOverColor : this.pieces[this.board[e][i]].col;
            this._drawSquare(
              this.boardX + i * this.squareSide,
              this.boardY + e * this.squareSide,
              s[0],
              s[1]
            );
          }
    }
  }
  // draw current piece
  _drawPiece() {
    if (this.gameState === t.STATE_DROP) {
      const e = this.piece.rot[this.pieceRotation];
      for (let i = 0; i < e.length; ++i)
        for (let s = 0; s < e[i].length; ++s)
          e[i][s] != 0 && this.piecePosition[1] + i > 1 && this._drawSquare(
            this.boardX + (this.piecePosition[0] + s) * this.squareSide,
            this.boardY + (this.piecePosition[1] + i) * this.squareSide,
            this.piece.col[0],
            this.piece.col[1]
          );
    }
  }
  // draw ghost piece
  // it is a representation of where a tetromino or other piece will land if allowed to drop into the playfield
  _drawGhost() {
    if (this.gameState === t.STATE_DROP) {
      const e = [this.piecePosition[0], this.piecePosition[1]];
      for (; this._canMove(this.piece, this.pieceRotation, e, 0, 1); )
        ++e[1];
      const i = this.piece.rot[this.pieceRotation];
      for (let s = 0; s < i.length; ++s)
        for (let o = 0; o < i[s].length; ++o)
          i[s][o] != 0 && e[1] + s > 1 && this._drawSquare(
            this.boardX + (e[0] + o) * this.squareSide,
            this.boardY + (e[1] + s) * this.squareSide,
            this.ghostColor[0],
            this.ghostColor[1]
          );
    }
  }
  // draw heads-up display
  _drawHUD() {
    let e = "Score:   ", i = "Level:   ", s = "Lines:   ", o = "Next";
    this.gameState != t.STATE_PAUSE && (e += this.score, i += this.level, s += this.lines), this.context.font = this.canvasFont, this.context.fillStyle = this.canvasFontColor, this.context.fillText(e, this.scoreX, this.scoreY), this.context.fillText(i, this.levelX, this.levelY), this.context.fillText(s, this.linesX, this.linesY), this.context.fillText(o, this.nextX, this.nextY);
  }
  // draw next piece
  _drawNext() {
    if (this.gameState === t.STATE_PAUSE || this.gameState === t.STATE_GAME_OVER) return;
    const e = this.next.rot[0], i = this.next.box;
    for (let s = i[0]; s < i[0] + i[2]; ++s)
      for (let o = i[1]; o < i[1] + i[3]; ++o)
        e[s][o] != 0 && this._drawSquare(
          this.nextOffsetX + (o - i[1]) * this.squareSide,
          this.nextOffsetY + (s - i[0]) * this.squareSide,
          this.next.col[0],
          this.next.col[1]
        );
  }
  // draw an individual square on the board
  _drawSquare(e, i, s, o) {
    this.context.beginPath(), this.context.moveTo(e + 1, i + 1), this.context.lineTo(e + this.squareSide - 1, i + 1), this.context.lineTo(e + this.squareSide - 1, i + this.squareSide - 1), this.context.lineTo(e + 1, i + this.squareSide - 1), this.context.closePath(), this.context.fillStyle = s, this.context.strokeStyle = o, this.context.fill(), this.context.stroke();
  }
  //-----------------------------------------------------------
  //
  // sleep function
  //
  //-----------------------------------------------------------
  _sleep() {
    return new Promise(requestAnimationFrame);
  }
  //-----------------------------------------------------------
  //
  // observer pattern
  //
  //-----------------------------------------------------------
  // add an event handler
  on(e, i) {
    const s = this.handlers.get(e);
    s && s.push(i);
  }
  // remove an event handler
  off(e, i) {
    const s = this.handlers.get(e);
    if (s) {
      const o = s.indexOf(i);
      o != -1 && s.splice(o, 1);
    }
  }
  // fire events
  _dispatch(e, i) {
    const s = this.handlers.get(e);
    if (s)
      for (const o of s)
        o(i);
  }
};
t.Z_ROT = [
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0]
  ]
], t.S_ROT = [
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1]
  ]
], t.O_ROT = [
  [
    [1, 1],
    [1, 1]
  ]
], t.L_ROT = [
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0]
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
  ]
], t.J_ROT = [
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1]
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
  ]
], t.T_ROT = [
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0]
  ]
], t.I_ROT = [
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ]
], t.Z_INI_POS = [4, 1], t.S_INI_POS = [4, 1], t.O_INI_POS = [4, 2], t.L_INI_POS = [4, 1], t.J_INI_POS = [4, 1], t.T_INI_POS = [4, 1], t.I_INI_POS = [3, 0], t.Z_BOX = [1, 0, 2, 3], t.S_BOX = [1, 0, 2, 3], t.O_BOX = [0, 0, 2, 2], t.L_BOX = [1, 0, 2, 3], t.J_BOX = [1, 0, 2, 3], t.T_BOX = [1, 0, 2, 3], t.I_BOX = [2, 0, 1, 4], t.Z_PIECE = "z", t.S_PIECE = "s", t.O_PIECE = "o", t.L_PIECE = "l", t.J_PIECE = "j", t.T_PIECE = "t", t.I_PIECE = "i", t.STATE_DROP = 0, t.STATE_BURN = 1, t.STATE_ARE = 2, t.STATE_GAME_OVER = 3, t.STATE_PAUSE = 4, t.GAME_START = "game-start", t.GAME_OVER = "game-over", t.GAME_OVER_START = "game-over-start", t.GAME_OVER_END = "game-over-end", t.GAME_PAUSE = "game-pause", t.GAME_RESUME = "game-resume", t.PIECE_MOVE_LEFT = "piece-move-left", t.PIECE_MOVE_RIGHT = "piece-move-right", t.PIECE_MOVE_DOWN = "piece-move-down", t.PIECE_HARD_DROP = "piece-hard-drop", t.PIECE_ROTATE_CLOCKWISE = "piece-rotate-clockwise", t.PIECE_ROTATE_ANTICLOCKWISE = "piece-rotate-anticlockwise", t.PIECE_LOCK = "piece-lock", t.NEXT_PIECE = "next-piece", t.LEVEL_CHANGE = "level-change", t.SCORE_CHANGE = "score-change", t.LINE_CLEAR_START = "line-clear-start", t.LINE_CLEAR_END = "line-clear-end", t.LINE_CLEAR = "line-clear", t.BOARD_WIDTH = 10, t.BOARD_HEIGHT = 22;
let v = t;
var ft = Object.defineProperty, mt = Object.getOwnPropertyDescriptor, R = (r) => {
  throw TypeError(r);
}, O = (r, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? mt(e, i) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (o = (s ? a(e, i, o) : a(o)) || o);
  return s && o && ft(e, i, o), o;
}, _t = (r, e, i) => e.has(r) || R("Cannot " + i), St = (r, e, i) => e.has(r) ? R("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, i), A = (r, e, i) => (_t(r, e, "access private method"), i), S, P;
let m = class extends ut {
  constructor() {
    super(), St(this, S);
  }
  firstUpdated() {
    var r = window.getComputedStyle(document.body), e = r.getPropertyValue("--uui-font-family");
    this._tetrisGameInstance = new v(this._tetrisCanvas, {
      canvasFont: `22px ${e}`,
      canvasFontColor: "#000"
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._tetrisGameInstance?.quit(), this._tetrisGameInstance = void 0;
  }
  render() {
    return lt`
      <uui-box>
        <span slot="headline">
          <umb-localize key="tetris_dashboard_heading">tetris_dashboard_heading</umb-localize>
        </span>

        <span slot="header-actions">
          <uui-button label="Increase value" @click=${A(this, S, P)}>
            <uui-icon>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
            </uui-icon>
          </uui-button>
        </span>

        <div class="stack">
          <canvas id="tetris-canvas" class="tetris-canvas" width="520" height="600"></canvas>

          <uui-button-group>
            <uui-button look="primary" label="Play / Pause" @click=${A(this, S, P)}>
              <umb-localize key="tetris_dashboard_play_pause_button">tetris_dashboard_play_pause_button</umb-localize>
            </uui-button>
          </uui-button-group>
        </div>
      </uui-box>

      <uui-box>
        <umb-localize key="tetris_dashboard_classic_tetris">tetris_dashboard_classic_tetris</umb-localize>
        &mdash;
        <a href="https://github.com/albertlabo/classic-tetris" target="_blank" rel="noopener">
          <umb-localize key="tetris_dashboard_classic_tetris_link">tetris_dashboard_classic_tetris_link</umb-localize>
        </a>
      </uui-box>

      `;
  }
};
S = /* @__PURE__ */ new WeakSet();
P = function() {
  this._tetrisGameInstance?.togglePlayPause();
};
m.styles = [
  dt`
      :host {
        display: block;
        padding: 24px;
      }

      .tetris-canvas {
      }

      .stack {
        display: inline-flex;
        flex-direction: column;
      }

      uui-box {
        margin-bottom: 16px;
      }
    `
];
O([
  Et("#tetris-canvas")
], m.prototype, "_tetrisCanvas", 2);
m = O([
  pt("ee-tetris-dashboard")
], m);
const gt = m;
export {
  m as ExtendEverythingTetrisDashboardElement,
  gt as default
};
//# sourceMappingURL=element-AECaiYxF.js.map
