var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __require = typeof require !== "undefined" ? require : (x) => {
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { p as pushScopeId, a as popScopeId, c as createApp, j as jh, k as kh } from "./vendor.js";
var NetworkedHelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-22fbac40] {\n  color: #b542b9;\n}\n.fade[data-v-22fbac40] {\n  color: #9803a5;\n  /* transition: color 1s; */\n}\n.fade[data-v-22fbac40]:hover {\n  color: #a78e06;\n}\n";
pushScopeId("data-v-22fbac40");
popScopeId();
var top = "/* http://meyerweb.com/eric/tools/css/reset/\n   v4.0 | 20180602\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmain, menu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, main, menu, nav, section {\n  display: block;\n}\n";
var room = '/* Now, our styles */\n\n#room {\n    font-family: Avenir,  Arial, Helvetica, sans-serif;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    text-align: center;\n    color: #f2e6e5;\n    /* margin: 30px; */\n    border: 5px;\n    border-radius: 10px;\n    border-color: red;\n    /* position: absolute; */\n    display: block;\n    /* background-color: transparent;   */\n    background-color: black; \n }\n\n#room.darkwall {\n    background-color: transparent;  \n}\n\n#room.lightwall {\n    background-color: transparent;  \n    color: #1f1d1d;\n}\n \n#room h2{\n  font-size: 1.5em;\n  font-weight: bold;\n\n}\n\n#room .headline{\n  font-size: 4em;\n}\n\n#room .center {\n  margin: 30px;\n  padding-left: 25px;\n  }\n\n#room .postertitle  {\n    display: block;\n    font-size: 2em;\n    margin-block-start: 0.67em;\n    margin-block-end: 0.67em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    font-weight: bold;\n}\n\n  #room .spacer {\n    /* margin-left: 25px;\n    margin-right: 25px; */\n    margin: 25px;\n    }\n\n  #room .squareoff {\n    text-align: justify;\n    }\n\n  .column {\n      float: left;\n      width: 50%;\n      padding: 10px;\n    }\n  \n/* Clear floats after the columns */ \n  .row:after {\n    content: "";\n    display: table;\n    clear: both;\n    }  \n    \n/* JP */\n   /* adding margin only to the side */\n   #room .spacer-side {\n    margin-left: auto;\n    margin-right: auto;\n    }\n\n    /*font styles*/\n    .oblique {\n      font-style:italic;\n    }\n    \n    .quote {\n      padding-left: 2.5rem;\n      padding-right: 2.5rem;\n      color: #DCDCDC;\n    }\n    \n    .keyPoint {\n      color: #78cfa8;\n      font-weight: bold;\n    }\n    .largerText{\n      font-size: 3em;\n    }\n\n    /*sizing image*/\n    .full {\n      padding: 0;\n      margin:0;\n      width: 100%;\n      height: auto;\n    }\n\n    /* label vue-app */\n    .labelTitle {\n      font-size:1.2em;\n      font-weight: bold;\n      line-height: 1.6;\n    }\n    .labelLgTitle{\n      font-size:6em;\n      font-weight: bold;\n    }\n    .labelLgBody{\n      font-size:5em;\n    }\n    \n    /* title vue-app */\n    .titleStyle {\n      font-size:2em;\n      font-weight: bold;\n      line-height: 1.6;\n    }\n    .webIframe {\n      position: fixed;\n      left:-200px;\n      top:-120px;\n    }\n ';
class VueApp {
  constructor(App, width, height, createOptions = {}) {
    __publicField(this, "takeOwnership");
    __publicField(this, "setSharedData");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "vueApp");
    __publicField(this, "vueRoot");
    this.takeOwnership = this.takeOwnershipProto.bind(this);
    this.setSharedData = this.setSharedDataProto.bind(this);
    this.width = width;
    this.height = height;
    this.vueApp = createApp(App, createOptions);
  }
  mount() {
  }
  takeOwnershipProto() {
    return true;
  }
  setSharedDataProto(object) {
    return true;
  }
}
function copyCamera(source, target) {
  source.updateMatrixWorld();
  target.fov = source.fov;
  target.zoom = source.zoom;
  target.near = source.near;
  target.far = source.far;
  target.aspect = source.aspect;
  source.matrixWorld.decompose(target.position, target.quaternion, target.scale);
  target.rotation.setFromQuaternion(target.quaternion, void 0, false);
  target.updateMatrix();
  target.updateMatrixWorld(true);
}
const _HubsApp = class extends VueApp {
  constructor(App, width, height, params = {}, createOptions = {}) {
    if (params.width && params.height && params.width > 0 && params.height > 0) {
      width = params.width;
      height = params.height;
    } else if (params.width && params.width > 0 || params.height && params.height > 0) {
      if (params.width && params.width > 0) {
        height = params.width / width * height;
        width = params.width;
      }
      if (params.height && params.height > 0) {
        width = params.height / height * height;
        height = params.height;
      }
    }
    super(App, width, height, createOptions);
    __publicField(this, "isEthereal");
    __publicField(this, "isInteractive");
    __publicField(this, "isNetworked");
    __publicField(this, "isStatic");
    __publicField(this, "updateTime");
    __publicField(this, "raycaster");
    __publicField(this, "size");
    __publicField(this, "webLayer3D");
    __publicField(this, "needsUpdate", false);
    __publicField(this, "headDiv");
    this.isEthereal = false;
    this.vueApp.provide("params", params);
    this.isInteractive = false;
    this.isNetworked = false;
    this.isStatic = true;
    this.updateTime = 100;
    this.raycaster = new THREE.Raycaster();
    this.size = { width: width / 1e3, height: height / 1e3 };
    this.headDiv = document.createElement("div");
  }
  static initializeEthereal() {
    let scene = window.APP.scene;
    this.etherealCamera.matrixAutoUpdate = true;
    this.playerCamera = document.getElementById("viewing-camera").getObject3D("camera");
    this.system = jh(this.playerCamera ? this.playerCamera : scene.camera);
    window.ethSystem = this.system;
  }
  static systemTick(time, deltaTime) {
    let scene = window.APP.scene;
    if (!this.playerCamera) {
      this.playerCamera = document.getElementById("viewing-camera").getObject3D("camera");
    }
    if (!this.playerCamera)
      return;
    copyCamera(this.playerCamera, this.etherealCamera);
    if (this.etherealCamera != this.system.viewNode) {
      this.system.viewNode = this.etherealCamera;
    }
    scene.renderer.getSize(_HubsApp.system.viewResolution);
    this.system.viewFrustum.setFromPerspectiveProjectionMatrix(this.etherealCamera.projectionMatrix);
    this.system.update(deltaTime, time);
  }
  mount(useEthereal) {
    this.isEthereal = useEthereal === true;
    this.vueRoot = this.vueApp.mount(this.headDiv);
    this.vueRoot.$el.setAttribute("style", "width: " + this.width + "px; height: " + this.height + "px;");
    let l = document.createElement("link");
    l.setAttribute("href", "https://resources.realitymedia.digital/vue-apps/dist/hubs.css");
    l.setAttribute("rel", "stylesheet");
    l.setAttribute("crossorigin", "anonymous");
    this.vueRoot.$el.insertBefore(l, this.vueRoot.$el.firstChild);
    this.webLayer3D = new kh(this.vueRoot.$el, {
      autoRefresh: true,
      onLayerCreate: useEthereal ? (layer) => {
        const adapter = _HubsApp.system.getAdapter(layer);
        adapter.opacity.enabled = true;
        adapter.onUpdate = () => layer.update();
      } : (layer) => {
      },
      onLayerPaint: (layer) => {
        if (this.isStatic) {
          this.needsUpdate = true;
        }
      },
      textureEncoding: THREE.sRGBEncoding,
      renderOrderOffset: 0
    });
  }
  setNetworkMethods(takeOwnership, setSharedData) {
    this.takeOwnership = takeOwnership;
    this.setSharedData = setSharedData;
  }
  updateSharedData(dataObject) {
    this.needsUpdate = true;
  }
  getSize() {
    console.log("div size: {" + this.size.width + ", " + this.size.height + "}");
    return this.size;
  }
  getSharedData(dataObject) {
    throw new Error("getSharedData should be overridden by subclasses");
  }
  clicked(evt) {
    if (!this.isInteractive) {
      return;
    }
    const obj = evt.object3D;
    this.raycaster.ray.set(obj.position, this.webLayer3D.getWorldDirection(new THREE.Vector3()).negate());
    const hit = this.webLayer3D.hitTest(this.raycaster.ray);
    if (hit) {
      hit.target.click();
      hit.target.focus();
      console.log("hit", hit.target, hit.layer);
    }
  }
  dragStart(evt) {
  }
  dragEnd(evt) {
  }
  play() {
  }
  pause() {
  }
  destroy() {
  }
  tick(time) {
    if (this.isEthereal)
      ;
    else {
      var needsUpdate = this.needsUpdate;
      this.needsUpdate = false;
      if (this.isStatic && this.updateTime < time) {
        needsUpdate = true;
        this.updateTime = Math.random() * 2e3 + 1e3;
      }
      if (!this.isStatic) {
        this.updateTime = time;
        needsUpdate = true;
      }
      if (needsUpdate) {
        this.webLayer3D.update();
      }
    }
  }
};
let HubsApp = _HubsApp;
__publicField(HubsApp, "system");
__publicField(HubsApp, "etherealCamera", new THREE.PerspectiveCamera());
__publicField(HubsApp, "playerCamera");
var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "\na[data-v-051ea7d4] {\n  color: #b542b9;\n}\n.fade[data-v-051ea7d4] {\n  color: #9803a5;\n  /* transition: color 1s; */\n}\n.fade[data-v-051ea7d4]:hover {\n  color: #06a71b;\n}\n";
pushScopeId("data-v-051ea7d4");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang$1 = "\n#edit[data-v-862575f2] {\n  color: #bea7d1;\n}\n#edit.upclose[data-v-862575f2] {\n  color: #cc0a0a;\n}\n";
pushScopeId("data-v-862575f2");
popScopeId();
var App_vue_vue_type_style_index_0_scoped_true_lang = "\n.fakeButton[data-v-3e3fd8a5] {\n  color: #9803a5;\n  background: #a78e06\n  /* transition: color 1s; */\n}\n.fakeButton[data-v-3e3fd8a5]:hover {\n  color: #a78e06;\n  background: #9803a5;\n}\n";
pushScopeId("data-v-3e3fd8a5");
popScopeId();
