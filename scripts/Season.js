document.addEventListener("DOMContentLoaded", function() {
  const main = new Main();
});

class Main {
  constructor() {
    this._observers = [];
    this._init();
  }
  // 配列observersに追加
  set observers(val) {
    this._observers.push(val);
  }
  // 配列observersを戻す
  get observers() {
    return this._observers;
  }

  _init() {
    new MobileMenu();

    this._scrollInit();
  }

  _inviewAnimation(el, isIntersecting) {
    if (isIntersecting) {
      el.classList.add("inview");
    }
  }

  _textAnimation(el, isIntersecting) {
    if (isIntersecting) {
      const ta = new TextAnimation(el);
      ta.animate();
    }
  }

  _toggleSlideAnimation(el, isIntersecting) {
    if (isIntersecting) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _destroyObservers() {
    this.observers.forEach(ob => {
      ob.destroy();
    });
  }

  destroy() {
    this._destroyObservers();
  }

  _scrollInit() {
    this.observers = new ScrollObserver(".cover-slide", this._inviewAnimation, {
      rootMargin: "10px"
    });
    this.observers = new ScrollObserver(".animate-title", this._textAnimation, {
      rootMargin: "0px"
    });

    this.observers = new ScrollObserver(
      ".swiper-container",
      this._toggleSlideAnimation.bind(this),
      { once: false }
    );
    this.observers = new ScrollObserver(
      ".header .container.appear",
      this._inviewAnimation
    );
    this.observers = new ScrollObserver(".appear", this._inviewAnimation, {
      rootMargin: "-300px"
    });
  }
}
