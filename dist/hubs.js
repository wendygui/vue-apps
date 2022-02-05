import { p as pushScopeId, a as popScopeId, i as inject, c as createElementBlock, b as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, o as openBlock, d as createVNode, e as createCommentVNode, f as createApp, j as jh, k as kh, r as reactive, g as readonly, h as createTextVNode, n as normalizeClass, l as createStaticVNode } from './vendor-426aefc4.js';

var _imports_0$w = "https://resources.realitymedia.digital/vue-apps/dist/1a6ace377133f14a.png";

pushScopeId("data-v-0a280960");
const _hoisted_1$1g = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$1e = /*#__PURE__*/createBaseVNode("p", null, " Here's some more text just to make things not blank. ", -1 /* HOISTED */);
popScopeId();


var script$1i = {
  props: {
  msg: String
},
  setup(__props) {



const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$1g, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$1e,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = (...args) => (unref(shared).increment && unref(shared).increment(...args)))
    }, "count is: " + toDisplayString(unref(shared).state.count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$1i.__scopeId = "data-v-0a280960";

const _hoisted_1$1f = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1d = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$w
}, null, -1 /* HOISTED */);


var script$1h = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.mesg ? params.mesg : "Networked Vue Component with Shared Button Count";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1f, [
    _hoisted_2$1d,
    createVNode(script$1i, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"]),
    createCommentVNode(" <SomeText msg=\"Networked Vue Component with Shared Button Count\" /> ")
  ]))
}
}

};

class VueApp {
    takeOwnership;
    setSharedData;
    width;
    height;
    vueApp;
    vueRoot;
    constructor(App, width, height, createOptions = {}) {
        this.takeOwnership = this.takeOwnershipProto.bind(this);
        this.setSharedData = this.setSharedDataProto.bind(this);
        this.width = width;
        this.height = height;
        this.vueApp = createApp(App, createOptions);
    }
    mount() {
    }
    // dummy functions, just to let us use the same
    // data store with hubs and the web testing setup
    takeOwnershipProto() {
        return true;
    }
    setSharedDataProto(object) {
        return true;
    }
}

function initializeEthereal() {
    HubsApp$1f.initializeEthereal();
}
//THREE.Object3D.DefaultMatrixAutoUpdate = true;
function systemTick(time, deltaTime) {
    HubsApp$1f.systemTick(time, deltaTime);
}
function copyCamera(source, target) {
    source.updateMatrixWorld();
    //let oldName = target.name
    //target.copy(source, false)
    //target.name = oldName
    target.fov = source.fov;
    target.zoom = source.zoom;
    target.near = source.near;
    target.far = source.far;
    target.aspect = source.aspect;
    // target.matrixWorldInverse.copy( source.matrixWorldInverse );
    // target.projectionMatrix.copy( source.projectionMatrix );
    // target.projectionMatrixInverse.copy( source.projectionMatrixInverse );
    // target.up.copy( source.up );
    // target.matrix.copy( source.matrix );
    // target.matrixWorld.copy( source.matrixWorld );
    // target.matrixAutoUpdate = source.matrixAutoUpdate;
    // target.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
    source.matrixWorld.decompose(target.position, target.quaternion, target.scale);
    // @ts-ignore
    target.rotation.setFromQuaternion(target.quaternion, undefined, false);
    target.updateMatrix();
    target.updateMatrixWorld(true);
}
class HubsApp$1f extends VueApp {
    static system;
    static etherealCamera = new THREE.PerspectiveCamera();
    static playerCamera;
    isEthereal;
    isInteractive;
    isNetworked;
    isStatic;
    updateTime;
    raycaster;
    size;
    //takeOwnership:  () => boolean
    //setSharedData: (object: {}) => boolean
    //width: number
    //height: number
    //vueApp: App
    //vueRoot: ComponentPublicInstance | undefined 
    webLayer3D;
    needsUpdate = false;
    headDiv;
    static initializeEthereal() {
        let scene = window.APP.scene;
        this.etherealCamera.matrixAutoUpdate = true;
        //this.etherealCamera.visible = false;
        //scene.setObject3D("etherealCamera", this.etherealCamera)
        this.playerCamera = document.getElementById("viewing-camera").getObject3D("camera");
        // just in case "viewing-camera" isn't set up yet ... which it 
        // should be, but just to be careful
        this.system = jh(this.playerCamera ? this.playerCamera : scene.camera);
        window.ethSystem = this.system;
        // can customize easing etc
        // system.transition.duration = 1.5
        // system.transition.delay = 0
        // system.transition.maxWait = 4
        // system.transition.easing = ethereal.easing.easeOut
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
        scene.renderer.getSize(HubsApp$1f.system.viewResolution);
        this.system.viewFrustum.setFromPerspectiveProjectionMatrix(this.etherealCamera.projectionMatrix);
        // tick method for ethereal
        this.system.update(deltaTime, time);
    }
    constructor(App, width, height, params = {}, createOptions = {}) {
        if (params.width && params.height && params.width > 0 && params.height > 0) {
            // reset both
            width = params.width;
            height = params.height;
        }
        else if ((params.width && params.width > 0) || (params.height && params.height > 0)) {
            // set one and scale the other
            if (params.width && params.width > 0) {
                height = (params.width / width) * height;
                width = params.width;
            }
            if (params.height && params.height > 0) {
                width = (params.height / height) * height;
                height = params.height;
            }
        }
        super(App, width, height, createOptions);
        this.isEthereal = false;
        this.vueApp.provide('params', params);
        this.isInteractive = false;
        this.isNetworked = false;
        this.isStatic = true;
        this.updateTime = 100;
        this.raycaster = new THREE.Raycaster();
        //this.width = width
        //this.height = height
        this.size = { width: width / 1000, height: height / 1000 };
        //this.takeOwnership = this.takeOwnershipProto.bind(this)
        //this.setSharedData = this.setSharedDataProto.bind(this)
        this.headDiv = document.createElement("div");
        //this.headDiv.setAttribute("style","width: 100%;height: 100%;")
        //this.vueApp = createApp(App, createOptions)
    }
    mount(useEthereal) {
        this.isEthereal = useEthereal === true;
        this.vueRoot = this.vueApp.mount(this.headDiv);
        this.vueRoot.$el.setAttribute("style", "width: " + this.width + "px; height: " + this.height + "px;");
        // // add a link to the shared css
        let l = document.createElement("link");
        l.setAttribute("href", "https://resources.realitymedia.digital/vue-apps/dist/hubs.css");
        l.setAttribute("rel", "stylesheet");
        l.setAttribute("crossorigin", "anonymous");
        this.vueRoot.$el.insertBefore(l, this.vueRoot.$el.firstChild);
        // move this into method
        this.webLayer3D = new kh(this.vueRoot.$el, {
            autoRefresh: true,
            onLayerCreate: useEthereal ?
                (layer) => {
                    const adapter = HubsApp$1f.system.getAdapter(layer);
                    adapter.opacity.enabled = true;
                    adapter.onUpdate = () => layer.update();
                } :
                (layer) => { },
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
    // dummy functions, just to avoid errors if they get called before
    // networking is initialized, or called when networked is false
    // takeOwnershipProto(): boolean {
    //     return true;
    // }
    // setSharedDataProto(object: {}) {
    //     return true;
    // }
    // receive data updates.  should be overridden by subclasses, also requests
    // update next tick
    updateSharedData(dataObject) {
        this.needsUpdate = true;
    }
    getSize() {
        // if (!this.compStyles) {
        //     this.compStyles = window.getComputedStyle(this.vueRoot.$el);
        // }
        // var width = this.compStyles.getPropertyValue('width')
        // width = width && width.length > 0 ? parseFloat(width) / 1000: 1
        // var height = this.compStyles.getPropertyValue('height')
        // height = height && height.length > 0 ? parseFloat(height) / 1000: 1
        // this.size = { width: width, height: height}
        console.log("div size: {" + this.size.width + ", " + this.size.height + "}");
        return this.size;
    }
    // receive data updates.  should be overridden by subclasses
    getSharedData(dataObject) {
        throw new Error("getSharedData should be overridden by subclasses");
    }
    // override to check for your own 3D objects that aren't webLayers
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
            console.log('hit', hit.target, hit.layer);
        }
    }
    dragStart(evt) {
        // nothing here ... subclass should override
    }
    dragEnd(evt) {
        // nothing here ... subclass should override
    }
    play() {
        // if we can figure out how to pause, then restart here
    }
    pause() {
        // perhaps figure out how to pause the Vue component?
    }
    destroy() {
        // TODO: destroy the vue component and any resources, etc., it has
    }
    tick(time) {
        if (this.isEthereal) ;
        else {
            var needsUpdate = this.needsUpdate;
            this.needsUpdate = false;
            if (this.isStatic && this.updateTime < time) {
                needsUpdate = true;
                // wait a bit and do it again.  May get rid of this some day, we'll see
                this.updateTime = Math.random() * 2000 + 1000;
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
}

class Store$2 {
    _state;
    state;
    app;
    constructor(app) {
        this._state = reactive({
            count: 0
        });
        this.app = app;
        this.state = readonly(this._state);
    }
    increment() {
        if (this.app.takeOwnership()) {
            this._state.count++;
            this.app.setSharedData(this.state);
        }
    }
    updateSharedData(dataObject) {
        // need to update the elements within the state, because otherwise
        // the data won't flow to the components
        this._state.count = dataObject.count;
    }
}

class HubsApp$1e extends HubsApp$1f {
    shared;
    constructor(params = {}) {
        super(script$1h, 400, 475, params);
        // create our shared data object that will
        // share data between vue and hubs
        this.shared = new Store$2(this);
        this.vueApp.provide('shared', this.shared);
        this.isInteractive = true;
        this.isNetworked = true;
        this.isStatic = false;
    }
    updateSharedData(dataObject) {
        super.updateSharedData(dataObject);
        this.shared.updateSharedData(dataObject);
    }
    getSharedData() {
        return this.shared.state;
    }
}
var init$1e = function (params = {}) {
    let app = new HubsApp$1e(params);
    app.mount();
    return app;
};

pushScopeId("data-v-b474cdac");
const _hoisted_1$1e = {
  "xr-layer": "",
  class: "fade"
};
const _hoisted_2$1c = /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://vitejs.dev/guide/features.html",
    target: "_blank"
  }, " Vite Documentation and Then Some! "),
  /*#__PURE__*/createTextVNode(" | "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://v3.vuejs.org/",
    target: "_blank"
  }, "Vue 3 Documentation")
], -1 /* HOISTED */);
popScopeId();


var script$1g = {
  props: {
  msg: String
},
  setup(__props) {



const state = reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("h1", _hoisted_1$1e, toDisplayString(__props.msg), 1 /* TEXT */),
    _hoisted_2$1c,
    createBaseVNode("button", {
      "xr-layer": "",
      onClick: _cache[0] || (_cache[0] = $event => (unref(state).count++))
    }, "count is: " + toDisplayString(unref(state).count), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script$1g.__scopeId = "data-v-b474cdac";

pushScopeId("data-v-91ee6202");
const _hoisted_1$1d = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1b = /*#__PURE__*/createBaseVNode("img", {
  alt: "Vue logo",
  src: _imports_0$w
}, null, -1 /* HOISTED */);
const _hoisted_3$A = /*#__PURE__*/createTextVNode(" Edit code in ");
const _hoisted_4$t = /*#__PURE__*/createBaseVNode("code", null, "src/apps", -1 /* HOISTED */);
const _hoisted_5$l = /*#__PURE__*/createTextVNode(" to test hot module replacement while running project as \"npm run dev\". ");
const _hoisted_6$d = [
  _hoisted_3$A,
  _hoisted_4$t,
  _hoisted_5$l
];
popScopeId();


var script$1f = {
  setup(__props) {

const shared = inject('shared');

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$1d, [
      _hoisted_2$1b,
      createVNode(script$1g, { msg: "Vue Component with Local Button Count" }),
      createBaseVNode("p", {
        id: "edit",
        class: normalizeClass({ upclose: unref(shared).state.close }),
        "xr-layer": ""
      }, _hoisted_6$d, 2 /* CLASS */)
    ])
  ]))
}
}

};

script$1f.__scopeId = "data-v-91ee6202";

class Store$1 {
    _state;
    state;
    app;
    constructor(app) {
        this._state = reactive({
            close: false
        });
        this.app = app;
        this.state = readonly(this._state);
    }
    setClose(c) {
        if (this._state.close != c) {
            this._state.close = c;
        }
    }
}

class HubsApp$1d extends HubsApp$1f {
    shared;
    constructor(params = {}) {
        super(script$1f, 500, 500, params);
        this.isInteractive = true;
        this.shared = new Store$1(this);
        this.vueApp.provide('shared', this.shared);
    }
    docs;
    boundsSize = new THREE.Vector3();
    bounds = new THREE.Box3();
    mount() {
        super.mount(true); // use ethereal
        this.docs = this.webLayer3D.querySelector('#edit');
        if (!this.docs) {
            console.warn("Vue app needs #edit div");
            return;
        }
        let adapter = HubsApp$1d.system.getAdapter(this.docs);
        adapter.onUpdate = () => {
            this.bounds = adapter.metrics.target.visualBounds;
            this.bounds.getSize(this.boundsSize);
            var size = Math.sqrt(this.boundsSize.x * this.boundsSize.x + this.boundsSize.y * this.boundsSize.y);
            if (this.shared.state.close) {
                this.shared.setClose(size < 210);
            }
            else {
                this.shared.setClose(size < 190);
            }
            this.docs.update();
        };
    }
}
var init$1d = function (params = {}) {
    let app = new HubsApp$1d(params);
    app.mount();
    return app;
};

pushScopeId("data-v-4113a76e");
const _hoisted_1$1c = { id: "room" };
const _hoisted_2$1a = {
  class: "titleStyle",
  "xr-layer": ""
};
const _hoisted_3$z = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$s = /*#__PURE__*/createTextVNode("Click to swap objects: ");
const _hoisted_5$k = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$c = /*#__PURE__*/createTextVNode("Click to make larger: ");
const _hoisted_7$7 = /*#__PURE__*/createTextVNode("Click to make smaller: ");
popScopeId();


var script$1e = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : "Example Control Panel";
var help = params && params.parameter2 ? params.parameter2 : "Click the buttons to switch objects or change the color of an object";
const shared = inject('shared');


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$1c, [
      createBaseVNode("div", _hoisted_2$1a, toDisplayString(unref(title)), 1 /* TEXT */),
      createBaseVNode("div", null, toDisplayString(unref(help)), 1 /* TEXT */),
      _hoisted_3$z,
      createBaseVNode("div", null, [
        _hoisted_4$s,
        createBaseVNode("button", {
          "xr-layer": "",
          onClick: _cache[0] || (_cache[0] = (...args) => (unref(shared).nextObject && unref(shared).nextObject(...args)))
        }, "Swap Objects")
      ]),
      createBaseVNode("div", null, "Current object is: " + toDisplayString(unref(shared).getName()), 1 /* TEXT */),
      _hoisted_5$k,
      createBaseVNode("div", null, [
        _hoisted_6$c,
        createBaseVNode("span", {
          class: "fakeButton",
          "xr-layer": "",
          onClick: _cache[1] || (_cache[1] = (...args) => (unref(shared).larger && unref(shared).larger(...args)))
        }, "Larger")
      ]),
      createBaseVNode("div", null, [
        _hoisted_7$7,
        createBaseVNode("span", {
          class: "fakeButton",
          "xr-layer": "",
          onClick: _cache[2] || (_cache[2] = (...args) => (unref(shared).smaller && unref(shared).smaller(...args)))
        }, "Smaller")
      ])
    ])
  ]))
}
}

};

script$1e.__scopeId = "data-v-4113a76e";

class Store {
    _state;
    state;
    app;
    objects;
    constructor(app) {
        this._state = reactive({
            object: -1,
            size: { x: 1, y: 1, z: 1 }
        });
        this.app = app;
        this.state = readonly(this._state);
        this.objects = [];
        if (window.AFRAME) {
            let scene = window.AFRAME.scenes[0].object3D;
            for (let i = 1; i < 11; i++) {
                let o = scene.getObjectByName("TestObject" + i);
                if (o) {
                    o.visible = false;
                    this.objects.push(o);
                }
            }
        }
        if (this.objects.length > 0) {
            this._state.object = 0;
            this._copyVec3(this.objects[0].scale, this._state.size);
            this.objects[0].visible = true;
        }
        else {
            this._state.object = -1;
        }
    }
    _copyVec3(from, to) {
        to.x = from.x;
        to.y = from.y;
        to.z = from.z;
    }
    _nextObject() {
        if (this._state.object == -1)
            return -1;
        this.objects[this._state.object].visible = false;
        this._state.object++;
        if (this._state.object >= this.objects.length) {
            this._state.object = 0;
        }
        this.objects[this._state.object].visible = true;
        this._copyVec3(this.objects[this._state.object].scale, this._state.size);
    }
    _updateSize(size) {
        if (this._state.object >= 0) {
            this._copyVec3(size, this._state.size);
            // @ts-ignore
            this.objects[this._state.object].scale.copy(this._state.size);
            this.objects[this._state.object].updateMatrix();
        }
    }
    _larger() {
        if (this._state.object >= 0) {
            this.objects[this._state.object].scale.multiplyScalar(1.1);
            this.objects[this._state.object].updateMatrix();
            this._copyVec3(this.objects[this._state.object].scale, this._state.size);
        }
    }
    _smaller() {
        if (this._state.object >= 0) {
            this.objects[this._state.object].scale.multiplyScalar(1 / 1.1);
            this.objects[this._state.object].updateMatrix();
            this._copyVec3(this.objects[this._state.object].scale, this._state.size);
        }
    }
    // external routines called from vue
    nextObject() {
        if (this.app.takeOwnership()) {
            this._nextObject();
            this.app.setSharedData(this.state);
        }
    }
    larger() {
        if (this.app.takeOwnership()) {
            this._larger();
            this.app.setSharedData(this.state);
        }
    }
    smaller() {
        if (this.app.takeOwnership()) {
            this._smaller();
            this.app.setSharedData(this.state);
        }
    }
    getName() {
        if (this._state.object >= 0) {
            return this.objects[this._state.object].name;
        }
        else {
            return "NO OBJECTS";
        }
    }
    updateSharedData(dataObject) {
        // need to update the elements within the state, because otherwise
        // the data won't flow to the components
        if (this._state.object != dataObject.object) {
            this.objects[this._state.object].visible = false;
            this.objects[dataObject.object].visible = true;
            this._state.object = dataObject.object;
        }
        this._updateSize(dataObject.size);
    }
}

class HubsApp$1c extends HubsApp$1f {
    shared;
    constructor(params = {}) {
        super(script$1e, 400, 225, params);
        // create our shared data object that will
        // share data between vue and hubs
        this.shared = new Store(this);
        this.vueApp.provide('shared', this.shared);
        this.isInteractive = true;
        this.isNetworked = true;
        this.isStatic = false;
    }
    updateSharedData(dataObject) {
        super.updateSharedData(dataObject);
        this.shared.updateSharedData(dataObject);
    }
    getSharedData() {
        return this.shared.state;
    }
}
var init$1c = function (params = {}) {
    let app = new HubsApp$1c(params);
    app.mount();
    return app;
};

var script$1d = {
  props: {
  msg: String
},
  setup(__props) {



reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("h2", null, toDisplayString(__props.msg), 1 /* TEXT */))
}
}

};

const _hoisted_1$1b = {
  id: "room",
  class: "darkwall"
};


var script$1c = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL TITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1b, [
    createVNode(script$1d, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$1b extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$1c, width, height, params);
    }
}
var init$1b = function (params = {}) {
    let app = new HubsApp$1b(300, 100, params);
    app.mount();
    return app;
};

var script$1b = {
  props: {
  msg: String
},
  setup(__props) {



reactive({ count: 0 });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("h4", null, toDisplayString(__props.msg), 1 /* TEXT */))
}
}

};

const _hoisted_1$1a = {
  id: "room",
  class: "darkwall"
};


var script$1a = {
  setup(__props) {

let params = inject("params");
var mesg = params && params.message ? params.message : "PORTAL SUBTITLE";

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1a, [
    createVNode(script$1b, { msg: unref(mesg) }, null, 8 /* PROPS */, ["msg"])
  ]))
}
}

};

class HubsApp$1a extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$1a, width, height, params);
    }
}
var init$1a = function (params = {}) {
    let app = new HubsApp$1a(300, 100, params);
    app.mount();
    return app;
};

var _imports_0$v = "https://resources.realitymedia.digital/vue-apps/dist/38d6d7a1e02fc2f9.png";

const _hoisted_1$19 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$19 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$v,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_3$y = /*#__PURE__*/createBaseVNode("div", { class: "displaytext" }, "AR allows us to extend our physical reality; VR creates for us a different reality.", -1 /* HOISTED */);

var script$19 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$19, [
    createVNode(script$1d, { msg: "Reality Media" }),
    _hoisted_2$19,
    _hoisted_3$y
  ]))
}
}

};

class HubsApp$19 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$19, width, height, params);
        //this.isInteractive = true;
    }
}
var init$19 = function (params = {}) {
    let app = new HubsApp$19(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$u = "https://resources.realitymedia.digital/vue-apps/dist/7af7b95b35fd7616.jpg";

const _hoisted_1$18 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$18 = { class: "spacer" };
const _hoisted_3$x = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$u,
  width: "250"
}, null, -1 /* HOISTED */);
const _hoisted_4$r = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " Each reality medium mediates and remediates. It offers a new representation of the world that we implicitly compare to our experience of the world in itself, but also through other media.", -1 /* HOISTED */);
const _hoisted_5$j = /*#__PURE__*/createBaseVNode("p", null, [
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://realitymedia.digital",
    target: "_blank"
  }, " Start at the reality media site. "),
  /*#__PURE__*/createTextVNode(" | ")
], -1 /* HOISTED */);

var script$18 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$18, [
    createBaseVNode("div", _hoisted_2$18, [
      createVNode(script$1d, { msg: "AR & VR as reality media" }),
      _hoisted_3$x,
      _hoisted_4$r
    ]),
    _hoisted_5$j
  ]))
}
}

};

class HubsApp$18 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$18, width, height, params);
        this.isInteractive = true;
    }
}
var init$18 = function (params = {}) {
    let app = new HubsApp$18(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$t = "https://resources.realitymedia.digital/vue-apps/dist/7ab3d86afd48dbfb.jpg";

const _hoisted_1$17 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$17 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$t,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Film became one of the most important reality media of the twentieth century, and in some ways, it is a forerunner of virtual reality.")
], -1 /* HOISTED */);

var script$17 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$17, [
    createVNode(script$1d, { msg: "The LaCiotat Effect" }),
    _hoisted_2$17
  ]))
}
}

};

class HubsApp$17 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$17, width, height, params);
        //this.isInteractive = true;
    }
}
var init$17 = function (params = {}) {
    let app = new HubsApp$17(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$s = "https://resources.realitymedia.digital/vue-apps/dist/91fdfa811e752dc8.jpg";

const _hoisted_1$16 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$16 = { class: "spacer" };
const _hoisted_3$w = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$s,
  width: "200"
}, null, -1 /* HOISTED */);
const _hoisted_4$q = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "3-D computer graphics help to construct the visual realities of AR and VR, that is photorealism. The uncanny valley.", -1 /* HOISTED */);

var script$16 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$16, [
    createBaseVNode("div", _hoisted_2$16, [
      createVNode(script$1d, { msg: "3-D Graphics & Tracking" }),
      _hoisted_3$w,
      _hoisted_4$q
    ])
  ]))
}
}

};

class HubsApp$16 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$16, width, height, params);
        // this.isInteractive = true;
    }
}
var init$16 = function (params = {}) {
    let app = new HubsApp$16(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$15 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$15 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createCommentVNode("<img src=\"../../assets/images/parthenon.png\" width=\"250\">"),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Presence in VR is usually conceived of as forgetting that the medium is there. The idea is that if the user can be enticed into behaving as if she were not aware of all the complex technology, then she feels presence.")
], -1 /* HOISTED */);

var script$15 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$15, [
    createVNode(script$1d, { msg: "Presence" }),
    _hoisted_2$15
  ]))
}
}

};

class HubsApp$15 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$15, width, height, params);
        //this.isInteractive = true;
    }
}
var init$15 = function (params = {}) {
    let app = new HubsApp$15(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$r = "https://resources.realitymedia.digital/vue-apps/dist/dc05c04546a69e64.png";

const _hoisted_1$14 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$14 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$r,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Reality media applications often function as additions to established genres. Most current AR and VR applications behave like applications or artifacts that we know from earlier media.")
], -1 /* HOISTED */);

var script$14 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$14, [
    createVNode(script$1d, { msg: "Genres" }),
    _hoisted_2$14
  ]))
}
}

};

class HubsApp$14 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$14, width, height, params);
        //this.isInteractive = true;
    }
}
var init$14 = function (params = {}) {
    let app = new HubsApp$14(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$13 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$13 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$r,
    width: "250"
  }),
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "VR will continue to construct special realities, apart from the everyday. VR worlds will continue to be metaphoric worlds.")
], -1 /* HOISTED */);

var script$13 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$13, [
    createVNode(script$1d, { msg: "The Future of AR & VR" }),
    _hoisted_2$13
  ]))
}
}

};

class HubsApp$13 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$13, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$13 = function (params = {}) {
    let app = new HubsApp$13(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$12 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$12 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pervasive, always-on AR applications have the potential to provide companies or government authorities even more information and with more precision than our current mobile applications do, both by aggregating our habits as consumers and by identifying us as individuals.")
], -1 /* HOISTED */);

var script$12 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$12, [
    createVNode(script$1d, { msg: "Privacy and Public Space" }),
    _hoisted_2$12
  ]))
}
}

};

class HubsApp$12 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$12, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$12 = function (params = {}) {
    let app = new HubsApp$12(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$11 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$11 = /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "AR & VR as reality media", -1 /* HOISTED */);
const _hoisted_3$v = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);
const _hoisted_4$p = [
  _hoisted_2$11,
  _hoisted_3$v
];

var script$11 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$11, _hoisted_4$p))
}
}

};

class HubsApp$11 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$11, width, height, params);
        // this.isInteractive = true;
    }
}
var init$11 = function (params = {}) {
    let app = new HubsApp$11(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$10 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$10 = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$10 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$10, [
    createVNode(script$1d, { msg: "The History of Reality Media" }),
    _hoisted_2$10
  ]))
}
}

};

class HubsApp$10 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$10, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$10 = function (params = {}) {
    let app = new HubsApp$10(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$$ = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$$ = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$$ = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$$, [
    createVNode(script$1d, { msg: "3-D & Tracking" }),
    _hoisted_2$$
  ]))
}
}

};

class HubsApp$$ extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$$, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$$ = function (params = {}) {
    let app = new HubsApp$$(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$_ = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$_ = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$_ = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$_, [
    createVNode(script$1d, { msg: "Presence" }),
    _hoisted_2$_
  ]))
}
}

};

class HubsApp$_ extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$_, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$_ = function (params = {}) {
    let app = new HubsApp$_(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$Z = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Z = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$Z = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$Z, [
    createVNode(script$1d, { msg: "Genres" }),
    _hoisted_2$Z
  ]))
}
}

};

class HubsApp$Z extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$Z, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$Z = function (params = {}) {
    let app = new HubsApp$Z(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$Y = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Y = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$Y = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$Y, [
    createVNode(script$1d, { msg: "Future" }),
    _hoisted_2$Y
  ]))
}
}

};

class HubsApp$Y extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$Y, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$Y = function (params = {}) {
    let app = new HubsApp$Y(300, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$X = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$X = /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "flushleft" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Some of the key differences between “classic” VR and AR"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Extended reality (XR) and the immersive web "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("h3", null, " Where AR and VR fit on Milgram and Kishino’s virtuality continuum")
  ])
], -1 /* HOISTED */);

var script$X = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$X, [
    createVNode(script$1d, { msg: "Privacy" }),
    _hoisted_2$X
  ]))
}
}

};

class HubsApp$X extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$X, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$X = function (params = {}) {
    let app = new HubsApp$X(300, 475, params);
    app.mount();
    return app;
};

var _imports_0$q = "https://resources.realitymedia.digital/vue-apps/dist/190994370aebe395.png";

const _hoisted_1$W = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$W = { class: "spacer" };
const _hoisted_3$u = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$q,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$o = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$i = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$b = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode(" First person shooter games such as "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://www.half-life.com/en/alyx/",
    target: "_blank"
  }, "HalfLife: Alyx "),
  /*#__PURE__*/createTextVNode(" have long used 3-D graphics to create an immersive experience for millions of players. And for decades, players on computers and game consoles have yearned for true VR so that they could fall through the screen into the worlds on the other side.")
], -1 /* HOISTED */);

var script$W = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$W, [
      createBaseVNode("div", _hoisted_2$W, [
        _hoisted_3$u,
        _hoisted_4$o,
        _hoisted_5$i,
        createVNode(script$1d, { msg: "HalfLife: Alyx" }),
        _hoisted_6$b
      ])
    ])
  ]))
}
}

};

class HubsApp$W extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$W, width, height, params);
        this.isInteractive = true;
    }
}
var init$W = function (params = {}) {
    let app = new HubsApp$W(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$V = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$V = { class: "spacer" };
const _hoisted_3$t = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Pokemon Go (2016) is perhaps still the best-known AR game. The Pokemon franchise was already decades old, and this was certainly part of the answer for the AR game’s surprising impact. It was the first Pokemon game on a mobile phone and the first free Pokemon game on any platform. ", -1 /* HOISTED */);

var script$V = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$V, [
    createBaseVNode("div", _hoisted_2$V, [
      createVNode(script$1d, { msg: "Pokemon Go" }),
      _hoisted_3$t
    ])
  ]))
}
}

};

class HubsApp$V extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$V, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$V = function (params = {}) {
    let app = new HubsApp$V(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$U = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$U = { class: "spacer" };
const _hoisted_3$s = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Beat Saber is a VR rhythm game with a little Star Wars thrown in. The player uses lightsabers to keep the beat. ", -1 /* HOISTED */);

var script$U = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$U, [
    createBaseVNode("div", _hoisted_2$U, [
      createVNode(script$1d, { msg: "Beat Saber" }),
      _hoisted_3$s
    ])
  ]))
}
}

};

class HubsApp$U extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$U, width, height, params);
        // this.isInteractive = true;
    }
}
var init$U = function (params = {}) {
    let app = new HubsApp$U(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$T = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$T = { class: "spacer" };
const _hoisted_3$r = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "In this AR version of the transmedia franchise GPS is used to determine your location in the world. Your location and the zombies appear in an enhanced Google Maps map on the phone screen. ", -1 /* HOISTED */);

var script$T = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$T, [
    createBaseVNode("div", _hoisted_2$T, [
      createVNode(script$1d, { msg: "Walking Dead: Our World" }),
      _hoisted_3$r
    ])
  ]))
}
}

};

class HubsApp$T extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$T, width, height, params);
        // this.isInteractive = true;
    }
}
var init$T = function (params = {}) {
    let app = new HubsApp$T(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$S = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$S = { class: "spacer" };
const _hoisted_3$q = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Like video games and 360-degree video, VR art emphasizes immersion as the feature that makes the experience unique, as in a VR work by Christian Lemmerz entitled La Apparizione (2017). ", -1 /* HOISTED */);

var script$S = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$S, [
    createBaseVNode("div", _hoisted_2$S, [
      createVNode(script$1d, { msg: "La Apparizione" }),
      _hoisted_3$q
    ])
  ]))
}
}

};

class HubsApp$S extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$S, width, height, params);
        //this.isInteractive = true;
    }
}
var init$S = function (params = {}) {
    let app = new HubsApp$S(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$R = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$R = { class: "spacer" };
const _hoisted_3$p = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Minecraft VR is a fully immersive, headset version of the sandbox game that already runs on computers, game consoles, and mobile devices. It is called a \"sandbox game\" because it provides an independent environment in which players can make their own structures and objects out of virtual, LEGO-like blocks. ", -1 /* HOISTED */);

var script$R = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$R, [
    createBaseVNode("div", _hoisted_2$R, [
      createVNode(script$1d, { msg: "Minecraft VR" }),
      _hoisted_3$p
    ])
  ]))
}
}

};

class HubsApp$R extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$R, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$R = function (params = {}) {
    let app = new HubsApp$R(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$Q = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$Q = { class: "spacer headline" };

var script$Q = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$Q, [
    createBaseVNode("div", _hoisted_2$Q, [
      createVNode(script$1d, { msg: "AR & VR GAMES" })
    ])
  ]))
}
}

};

class HubsApp$Q extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$Q, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$Q = function (params = {}) {
    let app = new HubsApp$Q(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$P = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$P = { class: "spacer headline" };

var script$P = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$P, [
    createBaseVNode("div", _hoisted_2$P, [
      createVNode(script$1d, { msg: "AR & VR ART" })
    ])
  ]))
}
}

};

class HubsApp$P extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$P, width, height, params);
        //        this.isInteractive = true;
    }
}
var init$P = function (params = {}) {
    let app = new HubsApp$P(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$O = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer-side\"><br><br><!-- &lt;Title msg=&quot;Aura&quot; /&gt; --><div class=\"headline\">Aura</div><br><br><div class=\"squareoff\"><p>In 1930s, Walter Benjamin introduced the concept of <em>aura</em> in The Work of Art in the Age of Mechanical Reproduction. Aura is the <em>here and now</em> that work possesses because of its unique history of production and transmissinowon. </p><br><p>AR applications are not perfect reproductive technologies, as some draw on the physical and cultural uniquesness, <em>the here and now</em> of particular places </p></div></div></div>", 1);
const _hoisted_2$O = [
  _hoisted_1$O
];

var script$O = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$O))
}
}

};

class HubsApp$O extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$O, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$O = function (params = {}) {
    let app = new HubsApp$O(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$N = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer-side" }, [
    /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
      /*#__PURE__*/createTextVNode(" \"These definitions circle around one core idea: that presence is a kind of absence, "),
      /*#__PURE__*/createBaseVNode("span", { class: "keyPoint" }, "the absence of mediation."),
      /*#__PURE__*/createTextVNode(" Presence as transportation, immersion, or realism all come down to the user's forgetting that the medium is there.\" ")
    ])
  ])
], -1 /* HOISTED */);
const _hoisted_2$N = [
  _hoisted_1$N
];

var script$N = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$N))
}
}

};

class HubsApp$N extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$N, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$N = function (params = {}) {
    let app = new HubsApp$N(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$M = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$M = { class: "spacer-side" };
const _hoisted_3$o = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$n = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$h = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "\"Casa Batlló, one of the masterpieces of Antoni Gaudí, can be experienced with the mobile AR, which visualizes the reconstructed interior and the design inspirations through 3D animations.\"", -1 /* HOISTED */);

var script$M = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$M, [
      createBaseVNode("div", _hoisted_2$M, [
        createVNode(script$1d, { msg: "Gaudí's Casa Batlló with AR" }),
        _hoisted_3$o,
        _hoisted_4$n,
        _hoisted_5$h
      ])
    ])
  ]))
}
}

};

class HubsApp$M extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$M, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$M = function (params = {}) {
    let app = new HubsApp$M(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$p = "https://resources.realitymedia.digital/vue-apps/dist/b9a307db3b6157e0.jpg";

const _hoisted_1$L = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$p,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$L = [
  _hoisted_1$L
];

var script$L = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$L))
}
}

};

class HubsApp$L extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$L, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$L = function (params = {}) {
    let app = new HubsApp$L(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$K = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$K = { class: "spacer-side" };
const _hoisted_3$n = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" The term cybersickness, or visually induced motion sickness, has been coined to describe symptoms including headache, nausea, eye strain, dizziness, fatigue, or even vomiting that may occur during or after exposure to a virtual environment. Cybersickness is visceral evidence that VR is not the medium to end all media. Cybersickness reminds the susceptible user of the medium in a powerful way. Nausea replaces astonishment. ")
], -1 /* HOISTED */);

var script$K = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$K, [
      createBaseVNode("div", _hoisted_2$K, [
        createVNode(script$1d, { msg: "Cybersickness and the negation of presence" }),
        _hoisted_3$n
      ])
    ])
  ]))
}
}

};

class HubsApp$K extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$K, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$K = function (params = {}) {
    let app = new HubsApp$K(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$o = "https://resources.realitymedia.digital/vue-apps/dist/b92c5f5aa0792665.jpg";

const _hoisted_1$J = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$o,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$J = [
  _hoisted_1$J
];

var script$J = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$J))
}
}

};

class HubsApp$J extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$J, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$J = function (params = {}) {
    let app = new HubsApp$J(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$I = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$I = { class: "spacer-side" };
const _hoisted_3$m = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$m = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$a = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Researchers have long pursued the idea of emotional reactions such as empathy as a test of presence. VR is understood as getting us closer to the authentic or the real. But forgetting the medium is not necessary for a sense of presence. Presence can be understood in a more nuanced way as a liminal zone between forgetting and acknowledging VR as a medium. ", -1 /* HOISTED */);

var script$I = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$I, [
      createBaseVNode("div", _hoisted_2$I, [
        _hoisted_3$m,
        _hoisted_4$m,
        createVNode(script$1d, { msg: "Presence and Empathy" }),
        _hoisted_5$g,
        _hoisted_6$a
      ])
    ])
  ]))
}
}

};

class HubsApp$I extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$I, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$I = function (params = {}) {
    let app = new HubsApp$I(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$n = "https://resources.realitymedia.digital/vue-apps/dist/25ecf05f66df0777.jpg";

const _hoisted_1$H = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$n,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$H = [
  _hoisted_1$H
];

var script$H = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$H))
}
}

};

class HubsApp$H extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$H, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$H = function (params = {}) {
    let app = new HubsApp$H(600, 475, params);
    app.mount();
    return app;
};

var _imports_1$1 = "https://resources.realitymedia.digital/vue-apps/dist/beb618ffe3769bb6.png";

var _imports_1 = "https://resources.realitymedia.digital/vue-apps/dist/bf21f3442d3fa84d.png";

const _hoisted_1$G = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("div", {
      class: "largerText",
      style: {"font-weight":"bold","text-align":"left"}
    }, "1. What is Presence?"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1$1,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "2. Manifestations of Presence"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "3. Aura, Place and Space ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$G = [
  _hoisted_1$G
];

var script$G = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$G))
}
}

};

class HubsApp$G extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$G, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$G = function (params = {}) {
    let app = new HubsApp$G(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$m = "https://resources.realitymedia.digital/vue-apps/dist/46d7793fa7ab24ad.png";

const _hoisted_1$F = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("div", { style: {"font-size":"2.4rem","font-weight":"bold","text-align":"left"} }, "2. Manifestations of Presence"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$m,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "1. What is Presence?"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1$1,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "3. Aura, Place and Space ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$F = [
  _hoisted_1$F
];

var script$F = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$F))
}
}

};

class HubsApp$F extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$F, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$F = function (params = {}) {
    let app = new HubsApp$F(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$l = "https://resources.realitymedia.digital/vue-apps/dist/f89cb4e350469b14.png";

const _hoisted_1$E = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("div", {
      class: "largerText",
      style: {"font-size":"2.8rem","font-weight":"bold","text-align":"left"}
    }, "3. Aura, Place and Space "),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$l,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "1. What is Presence?"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_1$1,
      width: "50",
      style: {"float":"right"}
    }),
    /*#__PURE__*/createBaseVNode("div", {
      class: "postertitle",
      style: {"text-align":"left"}
    }, "2. Manifestations of Presence")
  ])
], -1 /* HOISTED */);
const _hoisted_2$E = [
  _hoisted_1$E
];

var script$E = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$E))
}
}

};

class HubsApp$E extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$E, width, height, params);
        //     this.isInteractive = true;
    }
}
var init$E = function (params = {}) {
    let app = new HubsApp$E(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$k = "https://resources.realitymedia.digital/vue-apps/dist/4905757374923259.png";

const _hoisted_1$D = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$D = { class: "spacer-side" };
const _hoisted_3$l = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$l = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$f = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$k,
  width: "20",
  style: {"float":"left","margin":"10px"}
}, null, -1 /* HOISTED */);
const _hoisted_6$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_8$2 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("360"),
  /*#__PURE__*/createBaseVNode("span", null, "°"),
  /*#__PURE__*/createTextVNode(" film Clouds Over Sidra created by Chris Milk and Gabo Arora shows the life of Syrian refugees in Za'atari camp in Jordan. The camera follows 12-year old Sidra in her everyday life, allowing the users to be present with Sidra. ")
], -1 /* HOISTED */);
const _hoisted_9$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_10 = /*#__PURE__*/createBaseVNode("blockquote", { class: "squareoff" }, "\"When you’re inside of the headset . . . you see full 360 degrees, in all directions. And when you’re sitting there in her room, watching her, you're not watching it through a television screen, you’re not watching it through a window, you’re sitting there with her. When you look down, you're sitting on the same ground that she’s sitting on. And because of that, you feel her humanity in a deeper way. You empathize with her in a deeper way. (Milk 2015)\"", -1 /* HOISTED */);

var script$D = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$D, [
      createBaseVNode("div", _hoisted_2$D, [
        _hoisted_3$l,
        _hoisted_4$l,
        _hoisted_5$f,
        createVNode(script$1d, { msg: "Ultimate Empathy Machine" }),
        _hoisted_6$9,
        _hoisted_7$6,
        _hoisted_8$2,
        _hoisted_9$1,
        _hoisted_10
      ])
    ])
  ]))
}
}

};

class HubsApp$D extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$D, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$D = function (params = {}) {
    let app = new HubsApp$D(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$j = "https://resources.realitymedia.digital/vue-apps/dist/b464dbe90d6133ab.jpg";

const _hoisted_1$C = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$j,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$C = [
  _hoisted_1$C
];

var script$C = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$C))
}
}

};

class HubsApp$C extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$C, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$C = function (params = {}) {
    let app = new HubsApp$C(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$i = "https://resources.realitymedia.digital/vue-apps/dist/d0da198fc94f906c.png";

const _hoisted_1$B = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$B = { class: "spacer-side" };
const _hoisted_3$k = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$k = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$e = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$i,
  width: "20",
  style: {"float":"right","margin":"10px"}
}, null, -1 /* HOISTED */);
const _hoisted_6$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_8$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Nonnie de la Peña's "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://embed.ted.com/talks/nonny_de_la_pena_the_future_of_news_virtual_reality",
    target: "_blank"
  }, "Ted Talk"),
  /*#__PURE__*/createTextVNode(" called 'The future of news?'' introduces a new form of journalism where Virtual Reality technology is used to put audience inside the stories. In her work, she created VR stories about imprisonment in Guantanamo and hunger in Los Angeles to induce empathy in the audience.")
], -1 /* HOISTED */);

var script$B = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$B, [
      createBaseVNode("div", _hoisted_2$B, [
        _hoisted_3$k,
        _hoisted_4$k,
        _hoisted_5$e,
        createVNode(script$1d, { msg: "The future of news?" }),
        _hoisted_6$8,
        _hoisted_7$5,
        _hoisted_8$1
      ])
    ])
  ]))
}
}

};

class HubsApp$B extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$B, width, height, params);
        this.isInteractive = true;
    }
}
var init$B = function (params = {}) {
    let app = new HubsApp$B(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$h = "https://resources.realitymedia.digital/vue-apps/dist/7b682f773776cc4e.jpg";

const _hoisted_1$A = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$h,
    style: {"width":"100%"}
  })
], -1 /* HOISTED */);
const _hoisted_2$A = [
  _hoisted_1$A
];

var script$A = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$A))
}
}

};

class HubsApp$A extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$A, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$A = function (params = {}) {
    let app = new HubsApp$A(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$g = "https://resources.realitymedia.digital/vue-apps/dist/2176dc66f5a02546.png";

const _hoisted_1$z = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer-side" }, [
    /*#__PURE__*/createBaseVNode("div", { class: "postertitle" }, "Pit Experiment"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$g,
      style: {"width":"60%","float":"right","margin":"0 0 0 15px"}
    }),
    /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "The pit experiment is a virtual experiment often used to evaluate the sence of presence. The user is given a task to grab an object on plank and take it to the other side, crossing the pit. ")
  ])
], -1 /* HOISTED */);
const _hoisted_2$z = [
  _hoisted_1$z
];

var script$z = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$z))
}
}

};

class HubsApp$z extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$z, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$z = function (params = {}) {
    let app = new HubsApp$z(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$f = "https://resources.realitymedia.digital/vue-apps/dist/dedcb7f162af5eae.jpg";

const _hoisted_1$y = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$y = { class: "spacer-side" };
const _hoisted_3$j = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$j = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$d = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$f,
    style: {"width":"60%","float":"right","margin":"0 0 0 15px"}
  }),
  /*#__PURE__*/createTextVNode(" This experiment was inspired by the VR \"pit\" experiment described on the wall to your left. The subjects wore AR headsets instead of VR ones. They could see the room around them, but the pit itself was still virtual. Would the subjects would feel the same measurable anxiety in AR as in VR? The subjects filled out a questionnaire after the experience and indicated that they did have a feeling of presence, but in this case, unlike in the VR experiment, the physiological data (heart rate etc.) did not indicate a response. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Gandy, Maribeth, et al. 2010. “Experiences with an AR Evaluation Test Bed: Presence, Performance, and Physiological Measurement.” In 2010 IEEE International Symposium on Mixed and Augmented Reality, 127–36. Seoul, Korea (South): IEEE. https://doi.org/10.1109/ISMAR.2010.5643560. ")
], -1 /* HOISTED */);

var script$y = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$y, [
      createBaseVNode("div", _hoisted_2$y, [
        createVNode(script$1d, { msg: "Presence in AR" }),
        _hoisted_3$j,
        _hoisted_4$j,
        _hoisted_5$d
      ])
    ])
  ]))
}
}

};

class HubsApp$y extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$y, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$y = function (params = {}) {
    let app = new HubsApp$y(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$x = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer-side\"><div class=\"postertitle\">Presence</div><div class=\"squareoff\">Presence is a kind of absence, the absence of mediation. If the users can forget that the medium is there, then they feel presence. <br><br> To look further, Lombard and Ditton&#39;s classification of presence is useful. They grouped definitions of presence into two categories, which are <br><br><div class=\"keyPoint\"> (1) individual perception of the world <br> (2) social interaction and engagement with others</div><br><br> The first category includes presence as transportation, as immersion and as realism. </div><br><br><div class=\"squareoff\" style=\"font-style:italic;\">&quot;VR and AR cannot deceive their users into believing that they are having a non-mediated experience. But that is not necessary for a sense of presence.&quot;</div></div></div>", 1);
const _hoisted_2$x = [
  _hoisted_1$x
];

var script$x = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$x))
}
}

};

class HubsApp$x extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$x, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$x = function (params = {}) {
    let app = new HubsApp$x(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$w = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$w = { class: "spacer-side" };
const _hoisted_3$i = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$i = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$4 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Treehugger: Wawona VR experience transports the users to the red giant Sequoia trees from the Sequoia National Park. It provides a sense of intimacy with the tree - with its bark, with the cells that make up its being. The vividness of the work illustrates "),
  /*#__PURE__*/createBaseVNode("em", null, "presence"),
  /*#__PURE__*/createTextVNode(". ")
], -1 /* HOISTED */);

var script$w = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$w, [
      createBaseVNode("div", _hoisted_2$w, [
        _hoisted_3$i,
        _hoisted_4$i,
        createVNode(script$1d, { msg: "Treehugger: Wawona" }),
        _hoisted_5$c,
        _hoisted_6$7,
        _hoisted_7$4,
        createCommentVNode(" In this experience, users find themselves on the threshold of forgetting that we are having a VR experience. Being on that threshold is a sence of presence in a reality medium. ")
      ])
    ])
  ]))
}
}

};

class HubsApp$w extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$w, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$w = function (params = {}) {
    let app = new HubsApp$w(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$e = "https://resources.realitymedia.digital/vue-apps/dist/900c5c33cb50b0df.png";

const _hoisted_1$v = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$e,
    class: "full"
  }),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", null, "Reality media have always been about presence. The legend of La Ciotat is a myth of presence, which you can explore in the gallery entitled \"What are Reality Media?\"")
], -1 /* HOISTED */);
const _hoisted_2$v = [
  _hoisted_1$v
];

var script$v = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$v))
}
}

};

class HubsApp$v extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$v, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$v = function (params = {}) {
    let app = new HubsApp$v(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$d = "https://resources.realitymedia.digital/vue-apps/dist/4f63695c469772e2.png";

const _hoisted_1$u = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$d,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$u = [
  _hoisted_1$u
];

var script$u = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$u))
}
}

};

class HubsApp$u extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$u, width, height, params);
        //    this.isInteractive = true;
    }
}
var init$u = function (params = {}) {
    let app = new HubsApp$u(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$t = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createCommentVNode(" <Title msg=\"The future of news?\" /> "),
    /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "Parthenon model explanation")
  ])
], -1 /* HOISTED */);
const _hoisted_2$t = [
  _hoisted_1$t
];

var script$t = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$t))
}
}

};

class HubsApp$t extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$t, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$t = function (params = {}) {
    let app = new HubsApp$t(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$c = "https://resources.realitymedia.digital/vue-apps/dist/b5309e2b45d5330c.jpg";

const _hoisted_1$s = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$c,
    class: "full"
  })
], -1 /* HOISTED */);
const _hoisted_2$s = [
  _hoisted_1$s
];

var script$s = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$s))
}
}

};

class HubsApp$s extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$s, width, height, params);
        //   this.isInteractive = true;
    }
}
var init$s = function (params = {}) {
    let app = new HubsApp$s(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$r = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$r = { class: "spacer-side" };
const _hoisted_3$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$h = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$b = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, "The Franklin Institute in Philadelphia offered a mobile AR experience for their Terracotta Warrior exhibition. The app allowed visitors to use their smartphones to scan items and view various AR content to learn more about the history behind the clay soldiers.", -1 /* HOISTED */);

var script$r = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$r, [
      createBaseVNode("div", _hoisted_2$r, [
        createVNode(script$1d, { msg: "Terracotta Warriors AR" }),
        _hoisted_3$h,
        _hoisted_4$h,
        _hoisted_5$b
      ])
    ])
  ]))
}
}

};

class HubsApp$r extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$r, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$r = function (params = {}) {
    let app = new HubsApp$r(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$q = { id: "room" };
const _hoisted_2$q = { class: "spacer" };
const _hoisted_3$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$g = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$a = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$3 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("Measuring the amount of presence or the sense of being there, is one of the few ways to assess the quality of a virtual space. This virtual pit experiment is a space that measures the presence by measuring changes in physiological reactions in users such as changes in heart rate. In this virtual room, feel whether your heart is beating faster or your hands get sweaty as if you are in a real space. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Meehan, M., Insko, B., Whitton, M., & Brooks Jr, F. P. (2002). Physiological measures of presence in stressful virtual environments. Acm transactions on graphics (tog), 21(3), 645-652. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br")
], -1 /* HOISTED */);

var script$q = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$q, [
      createBaseVNode("div", _hoisted_2$q, [
        _hoisted_3$g,
        _hoisted_4$g,
        createVNode(script$1d, { msg: "Pit Experiment" }),
        _hoisted_5$a,
        _hoisted_6$6,
        _hoisted_7$3
      ])
    ])
  ]))
}
}

};

class HubsApp$q extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$q, width, height, params);
    }
}
var init$q = function (params = {}) {
    let app = new HubsApp$q(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$p = { id: "room" };
const _hoisted_2$p = { class: "spacer" };
const _hoisted_3$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$f = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$2 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("1. Pick up the rubber duck in this room and try to place it in the designated area on the far side of the room. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" 2. Pick up another rubber duck and drop it on the red and blue target on the floor. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Head-Mounted Display devices such as Oculus Quests are recommended for this experiment. ")
], -1 /* HOISTED */);
const _hoisted_8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$p = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$p, [
      createBaseVNode("div", _hoisted_2$p, [
        _hoisted_3$f,
        _hoisted_4$f,
        createVNode(script$1d, { msg: "Instructions" }),
        _hoisted_5$9,
        _hoisted_6$5,
        _hoisted_7$2,
        _hoisted_8,
        _hoisted_9
      ])
    ])
  ]))
}
}

};

class HubsApp$p extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$p, width, height, params);
    }
}
var init$p = function (params = {}) {
    let app = new HubsApp$p(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$o = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$o = { class: "spacer" };
const _hoisted_3$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$e = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$o = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$o, [
      createBaseVNode("div", _hoisted_2$o, [
        _hoisted_3$e,
        _hoisted_4$e,
        createVNode(script$1d, { msg: "Very carefully stretch your arms out for balance." })
      ])
    ])
  ]))
}
}

};

class HubsApp$o extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$o, width, height, params);
    }
}
var init$o = function (params = {}) {
    let app = new HubsApp$o(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$n = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$n = { class: "spacer" };
const _hoisted_3$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$d = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$n = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$n, [
      createBaseVNode("div", _hoisted_2$n, [
        _hoisted_3$d,
        _hoisted_4$d,
        createVNode(script$1d, { msg: "Does this experiment make you sweat or your heart beat faster?" })
      ])
    ])
  ]))
}
}

};

class HubsApp$n extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$n, width, height, params);
    }
}
var init$n = function (params = {}) {
    let app = new HubsApp$n(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$m = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$m = { class: "spacer" };
const _hoisted_3$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$c = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$8 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("i", null, "Reality Media"),
  /*#__PURE__*/createTextVNode(" is a project encompassing three writing spaces, three technologies for representing ideas: print, the web, and immersive VR. The printed page is a writing space with a tradition dating back to the fifteenth century (in Europe, much earlier in China). Obviously the web has a far shorter tradition, beginning around 1990. But in the thirty year since Tim Berners-Lee launched the first web server, the web has grown to rival print for many kinds of communication. The technologies for creating 3D graphic spaces in VR (and AR) actually predate the web. But only in the past 10 years have AR and VR become widely available media. The goal of RealityMedia is to demonstrate the potential range of AR and VR as communicative forms. ")
], -1 /* HOISTED */);

var script$m = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$m, [
      createBaseVNode("div", _hoisted_2$m, [
        createVNode(script$1d, { msg: "Welcome to Reality Media!" }),
        _hoisted_3$c,
        _hoisted_4$c,
        _hoisted_5$8
      ])
    ])
  ]))
}
}

};

class HubsApp$m extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$m, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$m = function (params = {}) {
    let app = new HubsApp$m(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$b = "https://resources.realitymedia.digital/vue-apps/dist/7a24a6d309d453f2.jpg";

const _hoisted_1$l = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$l = { class: "spacer" };
const _hoisted_3$b = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$b = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$b,
  width: "280",
  style: {"float":"left","margin-right":"20px"}
}, null, -1 /* HOISTED */);
const _hoisted_5$7 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("div", { style: {"margin-left":"30px"} }, [
    /*#__PURE__*/createTextVNode("Published by "),
    /*#__PURE__*/createBaseVNode("a", { href: "https://mitpress.mit.edu/books/reality-media" }, "MIT Press")
  ]),
  /*#__PURE__*/createBaseVNode("div", { class: "oblique" }, "By Jay David Bolter, Maria Engberg and Blair MacIntyre"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "quote" }, "How augmented reality and virtual reality are taking their places in contemporary media culture alongside film and television.")
], -1 /* HOISTED */);

var script$l = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$l, [
      createBaseVNode("div", _hoisted_2$l, [
        createVNode(script$1d, { msg: "Reality Media" }),
        _hoisted_3$b,
        _hoisted_4$b,
        _hoisted_5$7
      ])
    ])
  ]))
}
}

};

class HubsApp$l extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$l, width, height, params);
        this.isInteractive = true;
    }
}
var init$l = function (params = {}) {
    let app = new HubsApp$l(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$k = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$k = { class: "spacer" };
const _hoisted_3$a = /*#__PURE__*/createBaseVNode("div", {
  class: "squareoff",
  style: {"width":"380px"}
}, [
  /*#__PURE__*/createTextVNode("Published by "),
  /*#__PURE__*/createBaseVNode("a", { href: "https://mitpress.mit.edu/books/reality-media" }, "MIT Press")
], -1 /* HOISTED */);
const _hoisted_4$a = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$6 = /*#__PURE__*/createBaseVNode("div", { class: "oblique squareoff" }, "By Jay David Bolter, Maria Engberg and Blair MacIntyre", -1 /* HOISTED */);
const _hoisted_6$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7$1 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff quote" }, "\"How augmented reality and virtual reality are taking their places in contemporary media culture alongside film and television.\" ", -1 /* HOISTED */);

var script$k = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$k, [
      createBaseVNode("div", _hoisted_2$k, [
        createVNode(script$1d, { msg: "Book: Reality Media" }),
        _hoisted_3$a,
        _hoisted_4$a,
        _hoisted_5$6,
        _hoisted_6$4,
        _hoisted_7$1
      ])
    ])
  ]))
}
}

};

class HubsApp$k extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$k, width, height, params);
        this.isInteractive = true;
    }
}
var init$k = function (params = {}) {
    let app = new HubsApp$k(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$a = "https://resources.realitymedia.digital/vue-apps/dist/5b14da96e2889ff2.jpg";

const _hoisted_1$j = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$j = { class: "spacer" };
const _hoisted_3$9 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$a,
  width: "400"
}, null, -1 /* HOISTED */);
const _hoisted_4$9 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$3 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createTextVNode("*Realitymedia* is built on top of Mozilla's open-source platform. An extensive guide to using Mozilla Hubs is available at "),
  /*#__PURE__*/createBaseVNode("a", {
    href: "https://hubs.mozilla.com/docs/intro-hubs.html",
    target: "blank"
  }, "in the Hubs user documentation"),
  /*#__PURE__*/createTextVNode(". Here are the highlights: "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Before entering, you are in the room's lobby. From here, you can see and hear what's going on inside the room, but you can only interact with others using text chat. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br")
], -1 /* HOISTED */);

var script$j = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$j, [
      createBaseVNode("div", _hoisted_2$j, [
        _hoisted_3$9,
        _hoisted_4$9,
        _hoisted_5$5,
        createVNode(script$1d, { msg: "The Hubs Platform" }),
        _hoisted_6$3
      ])
    ])
  ]))
}
}

};

class HubsApp$j extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$j, width, height, params);
        this.isInteractive = true;
    }
}
var init$j = function (params = {}) {
    let app = new HubsApp$j(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$i = /*#__PURE__*/createStaticVNode("<div id=\"room\" class=\"darkwall\"><div class=\"spacer\"><div class=\"squareoff\"><br><br><br><div class=\"keyPoint\">To enter the room:</div><br> - On a desktop or mobile device, follow the prompts to select a name/avatar and enable the mic. <br> - On a VR headset, if you opened the URL on your desktop or smartphone, choose &quot;Enter on Standalone VR&quot; to create a code that makes it easy to open on your standalone headset. Open the browser in your VR headset, navigate to hubs.link and enter the code. <br><br><div class=\"keyPoint\">To navigate in Hubs:</div><br> - On desktop use your WASD or arrow keys to move around. You can also press your right mouse button to teleport to a different location. Rotate your view using the Q and E keys, or hold down your left mouse button and drag. <br> - For VR and mobile controls, see the list of <a href=\"https://hubs.mozilla.com/docs/hubs-controls.html\" target=\"blank\">Hubs controls.</a></div></div></div>", 1);
const _hoisted_2$i = [
  _hoisted_1$i
];

var script$i = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$i))
}
}

};

class HubsApp$i extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$i, width, height, params);
        this.isInteractive = true;
    }
}
var init$i = function (params = {}) {
    let app = new HubsApp$i(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$9 = "https://resources.realitymedia.digital/vue-apps/dist/5d42bc6b2a074ccd.png";

const _hoisted_1$h = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$h = { class: "spacer" };
const _hoisted_3$8 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$8 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, " The figure below indicates how to mute your microphone, take photos, share your screen, create media objects, and so on: ", -1 /* HOISTED */);
const _hoisted_5$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_6$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_7 = /*#__PURE__*/createBaseVNode("img", {
  src: _imports_0$9,
  width: "400"
}, null, -1 /* HOISTED */);

var script$h = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$h, [
      createBaseVNode("div", _hoisted_2$h, [
        createVNode(script$1d, { msg: "Features in Hubs" }),
        _hoisted_3$8,
        _hoisted_4$8,
        _hoisted_5$4,
        _hoisted_6$2,
        _hoisted_7
      ])
    ])
  ]))
}
}

};

class HubsApp$h extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$h, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$h = function (params = {}) {
    let app = new HubsApp$h(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$g = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$g = { class: "spacer" };
const _hoisted_3$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$7 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$g = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$g, [
      createBaseVNode("div", _hoisted_2$g, [
        createVNode(script$1d, { msg: "Standing on the Audio Pads will start the narration about the room or the sound of the video clip." }),
        _hoisted_3$7,
        _hoisted_4$7
      ])
    ])
  ]))
}
}

};

class HubsApp$g extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$g, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$g = function (params = {}) {
    let app = new HubsApp$g(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$8 = "https://resources.realitymedia.digital/vue-apps/dist/82a911d289cd2836.png";

const _hoisted_1$f = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$f = { class: "spacer" };
const _hoisted_3$6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$6 = /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Visit the exhibit with friends"),
  /*#__PURE__*/createTextVNode(" Sharing the URL of the room you are currently in will allow others to join your experience. "),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Favorite your room"),
  /*#__PURE__*/createBaseVNode("img", {
    src: _imports_0$8,
    width: "400"
  }),
  /*#__PURE__*/createBaseVNode("br"),
  /*#__PURE__*/createTextVNode(" Set your room as a favorite under the 'more' menu. Then, you can easily revisit the room from the list in the 'favorite rooms'. ")
], -1 /* HOISTED */);

var script$f = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$f, [
      createBaseVNode("div", _hoisted_2$f, [
        createVNode(script$1d, { msg: "Other ways to use the room" }),
        _hoisted_3$6,
        _hoisted_4$6
      ])
    ])
  ]))
}
}

};

class HubsApp$f extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$f, width, height, params);
        //this.isInteractive = true;
    }
}
var init$f = function (params = {}) {
    let app = new HubsApp$f(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$7 = "https://resources.realitymedia.digital/vue-apps/dist/013b754af9ebcd32.png";

const _hoisted_1$e = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("div", { class: "keyPoint" }, "Here is a map, which you will also find posted through the galleries"),
    /*#__PURE__*/createBaseVNode("br"),
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$7,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$e = [
  _hoisted_1$e
];

var script$e = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$e))
}
}

};

class HubsApp$e extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$e, width, height, params);
        //this.isInteractive = true;
    }
}
var init$e = function (params = {}) {
    let app = new HubsApp$e(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$d = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("div", { class: "squareoff" }, [
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createBaseVNode("br"),
      /*#__PURE__*/createTextVNode(" Each gallery in this “immersive book” corresponds to one or more chapters in the printed book and illustrates the themes of the printed chapter(s). (See the map on the far wall for the names/themes of the galleries.) For example, the gallery entitled “Presence” illustrates both presence and the related concept of aura and how computer scientists as well as filmmakers and designers have tried to evoke these reactions in visitors to their immersive applications. ")
    ])
  ])
], -1 /* HOISTED */);
const _hoisted_2$d = [
  _hoisted_1$d
];

var script$d = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$d))
}
}

};

class HubsApp$d extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$d, width, height, params);
        //this.isInteractive = true;
    }
}
var init$d = function (params = {}) {
    let app = new HubsApp$d(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$c = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$c = { class: "spacer" };
const _hoisted_3$5 = { href: "https://realitymedia.digital/" };
const _hoisted_4$5 = /*#__PURE__*/createBaseVNode("iframe", {
  class: "webIframe",
  src: "https://realitymedia.digital/",
  title: "realitymedia website",
  width: "1024",
  height: "768",
  style: {"-webkit-transform":"scale(0.5)"}
}, null, -1 /* HOISTED */);

var script$c = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$c, [
      createBaseVNode("div", _hoisted_2$c, [
        createBaseVNode("a", _hoisted_3$5, [
          createVNode(script$1d, { msg: "Click here to return back to the website" })
        ]),
        _hoisted_4$5
      ])
    ])
  ]))
}
}

};

class HubsApp$c extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$c, width, height, params);
        //this.isInteractive = true;
    }
}
var init$c = function () {
    let app = new HubsApp$c(600, 475);
    app.mount();
    return app;
};

const _hoisted_1$b = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$b = { class: "spacer" };
const _hoisted_3$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$4 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);

var script$b = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$b, [
      createBaseVNode("div", _hoisted_2$b, [
        _hoisted_3$4,
        _hoisted_4$4,
        createVNode(script$1d, { msg: "Back to the main exhibition" })
      ])
    ])
  ]))
}
}

};

class HubsApp$b extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$b, width, height, params);
        // this.isInteractive = true;
    }
}
var init$b = function (params = {}) {
    let app = new HubsApp$b(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$6 = "https://resources.realitymedia.digital/vue-apps/dist/56a868a533e19312.jpg";

const _hoisted_1$a = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$6,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$a = [
  _hoisted_1$a
];

var script$a = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$a))
}
}

};

class HubsApp$a extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$a, width, height, params);
        //this.isInteractive = true;
    }
}
var init$a = function (params = {}) {
    let app = new HubsApp$a(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$5 = "https://resources.realitymedia.digital/vue-apps/dist/af587fad0d60df12.jpg";

const _hoisted_1$9 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$5,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$9 = [
  _hoisted_1$9
];

var script$9 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$9))
}
}

};

class HubsApp$9 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$9, width, height, params);
        //this.isInteractive = true;
    }
}
var init$9 = function (params = {}) {
    let app = new HubsApp$9(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$4 = "https://resources.realitymedia.digital/vue-apps/dist/478bac09ec86f1f0.jpg";

const _hoisted_1$8 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$4,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$8 = [
  _hoisted_1$8
];

var script$8 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$8))
}
}

};

class HubsApp$8 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$8, width, height, params);
        //this.isInteractive = true;
    }
}
var init$8 = function (params = {}) {
    let app = new HubsApp$8(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$3 = "https://resources.realitymedia.digital/vue-apps/dist/59bf2c99f5a219c7.png";

const _hoisted_1$7 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$3,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$7 = [
  _hoisted_1$7
];

var script$7 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$7))
}
}

};

class HubsApp$7 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$7, width, height, params);
        //this.isInteractive = true;
    }
}
var init$7 = function (params = {}) {
    let app = new HubsApp$7(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$2 = "https://resources.realitymedia.digital/vue-apps/dist/02780848b584f501.jpg";

const _hoisted_1$6 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$2,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$6 = [
  _hoisted_1$6
];

var script$6 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$6))
}
}

};

class HubsApp$6 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$6, width, height, params);
        //this.isInteractive = true;
    }
}
var init$6 = function (params = {}) {
    let app = new HubsApp$6(600, 475, params);
    app.mount();
    return app;
};

var _imports_0$1 = "https://resources.realitymedia.digital/vue-apps/dist/4d13871f7b21598b.jpg";

const _hoisted_1$5 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0$1,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$5 = [
  _hoisted_1$5
];

var script$5 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$5))
}
}

};

class HubsApp$5 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$5, width, height, params);
        //this.isInteractive = true;
    }
}
var init$5 = function (params = {}) {
    let app = new HubsApp$5(600, 475, params);
    app.mount();
    return app;
};

var _imports_0 = "https://resources.realitymedia.digital/vue-apps/dist/c7eaf0a5d9ea316f.jpg";

const _hoisted_1$4 = /*#__PURE__*/createBaseVNode("div", {
  id: "room",
  class: "darkwall"
}, [
  /*#__PURE__*/createBaseVNode("div", { class: "spacer" }, [
    /*#__PURE__*/createBaseVNode("img", {
      src: _imports_0,
      width: "400"
    })
  ])
], -1 /* HOISTED */);
const _hoisted_2$4 = [
  _hoisted_1$4
];

var script$4 = {
  setup(__props) {


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, _hoisted_2$4))
}
}

};

class HubsApp$4 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$4, width, height, params);
        //this.isInteractive = true;
    }
}
var init$4 = function (params = {}) {
    let app = new HubsApp$4(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$3 = { id: "room" };
const _hoisted_2$3 = { class: "spacer" };
const _hoisted_3$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_5$3 = { class: "squareoff" };



var script$3 = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : "How to Use the Audio Pads";
var body = params && params.parameter2 ? params.parameter2 : "start the narrations about the room you are currently in";


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$3, [
      createBaseVNode("div", _hoisted_2$3, [
        createVNode(script$1d, { msg: unref(title) }, null, 8 /* PROPS */, ["msg"]),
        _hoisted_3$3,
        _hoisted_4$3,
        createBaseVNode("div", _hoisted_5$3, "Standing on the Audio Pads will " + toDisplayString(unref(body)), 1 /* TEXT */)
      ])
    ])
  ]))
}
}

};

class HubsApp$3 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$3, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$3 = function (params = {}) {
    let app = new HubsApp$3(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$2 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$2 = { class: "spacer-side" };
const _hoisted_3$2 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$2 = { class: "squareoff labelTitle" };
const _hoisted_5$2 = { class: "squareoff" };
const _hoisted_6$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);



var script$2 = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : " ";
var body = params && params.parameter2 ? params.parameter2 : " ";


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$2, [
      createBaseVNode("div", _hoisted_2$2, [
        _hoisted_3$2,
        createCommentVNode("<Title v-bind:msg=\"title\" />"),
        createBaseVNode("div", _hoisted_4$2, toDisplayString(unref(title)), 1 /* TEXT */),
        createBaseVNode("div", _hoisted_5$2, toDisplayString(unref(body)), 1 /* TEXT */),
        _hoisted_6$1
      ])
    ])
  ]))
}
}

};

class HubsApp$2 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$2, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$2 = function (params = {}) {
    let app = new HubsApp$2(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1$1 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2$1 = { class: "spacer-side" };
const _hoisted_3$1 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4$1 = { class: "squareoff labelLgTitle" };
const _hoisted_5$1 = { class: "squareoff labelLgBody" };
const _hoisted_6 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);



var script$1 = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : " ";
var body = params && params.parameter2 ? params.parameter2 : " ";


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("div", _hoisted_2$1, [
        _hoisted_3$1,
        createCommentVNode("<Title v-bind:msg=\"title\" />"),
        createBaseVNode("div", _hoisted_4$1, toDisplayString(unref(title)), 1 /* TEXT */),
        createBaseVNode("div", _hoisted_5$1, toDisplayString(unref(body)), 1 /* TEXT */),
        _hoisted_6
      ])
    ])
  ]))
}
}

};

class HubsApp$1 extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script$1, width, height, params);
        //  this.isInteractive = true;
    }
}
var init$1 = function (params = {}) {
    let app = new HubsApp$1(600, 475, params);
    app.mount();
    return app;
};

const _hoisted_1 = {
  id: "room",
  class: "darkwall"
};
const _hoisted_2 = { class: "spacer-side" };
const _hoisted_3 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);
const _hoisted_4 = { class: "squareoff titleStyle" };
const _hoisted_5 = /*#__PURE__*/createBaseVNode("br", null, null, -1 /* HOISTED */);



var script = {
  setup(__props) {

let params = inject("params");
var title = params && params.parameter1 ? params.parameter1 : " ";


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", _hoisted_2, [
        _hoisted_3,
        createCommentVNode("<Title v-bind:msg=\"title\" />"),
        createBaseVNode("div", _hoisted_4, toDisplayString(unref(title)), 1 /* TEXT */),
        _hoisted_5
      ])
    ])
  ]))
}
}

};

class HubsApp extends HubsApp$1f {
    constructor(width, height, params = {}) {
        super(script, width, height, params);
        //  this.isInteractive = true;
    }
}
var init = function (params = {}) {
    let app = new HubsApp(600, 475, params);
    app.mount();
    return app;
};

export { init$a as ARVR_monolith, init$N as Absence_Mediation, init$W as Alyx, init$S as Apparizione, init$P as ArtBanner, init$3 as AudioPad, init$g as AudioText, init$O as Aura, init$c as Back, init$U as BeatSaber, init$18 as Center1, init$17 as Center2, init$16 as Center3, init$15 as Center4, init$14 as Center5, init$13 as Center6, init$12 as Center7, init$I as Empathy, init$b as Exit, init$4 as Future_monolith, init$Q as GamesBanner, init$M as Gaudi, init$L as Gaudi_pic, init$6 as Genres_monolith, init$8 as Graphics_monolith, init$9 as History_monolith, init$h as HubsFeatures, init$j as HubsPlatform, init$i as HubsPlatform2, init$2 as Label, init$1 as Label_lg, init$v as Laciotat, init$H as Mainmap_black, init$19 as Map, init$D as Milk, init$C as Milk_pic, init$R as Minecraft, init$l as MitPress, init$k as MitText, init$11 as Monolith1, init$10 as Monolith2, init$$ as Monolith3, init$_ as Monolith4, init$Z as Monolith5, init$Y as Monolith6, init$X as Monolith7, init$B as Nonnie, init$A as Nonnie_pic, init$d as Overview, init$t as Parthenon, init$q as Pit, init$p as PitInstruction, init$y as Pit_AR, init$z as Pit_Experiment, init$u as PlaceandSpace, init$V as Pokemon, init$1a as PortalSubtitle, init$1b as PortalTitle, init$x as Presence, init$G as Presence_map, init$F as Presence_map2, init$E as Presence_map3, init$7 as Presence_monolith, init$5 as Privacy_monolith, init$f as Sharing, init$r as Terracotta, init$s as TerracottaPic, init as Title, init$w as Treehugger, init$T as WalkingDead, init$m as Welcome, init$K as cybersickness, init$J as cybersickness_pic, init$1e as hubsTest1, init$1d as hubsTest2, init$1c as hubsTest3, initializeEthereal, init$o as pitSign1, init$n as pitSign2, init$e as rotundaMap, systemTick };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVicy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Fzc2V0cy9sb2dvLnBuZyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL05ldHdvcmtlZEhlbGxvV29ybGQudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Z1ZUFwcC50cyIsIi4uLy4uL3NyYy9hcHBzL0h1YnNBcHAudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9zaGFyZWQudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0MS9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvSGVsbG9Xb3JsZC52dWUiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0Mi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvc2hhcmVkLnRzIiwiLi4vLi4vc3JjL2FwcHMvVGVzdGluZy9IdWJzVGVzdDIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Rlc3RpbmcvSHVic1Rlc3QzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0My9zaGFyZWQudHMiLCIuLi8uLi9zcmMvYXBwcy9UZXN0aW5nL0h1YnNUZXN0My9odWJzLnRzIiwiLi4vLi4vc3JjL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlIiwiLi4vLi4vc3JjL2FwcHMvUG9ydGFsL1BvcnRhbFRpdGxlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Qb3J0YWwvUG9ydGFsVGl0bGUvaHVicy50cyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL0NlbnRlclN1YnRpdGxlLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1BvcnRhbC9Qb3J0YWxTdWJ0aXRsZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUG9ydGFsL1BvcnRhbFN1YnRpdGxlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9yb3R1bmRhLW1hcC5wbmciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXJfTWFwL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXJfTWFwL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9sYWNpb3RhdC1WUi5qcGciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIxX0ludHJvL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIxX0ludHJvL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9sYWNpb3RhdC5qcGciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIyX0hpc3RvcnkvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjJfSGlzdG9yeS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvdW5jYW5ueS5qcGciLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIzXzNELVRyYWNraW5nL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXIzXzNELVRyYWNraW5nL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI0X1ByZXNlbmNlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI0X1ByZXNlbmNlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9wYXJ0aGVub24ucG5nIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNV9HZW5yZXMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjVfR2VucmVzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9DZW50ZXI2X0Z1dHVyZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyNl9GdXR1cmUvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL0NlbnRlcjdfUHJpdmFjeS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQ2VudGVyN19Qcml2YWN5L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDFfSW50cm8vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMV9JbnRyby9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGgyX0hpc3RvcnkvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoMl9IaXN0b3J5L2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDNfM0QtVHJhY2tpbmcvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoM18zRC1UcmFja2luZy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTW9ub2xpdGg0X1ByZXNlbmNlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDRfUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNV9HZW5yZXMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNV9HZW5yZXMvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNl9GdXR1cmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoNl9GdXR1cmUvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL01vbm9saXRoN19Qcml2YWN5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Nb25vbGl0aDdfUHJpdmFjeS9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTUvQWx5eC1zcGxhc2gucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQWx5eC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQWx5eC9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvUG9rZW1vbi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvUG9rZW1vbi9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQmVhdFNhYmVyL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9CZWF0U2FiZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L1dhbGtpbmdEZWFkL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9XYWxraW5nRGVhZC9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvQXBwYXJpemlvbmUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FwcGFyaXppb25lL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9NaW5lY3JhZnQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L01pbmVjcmFmdC9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTUvR2FtZXNCYW5uZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0dhbWVzQmFubmVyL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNS9BcnRCYW5uZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb201L0FydEJhbm5lci9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvQXVyYS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvQXVyYS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvQWJzZW5jZV9NZWRpYXRpb24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0Fic2VuY2VfTWVkaWF0aW9uL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9HYXVkaS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvR2F1ZGkvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L0Nhc2EtYmF0bGxvLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0dhdWRpX3BpYy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvR2F1ZGlfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9jeWJlcnNpY2tuZXNzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9jeWJlcnNpY2tuZXNzL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9SaWRlVlIuanBnIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvY3liZXJzaWNrbmVzc19waWMvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L2N5YmVyc2lja25lc3NfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FbXBhdGh5L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9FbXBhdGh5L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01hcF9ibGFjay5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NYWlubWFwX2JsYWNrL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NYWlubWFwX2JsYWNrL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi91cGFycm93LnBuZyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3VyYXJyb3cucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUm9vbTZfbWFwL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Sb29tNl9tYXAvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3JpZ2h0YXJyb3cucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUm9vbTZfbWFwXzIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1Jvb202X21hcF8yL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi91bGFycm93LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1Jvb202X21hcF8zL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Sb29tNl9tYXBfMy9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbGZhcnJvdy5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NaWxrL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NaWxrL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9jbG91ZG92ZXJzaWRyYS5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9NaWxrX3BpYy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTWlsa19waWMvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3J0YXJyb3cucG5nIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvTm9ubmllL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWUvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L25vbm5pZS5qcGciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9Ob25uaWVfcGljL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRWUi5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QaXRfRXhwZXJpbWVudC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUGl0X0V4cGVyaW1lbnQvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L3BpdEFSLmpwZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BpdF9BUi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUGl0X0FSL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QcmVzZW5jZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvUHJlc2VuY2UvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1RyZWVodWdnZXIvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1Jvb202L0xhY2lvdGF0LnBuZyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0xhY2lvdGF0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9MYWNpb3RhdC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvU3BhY2VBbmRQbGFjZS5wbmciLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QbGFjZWFuZFNwYWNlL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QbGFjZWFuZFNwYWNlL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tNi9QYXJ0aGVub24vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L1BhcnRoZW5vbi9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdGVycmFjb3R0YTIuanBnIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVGVycmFjb3R0YVBpYy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVGVycmFjb3R0YVBpYy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVGVycmFjb3R0YS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbTYvVGVycmFjb3R0YS9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvUGl0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9QaXQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L1BpdEluc3RydWN0aW9uL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9QaXRJbnN0cnVjdGlvbi9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0U2lnbjEvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb21fUGl0L3BpdFNpZ24xL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9Sb29tX1BpdC9waXRTaWduMi9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvUm9vbV9QaXQvcGl0U2lnbjIvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvV2VsY29tZS9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9XZWxjb21lL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL3JlYWxpdHlNZWRpYUJvb2suanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9NaXRQcmVzcy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9NaXRQcmVzcy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9NaXRUZXh0L0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL01pdFRleHQvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvTW96aWxsYUh1YnMuanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IdWJzUGxhdGZvcm0vQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic1BsYXRmb3JtL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNQbGF0Zm9ybTIvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic1BsYXRmb3JtMi9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvT25ib2FyZGluZy9odWJzLXVzZXItaW50ZXJmYWNlLnBuZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvSHVic0ZlYXR1cmVzL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0h1YnNGZWF0dXJlcy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9BdWRpb1RleHQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvQXVkaW9UZXh0L2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL2Zhdm9yaXRlLnBuZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvU2hhcmluZy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9TaGFyaW5nL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01hcF90cmFuc3BhcmVudC5wbmciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL3JvdHVuZGFNYXAvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvcm90dW5kYU1hcC9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9PdmVydmlldy9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9PdmVydmlldy9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9CYWNrL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0JhY2svaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0V4aXQvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1Jvb202L0V4aXQvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvMS1taW5lY3JhZnQtYXIuanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9BUlZSX21vbm9saXRoL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0FSVlJfbW9ub2xpdGgvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvMi1icnVuZWxsZXNjaGkuanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9IaXN0b3J5X21vbm9saXRoL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0hpc3RvcnlfbW9ub2xpdGgvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvMy16YWtpLWxpemFyZC5qcGciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0dyYXBoaWNzX21vbm9saXRoL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL0dyYXBoaWNzX21vbm9saXRoL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzUtcHJvbWFjaG9zLnBuZyIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvUHJlc2VuY2VfbW9ub2xpdGgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvUHJlc2VuY2VfbW9ub2xpdGgvaHVicy50cyIsIi4uLy4uL3NyYy9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvNi1nZW5yZXMuanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9HZW5yZXNfbW9ub2xpdGgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvR2VucmVzX21vbm9saXRoL2h1YnMudHMiLCIuLi8uLi9zcmMvYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzktcHJpdmFjeS5qcGciLCIuLi8uLi9zcmMvYXBwcy9PbmJvYXJkaW5nL1ByaXZhY3lfbW9ub2xpdGgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvUHJpdmFjeV9tb25vbGl0aC9odWJzLnRzIiwiLi4vLi4vc3JjL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS8xMC1mdXR1cmUuanBnIiwiLi4vLi4vc3JjL2FwcHMvT25ib2FyZGluZy9GdXR1cmVfbW9ub2xpdGgvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL09uYm9hcmRpbmcvRnV0dXJlX21vbm9saXRoL2h1YnMudHMiLCIuLi8uLi9zcmMvYXBwcy9BdWRpb1BhZC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvQXVkaW9QYWQvaHVicy50cyIsIi4uLy4uL3NyYy9hcHBzL0xhYmVsL0FwcC52dWUiLCIuLi8uLi9zcmMvYXBwcy9MYWJlbC9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvTGFiZWxfbGdfdGV4dC9BcHAudnVlIiwiLi4vLi4vc3JjL2FwcHMvTGFiZWxfbGdfdGV4dC9odWJzLnRzIiwiLi4vLi4vc3JjL2FwcHMvVGl0bGUvQXBwLnZ1ZSIsIi4uLy4uL3NyYy9hcHBzL1RpdGxlL2h1YnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzFhNmFjZTM3NzEzM2YxNGEucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxoMSB4ci1sYXllciBjbGFzcz1cImZhZGVcIj57eyBtc2cgfX08L2gxPlxuICA8cD5cbiAgICBIZXJlJ3Mgc29tZSBtb3JlIHRleHQganVzdCB0byBtYWtlIHRoaW5ncyBub3QgYmxhbmsuXG4gIDwvcD5cblxuICA8YnV0dG9uIHhyLWxheWVyIEBjbGljaz1cInNoYXJlZC5pbmNyZW1lbnRcIj5jb3VudCBpczoge3sgc2hhcmVkLnN0YXRlLmNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5kZWZpbmVQcm9wcyh7XG4gIG1zZzogU3RyaW5nXG59KVxuXG5jb25zdCBzaGFyZWQgPSBpbmplY3QoJ3NoYXJlZCcpXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbmEge1xuICBjb2xvcjogI2I1NDJiOTtcbn1cblxuLmZhZGUge1xuICBjb2xvcjogIzk4MDNhNTtcbiAgLyogdHJhbnNpdGlvbjogY29sb3IgMXM7ICovXG59XG5cbi5mYWRlOmhvdmVyIHtcbiAgY29sb3I6ICNhNzhlMDY7XG59XG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICAgIDxpbWcgYWx0PVwiVnVlIGxvZ29cIiBzcmM9XCIuLi8uLi8uLi9hc3NldHMvbG9nby5wbmdcIiAvPlxuICAgICAgPFNvbWVUZXh0IHYtYmluZDptc2c9XCJtZXNnXCIgLz5cbiAgICAgIDwhLS0gPFNvbWVUZXh0IG1zZz1cIk5ldHdvcmtlZCBWdWUgQ29tcG9uZW50IHdpdGggU2hhcmVkIEJ1dHRvbiBDb3VudFwiIC8+IC0tPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgU29tZVRleHQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9OZXR3b3JrZWRIZWxsb1dvcmxkLnZ1ZSdcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNnID8gcGFyYW1zLm1lc2cgOiBcIk5ldHdvcmtlZCBWdWUgQ29tcG9uZW50IHdpdGggU2hhcmVkIEJ1dHRvbiBDb3VudFwiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgeyBjcmVhdGVBcHAsIEFwcCwgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVnVlQXBwIHtcbiAgICB0YWtlT3duZXJzaGlwOiAgKCkgPT4gYm9vbGVhblxuICAgIHNldFNoYXJlZERhdGE6IChvYmplY3Q6IHt9KSA9PiBib29sZWFuXG5cbiAgICB3aWR0aDogbnVtYmVyXG4gICAgaGVpZ2h0OiBudW1iZXJcblxuICAgIHZ1ZUFwcDogQXBwXG4gICAgdnVlUm9vdDogQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfCB1bmRlZmluZWRcblxuICAgIGNvbnN0cnVjdG9yIChBcHA6IENvbXBvbmVudCwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNyZWF0ZU9wdGlvbnM6IGFueSA9e30pIHtcbiAgICAgICAgdGhpcy50YWtlT3duZXJzaGlwID0gdGhpcy50YWtlT3duZXJzaGlwUHJvdG8uYmluZCh0aGlzKVxuICAgICAgICB0aGlzLnNldFNoYXJlZERhdGEgPSB0aGlzLnNldFNoYXJlZERhdGFQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuXG4gICAgICAgIHRoaXMudnVlQXBwID0gY3JlYXRlQXBwKEFwcCwgY3JlYXRlT3B0aW9ucylcbiAgICB9XG5cbiAgICBtb3VudCgpIHtcbiAgICB9XG5cbiAgICAvLyBkdW1teSBmdW5jdGlvbnMsIGp1c3QgdG8gbGV0IHVzIHVzZSB0aGUgc2FtZVxuICAgIC8vIGRhdGEgc3RvcmUgd2l0aCBodWJzIGFuZCB0aGUgd2ViIHRlc3Rpbmcgc2V0dXBcbiAgICB0YWtlT3duZXJzaGlwUHJvdG8oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzZXRTaGFyZWREYXRhUHJvdG8ob2JqZWN0OiB7fSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgY3JlYXRlQXBwLCBBcHAsIENvbXBvbmVudCwgQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBTY2VuZSwgRW50aXR5IH0gZnJvbSAnYWZyYW1lJ1xuaW1wb3J0IHsgRXRoZXJlYWxMYXlvdXRTeXN0ZW0sIFdlYkxheWVyM0QgfSBmcm9tIFwiZXRoZXJlYWxcIjtcbmltcG9ydCBWdWVBcHAgIGZyb20gXCIuL1Z1ZUFwcFwiXG5cbi8vIGNyZWF0ZSBpbml0IG1ldGhvZCBmb3IgZXRoZXJlYWxcbmltcG9ydCAqIGFzIGV0aGVyZWFsIGZyb20gJ2V0aGVyZWFsJ1xuaW1wb3J0IHsgY3JlYXRlUHJpbnRlciwgVGhpc0V4cHJlc3Npb24sIFRocm93U3RhdGVtZW50IH0gZnJvbSBcIm5vZGVfbW9kdWxlcy90eXBlc2NyaXB0L2xpYi90eXBlc2NyaXB0XCI7XG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tIFwibWF0aGpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplRXRoZXJlYWwoKSB7XG4gICAgSHVic0FwcC5pbml0aWFsaXplRXRoZXJlYWwoKVxufVxuXG4vL1RIUkVFLk9iamVjdDNELkRlZmF1bHRNYXRyaXhBdXRvVXBkYXRlID0gdHJ1ZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHN5c3RlbVRpY2sodGltZTogbnVtYmVyLCBkZWx0YVRpbWU6IG51bWJlcikge1xuICAgSHVic0FwcC5zeXN0ZW1UaWNrKHRpbWUsIGRlbHRhVGltZSlcbn1cblxuZnVuY3Rpb24gY29weUNhbWVyYShzb3VyY2U6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhLCB0YXJnZXQ6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKSB7XG4gICAgc291cmNlLnVwZGF0ZU1hdHJpeFdvcmxkKClcbiAgICAvL2xldCBvbGROYW1lID0gdGFyZ2V0Lm5hbWVcbiAgICAvL3RhcmdldC5jb3B5KHNvdXJjZSwgZmFsc2UpXG4gICAgLy90YXJnZXQubmFtZSA9IG9sZE5hbWVcblxuICAgIHRhcmdldC5mb3YgPSBzb3VyY2UuZm92O1xuICAgIHRhcmdldC56b29tID0gc291cmNlLnpvb207XG5cbiAgICB0YXJnZXQubmVhciA9IHNvdXJjZS5uZWFyO1xuICAgIHRhcmdldC5mYXIgPSBzb3VyY2UuZmFyO1xuXG4gICAgdGFyZ2V0LmFzcGVjdCA9IHNvdXJjZS5hc3BlY3Q7XG5cbiAgICAvLyB0YXJnZXQubWF0cml4V29ybGRJbnZlcnNlLmNvcHkoIHNvdXJjZS5tYXRyaXhXb3JsZEludmVyc2UgKTtcbiAgICAvLyB0YXJnZXQucHJvamVjdGlvbk1hdHJpeC5jb3B5KCBzb3VyY2UucHJvamVjdGlvbk1hdHJpeCApO1xuICAgIC8vIHRhcmdldC5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZS5jb3B5KCBzb3VyY2UucHJvamVjdGlvbk1hdHJpeEludmVyc2UgKTtcblxuICAgIC8vIHRhcmdldC51cC5jb3B5KCBzb3VyY2UudXAgKTtcblxuICAgIC8vIHRhcmdldC5tYXRyaXguY29weSggc291cmNlLm1hdHJpeCApO1xuICAgIC8vIHRhcmdldC5tYXRyaXhXb3JsZC5jb3B5KCBzb3VyY2UubWF0cml4V29ybGQgKTtcblxuICAgIC8vIHRhcmdldC5tYXRyaXhBdXRvVXBkYXRlID0gc291cmNlLm1hdHJpeEF1dG9VcGRhdGU7XG4gICAgLy8gdGFyZ2V0Lm1hdHJpeFdvcmxkTmVlZHNVcGRhdGUgPSBzb3VyY2UubWF0cml4V29ybGROZWVkc1VwZGF0ZTtcblxuICAgIHNvdXJjZS5tYXRyaXhXb3JsZC5kZWNvbXBvc2UoIHRhcmdldC5wb3NpdGlvbiwgdGFyZ2V0LnF1YXRlcm5pb24sIHRhcmdldC5zY2FsZSlcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGFyZ2V0LnJvdGF0aW9uLnNldEZyb21RdWF0ZXJuaW9uKCB0YXJnZXQucXVhdGVybmlvbiwgdW5kZWZpbmVkLCBmYWxzZSApO1xuICAgIHRhcmdldC51cGRhdGVNYXRyaXgoKVxuICAgIHRhcmdldC51cGRhdGVNYXRyaXhXb3JsZCh0cnVlKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIdWJzQXBwIGV4dGVuZHMgVnVlQXBwIHtcbiAgICBzdGF0aWMgc3lzdGVtOiBFdGhlcmVhbExheW91dFN5c3RlbTtcbiAgICBzdGF0aWMgZXRoZXJlYWxDYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoKVxuICAgIHN0YXRpYyBwbGF5ZXJDYW1lcmE6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuXG4gICAgaXNFdGhlcmVhbDogYm9vbGVhblxuICAgIGlzSW50ZXJhY3RpdmU6IGJvb2xlYW5cbiAgICBpc05ldHdvcmtlZDogYm9vbGVhblxuICAgIGlzU3RhdGljOiBib29sZWFuXG5cbiAgICBwcml2YXRlIHVwZGF0ZVRpbWU6IG51bWJlclxuICAgIHByaXZhdGUgcmF5Y2FzdGVyOiBUSFJFRS5SYXljYXN0ZXJcblxuICAgIHNpemU6IHtcbiAgICAgICAgd2lkdGg6IG51bWJlcixcbiAgICAgICAgaGVpZ2h0OiBudW1iZXJcbiAgICB9XG5cbiAgICAvL3Rha2VPd25lcnNoaXA6ICAoKSA9PiBib29sZWFuXG4gICAgLy9zZXRTaGFyZWREYXRhOiAob2JqZWN0OiB7fSkgPT4gYm9vbGVhblxuICAgIC8vd2lkdGg6IG51bWJlclxuICAgIC8vaGVpZ2h0OiBudW1iZXJcbiAgICAvL3Z1ZUFwcDogQXBwXG4gICAgLy92dWVSb290OiBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB8IHVuZGVmaW5lZCBcblxuICAgIHdlYkxheWVyM0Q6IFdlYkxheWVyM0QgfCB1bmRlZmluZWRcbiAgICBuZWVkc1VwZGF0ZTogYm9vbGVhbiA9IGZhbHNlXG5cbiAgICBoZWFkRGl2OiBFbGVtZW50XG5cbiAgICBzdGF0aWMgaW5pdGlhbGl6ZUV0aGVyZWFsKCkge1xuICAgICAgICBsZXQgc2NlbmU6IFNjZW5lID0gd2luZG93LkFQUC5zY2VuZTtcblxuICAgICAgICB0aGlzLmV0aGVyZWFsQ2FtZXJhLm1hdHJpeEF1dG9VcGRhdGUgPSB0cnVlO1xuICAgICAgICAvL3RoaXMuZXRoZXJlYWxDYW1lcmEudmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vc2NlbmUuc2V0T2JqZWN0M0QoXCJldGhlcmVhbENhbWVyYVwiLCB0aGlzLmV0aGVyZWFsQ2FtZXJhKVxuXG4gICAgICAgIHRoaXMucGxheWVyQ2FtZXJhID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld2luZy1jYW1lcmFcIikgYXMgRW50aXR5KS5nZXRPYmplY3QzRChcImNhbWVyYVwiKSBhcyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcblxuICAgICAgICAvLyBqdXN0IGluIGNhc2UgXCJ2aWV3aW5nLWNhbWVyYVwiIGlzbid0IHNldCB1cCB5ZXQgLi4uIHdoaWNoIGl0IFxuICAgICAgICAvLyBzaG91bGQgYmUsIGJ1dCBqdXN0IHRvIGJlIGNhcmVmdWxcbiAgICAgICAgdGhpcy5zeXN0ZW0gPSBldGhlcmVhbC5jcmVhdGVMYXlvdXRTeXN0ZW0odGhpcy5wbGF5ZXJDYW1lcmEgPyB0aGlzLnBsYXllckNhbWVyYSA6IHNjZW5lLmNhbWVyYSlcbiAgICAgICAgd2luZG93LmV0aFN5c3RlbSA9IHRoaXMuc3lzdGVtXG5cbiAgICAgICAgLy8gY2FuIGN1c3RvbWl6ZSBlYXNpbmcgZXRjXG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLmR1cmF0aW9uID0gMS41XG4gICAgICAgIC8vIHN5c3RlbS50cmFuc2l0aW9uLmRlbGF5ID0gMFxuICAgICAgICAvLyBzeXN0ZW0udHJhbnNpdGlvbi5tYXhXYWl0ID0gNFxuICAgICAgICAvLyBzeXN0ZW0udHJhbnNpdGlvbi5lYXNpbmcgPSBldGhlcmVhbC5lYXNpbmcuZWFzZU91dFxuICAgIH1cblxuICAgIHN0YXRpYyBzeXN0ZW1UaWNrKHRpbWU6IG51bWJlciwgZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHNjZW5lID0gd2luZG93LkFQUC5zY2VuZTtcblxuICAgICAgICBpZiAoIXRoaXMucGxheWVyQ2FtZXJhKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllckNhbWVyYSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXdpbmctY2FtZXJhXCIpIGFzIEVudGl0eSkuZ2V0T2JqZWN0M0QoXCJjYW1lcmFcIikgYXMgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5wbGF5ZXJDYW1lcmEpIHJldHVybjtcbiAgICBcbiAgICAgICAgY29weUNhbWVyYSh0aGlzLnBsYXllckNhbWVyYSwgdGhpcy5ldGhlcmVhbENhbWVyYSlcblxuICAgICAgICBpZiAodGhpcy5ldGhlcmVhbENhbWVyYSAhPSB0aGlzLnN5c3RlbS52aWV3Tm9kZSkge1xuICAgICAgICAgICAgdGhpcy5zeXN0ZW0udmlld05vZGUgPSB0aGlzLmV0aGVyZWFsQ2FtZXJhXG4gICAgICAgIH1cblxuICAgICAgICBzY2VuZS5yZW5kZXJlci5nZXRTaXplKEh1YnNBcHAuc3lzdGVtLnZpZXdSZXNvbHV0aW9uKVxuICAgICAgICB0aGlzLnN5c3RlbS52aWV3RnJ1c3R1bS5zZXRGcm9tUGVyc3BlY3RpdmVQcm9qZWN0aW9uTWF0cml4KHRoaXMuZXRoZXJlYWxDYW1lcmEucHJvamVjdGlvbk1hdHJpeClcblxuICAgICAgICAvLyB0aWNrIG1ldGhvZCBmb3IgZXRoZXJlYWxcbiAgICAgICAgdGhpcy5zeXN0ZW0udXBkYXRlKGRlbHRhVGltZSwgdGltZSlcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciAoQXBwOiBDb21wb25lbnQsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9LCBjcmVhdGVPcHRpb25zOiBhbnkgPXt9KSB7XG4gICAgICAgIFxuXG4gICAgICAgIGlmIChwYXJhbXMud2lkdGggJiYgcGFyYW1zLmhlaWdodCAmJiBwYXJhbXMud2lkdGggPiAwICYmIHBhcmFtcy5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAvLyByZXNldCBib3RoXG4gICAgICAgICAgICB3aWR0aCA9IHBhcmFtcy53aWR0aCAgIFxuICAgICAgICAgICAgaGVpZ2h0ID0gcGFyYW1zLmhlaWdodFxuICAgICAgICB9IGVsc2UgaWYgKChwYXJhbXMud2lkdGggJiYgcGFyYW1zLndpZHRoID4gMCkgfHwgKHBhcmFtcy5oZWlnaHQgJiYgcGFyYW1zLmhlaWdodCA+IDApKSB7XG4gICAgICAgICAgICAvLyBzZXQgb25lIGFuZCBzY2FsZSB0aGUgb3RoZXJcbiAgICAgICAgICAgIGlmIChwYXJhbXMud2lkdGggJiYgcGFyYW1zLndpZHRoID4gMCkge1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IChwYXJhbXMud2lkdGggLyB3aWR0aCkgKiBoZWlnaHQgICAgXG4gICAgICAgICAgICAgICAgd2lkdGggPSBwYXJhbXMud2lkdGggICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGVpZ2h0ICYmIHBhcmFtcy5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSAocGFyYW1zLmhlaWdodCAvIGhlaWdodCkgKiBoZWlnaHRcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBwYXJhbXMuaGVpZ2h0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAgIHRoaXMuaXNFdGhlcmVhbCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudnVlQXBwLnByb3ZpZGUoJ3BhcmFtcycsIHBhcmFtcylcblxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RhdGljID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lID0gMTAwXG4gICAgICAgIHRoaXMucmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpXG4gICAgICAgIC8vdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIC8vdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgdGhpcy5zaXplID0geyB3aWR0aDogd2lkdGgvMTAwMCwgaGVpZ2h0OiBoZWlnaHQvMTAwMH1cbiAgICAgICAgLy90aGlzLnRha2VPd25lcnNoaXAgPSB0aGlzLnRha2VPd25lcnNoaXBQcm90by5iaW5kKHRoaXMpXG4gICAgICAgIC8vdGhpcy5zZXRTaGFyZWREYXRhID0gdGhpcy5zZXRTaGFyZWREYXRhUHJvdG8uYmluZCh0aGlzKVxuXG4gICAgICAgIHRoaXMuaGVhZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgLy90aGlzLmhlYWREaXYuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiAxMDAlO2hlaWdodDogMTAwJTtcIilcblxuICAgICAgICAvL3RoaXMudnVlQXBwID0gY3JlYXRlQXBwKEFwcCwgY3JlYXRlT3B0aW9ucylcbiAgICB9XG5cbiAgICBtb3VudCh1c2VFdGhlcmVhbD86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc0V0aGVyZWFsID0gdXNlRXRoZXJlYWwgPT09IHRydWVcbiAgICAgICAgXG4gICAgICAgIHRoaXMudnVlUm9vdCA9IHRoaXMudnVlQXBwLm1vdW50KHRoaXMuaGVhZERpdik7XG4gICAgICAgIHRoaXMudnVlUm9vdC4kZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiBcIiArIHRoaXMud2lkdGggKyBcInB4OyBoZWlnaHQ6IFwiICsgdGhpcy5oZWlnaHQgKyBcInB4O1wiKVxuXG4gICAgICAgIC8vIC8vIGFkZCBhIGxpbmsgdG8gdGhlIHNoYXJlZCBjc3NcbiAgICAgICAgbGV0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2h1YnMuY3NzXCIpXG4gICAgICAgIGwuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKVxuICAgICAgICBsLnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsXCJhbm9ueW1vdXNcIilcbiAgICAgICAgdGhpcy52dWVSb290LiRlbC5pbnNlcnRCZWZvcmUobCwgdGhpcy52dWVSb290LiRlbC5maXJzdENoaWxkKVxuXG4gICAgICAgIC8vIG1vdmUgdGhpcyBpbnRvIG1ldGhvZFxuICAgICAgICB0aGlzLndlYkxheWVyM0QgPSBuZXcgV2ViTGF5ZXIzRCh0aGlzLnZ1ZVJvb3QuJGVsLCB7XG4gICAgICAgICAgICBhdXRvUmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgICAgIG9uTGF5ZXJDcmVhdGU6IHVzZUV0aGVyZWFsID8gXG4gICAgICAgICAgICAobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGFwdGVyID0gSHVic0FwcC5zeXN0ZW0uZ2V0QWRhcHRlcihsYXllcilcbiAgICAgICAgICAgICAgICBhZGFwdGVyLm9wYWNpdHkuZW5hYmxlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBhZGFwdGVyLm9uVXBkYXRlID0gKCkgPT4gbGF5ZXIudXBkYXRlKClcbiAgICAgICAgICAgIH0gOlxuICAgICAgICAgICAgKGxheWVyKSA9PiB7fSxcbiAgICAgICAgICAgIG9uTGF5ZXJQYWludDogKGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0aWMpIHsgdGhpcy5uZWVkc1VwZGF0ZSA9IHRydWUgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHR1cmVFbmNvZGluZzogVEhSRUUuc1JHQkVuY29kaW5nLFxuICAgICAgICAgICAgcmVuZGVyT3JkZXJPZmZzZXQ6IDBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0TmV0d29ya01ldGhvZHModGFrZU93bmVyc2hpcDogKCkgPT4gYm9vbGVhbiwgc2V0U2hhcmVkRGF0YTogKHt9KSA9PiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMudGFrZU93bmVyc2hpcCA9IHRha2VPd25lcnNoaXA7XG4gICAgICAgIHRoaXMuc2V0U2hhcmVkRGF0YSA9IHNldFNoYXJlZERhdGE7XG4gICAgfVxuXG4gICAgLy8gZHVtbXkgZnVuY3Rpb25zLCBqdXN0IHRvIGF2b2lkIGVycm9ycyBpZiB0aGV5IGdldCBjYWxsZWQgYmVmb3JlXG4gICAgLy8gbmV0d29ya2luZyBpcyBpbml0aWFsaXplZCwgb3IgY2FsbGVkIHdoZW4gbmV0d29ya2VkIGlzIGZhbHNlXG4gICAgLy8gdGFrZU93bmVyc2hpcFByb3RvKCk6IGJvb2xlYW4ge1xuICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyB9XG5cbiAgICAvLyBzZXRTaGFyZWREYXRhUHJvdG8ob2JqZWN0OiB7fSkge1xuICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyB9XG5cbiAgICAvLyByZWNlaXZlIGRhdGEgdXBkYXRlcy4gIHNob3VsZCBiZSBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzZXMsIGFsc28gcmVxdWVzdHNcbiAgICAvLyB1cGRhdGUgbmV4dCB0aWNrXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiB7fSkge1xuICAgICAgICB0aGlzLm5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgIH1cblxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIC8vIGlmICghdGhpcy5jb21wU3R5bGVzKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmNvbXBTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnZ1ZVJvb3QuJGVsKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyB2YXIgd2lkdGggPSB0aGlzLmNvbXBTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKVxuICAgICAgICAvLyB3aWR0aCA9IHdpZHRoICYmIHdpZHRoLmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KHdpZHRoKSAvIDEwMDA6IDFcbiAgICAgICAgLy8gdmFyIGhlaWdodCA9IHRoaXMuY29tcFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKVxuICAgICAgICAvLyBoZWlnaHQgPSBoZWlnaHQgJiYgaGVpZ2h0Lmxlbmd0aCA+IDAgPyBwYXJzZUZsb2F0KGhlaWdodCkgLyAxMDAwOiAxXG4gICAgICAgIC8vIHRoaXMuc2l6ZSA9IHsgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH1cbiAgICAgICAgY29uc29sZS5sb2cgKFwiZGl2IHNpemU6IHtcIiArIHRoaXMuc2l6ZS53aWR0aCArIFwiLCBcIiArIHRoaXMuc2l6ZS5oZWlnaHQgKyBcIn1cIilcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZVxuICAgIH1cblxuICAgIC8vIHJlY2VpdmUgZGF0YSB1cGRhdGVzLiAgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3Nlc1xuICAgIGdldFNoYXJlZERhdGEoZGF0YU9iamVjdDoge30pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2V0U2hhcmVkRGF0YSBzaG91bGQgYmUgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzXCIpXG4gICAgfVxuICAgIFxuICAgIC8vIG92ZXJyaWRlIHRvIGNoZWNrIGZvciB5b3VyIG93biAzRCBvYmplY3RzIHRoYXQgYXJlbid0IHdlYkxheWVyc1xuICAgIGNsaWNrZWQoZXZ0OiB7b2JqZWN0M0Q6IFRIUkVFLk9iamVjdDNEfSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJbnRlcmFjdGl2ZSkgeyByZXR1cm4gfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgb2JqID0gZXZ0Lm9iamVjdDNEXG4gICAgICAgIHRoaXMucmF5Y2FzdGVyLnJheS5zZXQob2JqLnBvc2l0aW9uLCBcbiAgICAgICAgICAgIHRoaXMud2ViTGF5ZXIzRCEuZ2V0V29ybGREaXJlY3Rpb24obmV3IFRIUkVFLlZlY3RvcjMoKSkubmVnYXRlKCkpXG4gICAgICAgIGNvbnN0IGhpdCA9IHRoaXMud2ViTGF5ZXIzRCEuaGl0VGVzdCh0aGlzLnJheWNhc3Rlci5yYXkpXG4gICAgICAgIGlmIChoaXQpIHtcbiAgICAgICAgICBoaXQudGFyZ2V0LmNsaWNrKClcbiAgICAgICAgICBoaXQudGFyZ2V0LmZvY3VzKClcbiAgICAgICAgICBjb25zb2xlLmxvZygnaGl0JywgaGl0LnRhcmdldCwgaGl0LmxheWVyKVxuICAgICAgICB9ICAgXG4gICAgfVxuXG4gICAgZHJhZ1N0YXJ0KGV2dDoge30pIHtcbiAgICAgICAgLy8gbm90aGluZyBoZXJlIC4uLiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGVcbiAgICB9XG5cbiAgICBkcmFnRW5kIChldnQ6IHt9KSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaGVyZSAuLi4gc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlXG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgLy8gaWYgd2UgY2FuIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlLCB0aGVuIHJlc3RhcnQgaGVyZVxuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICAvLyBwZXJoYXBzIGZpZ3VyZSBvdXQgaG93IHRvIHBhdXNlIHRoZSBWdWUgY29tcG9uZW50P1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIC8vIFRPRE86IGRlc3Ryb3kgdGhlIHZ1ZSBjb21wb25lbnQgYW5kIGFueSByZXNvdXJjZXMsIGV0Yy4sIGl0IGhhc1xuICAgIH1cblxuICAgIHRpY2sodGltZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRXRoZXJlYWwpIHtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5lZWRzVXBkYXRlID0gdGhpcy5uZWVkc1VwZGF0ZVxuICAgICAgICAgICAgdGhpcy5uZWVkc1VwZGF0ZSA9IGZhbHNlXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRpYyAmJiB0aGlzLnVwZGF0ZVRpbWUgPCB0aW1lKSB7XG4gICAgICAgICAgICAgICAgbmVlZHNVcGRhdGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgLy8gd2FpdCBhIGJpdCBhbmQgZG8gaXQgYWdhaW4uICBNYXkgZ2V0IHJpZCBvZiB0aGlzIHNvbWUgZGF5LCB3ZSdsbCBzZWVcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRpbWUgPSBNYXRoLnJhbmRvbSgpICogMjAwMCArIDEwMDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc1N0YXRpYykge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSA9IHRpbWVcbiAgICAgICAgICAgICAgICBuZWVkc1VwZGF0ZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZWVkc1VwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMud2ViTGF5ZXIzRCEudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgcmVhY3RpdmUsIHJlYWRvbmx5IH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZUFwcCBmcm9tIFwiLi4vLi4vVnVlQXBwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgZGF0YSB7XG4gICAgY291bnQ6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAgIF9zdGF0ZTogZGF0YVxuICAgIHN0YXRlOiBkYXRhXG4gICAgYXBwOiBWdWVBcHBcbiAgICBjb25zdHJ1Y3RvcihhcHA6IFZ1ZUFwcCkge1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IHJlYWN0aXZlKHtcbiAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWFkb25seSh0aGlzLl9zdGF0ZSlcbiAgICB9ICAgIFxuXG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5hcHAudGFrZU93bmVyc2hpcCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5hcHAuc2V0U2hhcmVkRGF0YSh0aGlzLnN0YXRlKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdDogZGF0YSkge1xuICAgICAgICAvLyBuZWVkIHRvIHVwZGF0ZSB0aGUgZWxlbWVudHMgd2l0aGluIHRoZSBzdGF0ZSwgYmVjYXVzZSBvdGhlcndpc2VcbiAgICAgICAgLy8gdGhlIGRhdGEgd29uJ3QgZmxvdyB0byB0aGUgY29tcG9uZW50c1xuICAgICAgICB0aGlzLl9zdGF0ZS5jb3VudCA9IGRhdGFPYmplY3QuY291bnRcbiAgICB9XG59IiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5pbXBvcnQge2RhdGEgYXMgU2hhcmVkRGF0YSwgU3RvcmV9IGZyb20gXCIuL3NoYXJlZFwiXG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIHNoYXJlZDogU3RvcmVcbiAgICBcbiAgICBjb25zdHJ1Y3RvciAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIDQwMCwgNDc1LCBwYXJhbXMpXG5cbiAgICAgICAgLy8gY3JlYXRlIG91ciBzaGFyZWQgZGF0YSBvYmplY3QgdGhhdCB3aWxsXG4gICAgICAgIC8vIHNoYXJlIGRhdGEgYmV0d2VlbiB2dWUgYW5kIGh1YnNcbiAgICAgICAgdGhpcy5zaGFyZWQgPSBuZXcgU3RvcmUodGhpcylcbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgnc2hhcmVkJywgdGhpcy5zaGFyZWQpXG5cbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiBTaGFyZWREYXRhKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdClcbiAgICAgICAgdGhpcy5zaGFyZWQudXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KVxuICAgIH1cblxuICAgIGdldFNoYXJlZERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5zdGF0ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAocGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0XG4iLCI8dGVtcGxhdGU+XG4gIDxoMSB4ci1sYXllciBjbGFzcz1cImZhZGVcIj57eyBtc2cgfX08L2gxPlxuXG4gIDxwPlxuICAgIDxhIGhyZWY9XCJodHRwczovL3ZpdGVqcy5kZXYvZ3VpZGUvZmVhdHVyZXMuaHRtbFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgVml0ZSBEb2N1bWVudGF0aW9uIGFuZCBUaGVuIFNvbWUhIFxuICAgIDwvYT5cbiAgICB8XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vdjMudnVlanMub3JnL1wiIHRhcmdldD1cIl9ibGFua1wiPlZ1ZSAzIERvY3VtZW50YXRpb248L2E+XG4gIDwvcD5cblxuICA8YnV0dG9uIHhyLWxheWVyIEBjbGljaz1cInN0YXRlLmNvdW50KytcIj5jb3VudCBpczoge3sgc3RhdGUuY291bnQgfX08L2J1dHRvbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbmEge1xuICBjb2xvcjogI2I1NDJiOTtcbn1cblxuLmZhZGUge1xuICBjb2xvcjogIzk4MDNhNTtcbiAgLyogdHJhbnNpdGlvbjogY29sb3IgMXM7ICovXG59XG5cbi5mYWRlOmhvdmVyIHtcbiAgY29sb3I6ICMwNmE3MWI7XG59XG48L3N0eWxlPlxuXG4iLCI8dGVtcGxhdGU+XG48ZGl2PlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICAgIDxpbWcgYWx0PVwiVnVlIGxvZ29cIiBzcmM9XCIuLi8uLi8uLi9hc3NldHMvbG9nby5wbmdcIiAvPlxuICAgICAgPEhlbGxvV29ybGQgbXNnPVwiVnVlIENvbXBvbmVudCB3aXRoIExvY2FsIEJ1dHRvbiBDb3VudFwiIC8+XG4gICAgICA8cCBpZD1cImVkaXRcIiB2LWJpbmQ6Y2xhc3M9XCJ7IHVwY2xvc2U6IHNoYXJlZC5zdGF0ZS5jbG9zZSB9XCIgeHItbGF5ZXI+XG4gICAgICAgIEVkaXQgY29kZSBpbiA8Y29kZT5zcmMvYXBwczwvY29kZT4gdG8gdGVzdCBob3QgbW9kdWxlIHJlcGxhY2VtZW50IHdoaWxlIHJ1bm5pbmcgcHJvamVjdCBhcyBcIm5wbSBydW4gZGV2XCIuXG4gICAgICA8L3A+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgSGVsbG9Xb3JsZCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0hlbGxvV29ybGQudnVlJ1xuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzaGFyZWQgPSBpbmplY3QoJ3NoYXJlZCcpXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cbiNlZGl0IHtcbiAgY29sb3I6ICNiZWE3ZDE7XG59XG5cbiNlZGl0LnVwY2xvc2Uge1xuICBjb2xvcjogI2NjMGEwYTtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgeyByZWFjdGl2ZSwgcmVhZG9ubHkgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVnVlQXBwIGZyb20gXCIuLi8uLi9WdWVBcHBcIjtcblxuZXhwb3J0IGludGVyZmFjZSBkYXRhIHtcbiAgICBjbG9zZTogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgU3RvcmUge1xuICAgIF9zdGF0ZTogZGF0YVxuICAgIHN0YXRlOiBkYXRhXG4gICAgYXBwOiBWdWVBcHBcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogVnVlQXBwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gcmVhY3RpdmUoe1xuICAgICAgICAgICAgY2xvc2U6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYXBwID0gYXBwXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWFkb25seSh0aGlzLl9zdGF0ZSlcbiAgICB9ICAgIFxuXG4gICAgc2V0Q2xvc2UoYzogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUuY2xvc2UgIT0gYykge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUuY2xvc2UgPSBjO1xuICAgICAgICB9XG4gICAgfSBcbn1cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuaW1wb3J0IHtkYXRhIGFzIFNoYXJlZERhdGEsIFN0b3JlfSBmcm9tIFwiLi9zaGFyZWRcIlxuaW1wb3J0IHsgV2ViTGF5ZXIzRENvbnRlbnQgfSBmcm9tIFwiZXRoZXJlYWxcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgc2hhcmVkOiBTdG9yZVxuICAgIFxuICAgIGNvbnN0cnVjdG9yIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgNTAwLCA1MDAsIHBhcmFtcylcbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnNoYXJlZCA9IG5ldyBTdG9yZSh0aGlzKVxuICAgICAgICB0aGlzLnZ1ZUFwcC5wcm92aWRlKCdzaGFyZWQnLCB0aGlzLnNoYXJlZClcbiAgICB9XG5cbiAgICBkb2NzOiBXZWJMYXllcjNEQ29udGVudCB8IHVuZGVmaW5lZFxuICAgIGJvdW5kc1NpemU6IFRIUkVFLlZlY3RvcjMgID0gbmV3IFRIUkVFLlZlY3RvcjMoKVxuICAgIGJvdW5kczogVEhSRUUuQm94MyA9IG5ldyBUSFJFRS5Cb3gzKClcblxuICAgIG1vdW50ICgpIHtcbiAgICAgICAgc3VwZXIubW91bnQodHJ1ZSkgLy8gdXNlIGV0aGVyZWFsXG5cbiAgICAgICAgdGhpcy5kb2NzID0gdGhpcy53ZWJMYXllcjNEIS5xdWVyeVNlbGVjdG9yKCcjZWRpdCcpXG4gICAgICAgIGlmICghdGhpcy5kb2NzKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJWdWUgYXBwIG5lZWRzICNlZGl0IGRpdlwiKVxuICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgYWRhcHRlciA9IEh1YnNBcHAuc3lzdGVtLmdldEFkYXB0ZXIodGhpcy5kb2NzKSBcbiAgICAgICAgYWRhcHRlci5vblVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm91bmRzID0gYWRhcHRlci5tZXRyaWNzLnRhcmdldC52aXN1YWxCb3VuZHNcbiAgICAgICAgICAgIHRoaXMuYm91bmRzLmdldFNpemUodGhpcy5ib3VuZHNTaXplKVxuICAgICAgICAgICAgdmFyIHNpemUgPSBNYXRoLnNxcnQodGhpcy5ib3VuZHNTaXplLnggKiB0aGlzLmJvdW5kc1NpemUueCArIHRoaXMuYm91bmRzU2l6ZS55ICogdGhpcy5ib3VuZHNTaXplLnkpXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFyZWQuc3RhdGUuY2xvc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZC5zZXRDbG9zZSAoc2l6ZSA8IDIxMClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWQuc2V0Q2xvc2UgKHNpemUgPCAxOTApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRvY3MhLnVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAocGFyYW1zKVxuICAgIGFwcC5tb3VudCgpIFxuXG4gICAgXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuPGRpdj5cbiAgPGRpdiBpZD1cInJvb21cIiA+XG4gICAgPGRpdiBjbGFzcz1cInRpdGxlU3R5bGVcIiB4ci1sYXllcj57eyB0aXRsZSB9fTwvZGl2PlxuXG4gICAgPGRpdj57eyBoZWxwIH19PC9kaXY+XG5cbiAgICA8YnI+XG4gICAgPGRpdj5DbGljayB0byBzd2FwIG9iamVjdHM6IDxidXR0b24geHItbGF5ZXIgQGNsaWNrPVwic2hhcmVkLm5leHRPYmplY3RcIj5Td2FwIE9iamVjdHM8L2J1dHRvbj48L2Rpdj5cbiAgICA8ZGl2PkN1cnJlbnQgb2JqZWN0IGlzOiB7eyBzaGFyZWQuZ2V0TmFtZSgpIH19PC9kaXY+XG5cbiAgICA8YnI+ICAgIFxuICAgIFxuICAgIDxkaXY+Q2xpY2sgdG8gbWFrZSBsYXJnZXI6IDxzcGFuIGNsYXNzPVwiZmFrZUJ1dHRvblwiIHhyLWxheWVyIEBjbGljaz1cInNoYXJlZC5sYXJnZXJcIj5MYXJnZXI8L3NwYW4+PC9kaXY+XG4gICAgPGRpdj5DbGljayB0byBtYWtlIHNtYWxsZXI6IDxzcGFuIGNsYXNzPVwiZmFrZUJ1dHRvblwiIHhyLWxheWVyIEBjbGljaz1cInNoYXJlZC5zbWFsbGVyXCI+U21hbGxlcjwvc3Bhbj48L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5sZXQgcGFyYW1zID0gaW5qZWN0KFwicGFyYW1zXCIpXG52YXIgdGl0bGUgPSBwYXJhbXMgJiYgcGFyYW1zLnBhcmFtZXRlcjEgPyBwYXJhbXMucGFyYW1ldGVyMSA6IFwiRXhhbXBsZSBDb250cm9sIFBhbmVsXCJcbnZhciBoZWxwID0gcGFyYW1zICYmIHBhcmFtcy5wYXJhbWV0ZXIyID8gcGFyYW1zLnBhcmFtZXRlcjIgOiBcIkNsaWNrIHRoZSBidXR0b25zIHRvIHN3aXRjaCBvYmplY3RzIG9yIGNoYW5nZSB0aGUgY29sb3Igb2YgYW4gb2JqZWN0XCJcbmNvbnN0IHNoYXJlZCA9IGluamVjdCgnc2hhcmVkJylcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4uZmFrZUJ1dHRvbiB7XG4gIGNvbG9yOiAjOTgwM2E1O1xuICBiYWNrZ3JvdW5kOiAjYTc4ZTA2XG4gIC8qIHRyYW5zaXRpb246IGNvbG9yIDFzOyAqL1xufVxuXG4uZmFrZUJ1dHRvbjpob3ZlciB7XG4gIGNvbG9yOiAjYTc4ZTA2O1xuICBiYWNrZ3JvdW5kOiAjOTgwM2E1O1xufVxuPC9zdHlsZT5cbiIsImltcG9ydCBWdWVBcHAgZnJvbSBcInNyYy9hcHBzL1Z1ZUFwcFwiO1xuaW1wb3J0IHsgcmVhY3RpdmUsIHJlYWRvbmx5IH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIGRhdGEge1xuICAgIG9iamVjdDogbnVtYmVyLFxuICAgIHNpemU6IHZlYzNcbn1cblxuaW50ZXJmYWNlIHZlYzMge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgejogbnVtYmVyXG59XG5cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG4gICAgX3N0YXRlOiBkYXRhXG4gICAgc3RhdGU6IGRhdGFcbiAgICBhcHA6IFZ1ZUFwcFxuICAgIG9iamVjdHM6IFRIUkVFLk9iamVjdDNEW11cblxuICAgIGNvbnN0cnVjdG9yKGFwcDogVnVlQXBwKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gcmVhY3RpdmUoe1xuICAgICAgICAgICAgb2JqZWN0OiAtMSxcbiAgICAgICAgICAgIHNpemU6IHsgeDogMSwgeTogMSwgejogMX1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmFwcCA9IGFwcFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVhZG9ubHkodGhpcy5fc3RhdGUpXG5cbiAgICAgICAgdGhpcy5vYmplY3RzID0gW11cbiAgICAgICAgaWYgKHdpbmRvdy5BRlJBTUUpIHtcbiAgICAgICAgICAgIGxldCBzY2VuZSA9IHdpbmRvdy5BRlJBTUUuc2NlbmVzWzBdLm9iamVjdDNEXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHsgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgbyA9IHNjZW5lLmdldE9iamVjdEJ5TmFtZShcIlRlc3RPYmplY3RcIiArIGkpXG4gICAgICAgICAgICAgICAgaWYgKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgby52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobylcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9iamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUub2JqZWN0ID0gMFxuICAgICAgICAgICAgdGhpcy5fY29weVZlYzModGhpcy5vYmplY3RzWzBdLnNjYWxlLCB0aGlzLl9zdGF0ZS5zaXplKVxuICAgICAgICAgICAgdGhpcy5vYmplY3RzWzBdLnZpc2libGUgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5vYmplY3QgPSAtMVxuICAgICAgICB9XG4gICAgfSAgICBcblxuICAgIF9jb3B5VmVjMyhmcm9tOiB2ZWMzLCB0bzogdmVjMykge1xuICAgICAgICB0by54ID0gZnJvbS54XG4gICAgICAgIHRvLnkgPSBmcm9tLnlcbiAgICAgICAgdG8ueiA9IGZyb20uelxuICAgIH1cblxuICAgIF9uZXh0T2JqZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUub2JqZWN0ID09IC0xKSByZXR1cm4gLTFcblxuICAgICAgICB0aGlzLm9iamVjdHNbdGhpcy5fc3RhdGUub2JqZWN0XS52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgdGhpcy5fc3RhdGUub2JqZWN0KytcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLm9iamVjdCA+PSB0aGlzLm9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5vYmplY3QgPSAwXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9iamVjdHNbdGhpcy5fc3RhdGUub2JqZWN0XS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY29weVZlYzModGhpcy5vYmplY3RzW3RoaXMuX3N0YXRlLm9iamVjdF0uc2NhbGUsIHRoaXMuX3N0YXRlLnNpemUpO1xuXG4gICAgfVxuXG4gICAgX3VwZGF0ZVNpemUgKHNpemU6IHZlYzMpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlLm9iamVjdCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jb3B5VmVjMyhzaXplLCB0aGlzLl9zdGF0ZS5zaXplKTtcblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW3RoaXMuX3N0YXRlLm9iamVjdF0uc2NhbGUuY29weSh0aGlzLl9zdGF0ZS5zaXplKVxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW3RoaXMuX3N0YXRlLm9iamVjdF0udXBkYXRlTWF0cml4KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfbGFyZ2VyKCkge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUub2JqZWN0ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1t0aGlzLl9zdGF0ZS5vYmplY3RdLnNjYWxlLm11bHRpcGx5U2NhbGFyKDEuMSk7XG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbdGhpcy5fc3RhdGUub2JqZWN0XS51cGRhdGVNYXRyaXgoKTtcblxuICAgICAgICAgICAgdGhpcy5fY29weVZlYzModGhpcy5vYmplY3RzW3RoaXMuX3N0YXRlLm9iamVjdF0uc2NhbGUsIHRoaXMuX3N0YXRlLnNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3NtYWxsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZS5vYmplY3QgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5vYmplY3RzW3RoaXMuX3N0YXRlLm9iamVjdF0uc2NhbGUubXVsdGlwbHlTY2FsYXIoMS8xLjEpO1xuICAgICAgICAgICAgdGhpcy5vYmplY3RzW3RoaXMuX3N0YXRlLm9iamVjdF0udXBkYXRlTWF0cml4KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NvcHlWZWMzKHRoaXMub2JqZWN0c1t0aGlzLl9zdGF0ZS5vYmplY3RdLnNjYWxlLCB0aGlzLl9zdGF0ZS5zaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGV4dGVybmFsIHJvdXRpbmVzIGNhbGxlZCBmcm9tIHZ1ZVxuICAgIG5leHRPYmplY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcC50YWtlT3duZXJzaGlwKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX25leHRPYmplY3QoKVxuICAgICAgICAgICAgdGhpcy5hcHAuc2V0U2hhcmVkRGF0YSh0aGlzLnN0YXRlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGFyZ2VyKCkge1xuICAgICAgICBpZiAodGhpcy5hcHAudGFrZU93bmVyc2hpcCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXJnZXIoKVxuICAgICAgICAgICAgdGhpcy5hcHAuc2V0U2hhcmVkRGF0YSh0aGlzLnN0YXRlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc21hbGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwLnRha2VPd25lcnNoaXAoKSkge1xuICAgICAgICAgICAgdGhpcy5fc21hbGxlcigpXG4gICAgICAgICAgICB0aGlzLmFwcC5zZXRTaGFyZWREYXRhKHRoaXMuc3RhdGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUub2JqZWN0ID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdHNbdGhpcy5fc3RhdGUub2JqZWN0XS5uYW1lXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJOTyBPQkpFQ1RTXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdDogZGF0YSkge1xuICAgICAgICAvLyBuZWVkIHRvIHVwZGF0ZSB0aGUgZWxlbWVudHMgd2l0aGluIHRoZSBzdGF0ZSwgYmVjYXVzZSBvdGhlcndpc2VcbiAgICAgICAgLy8gdGhlIGRhdGEgd29uJ3QgZmxvdyB0byB0aGUgY29tcG9uZW50c1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUub2JqZWN0ICE9IGRhdGFPYmplY3Qub2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbdGhpcy5fc3RhdGUub2JqZWN0XS52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tkYXRhT2JqZWN0Lm9iamVjdF0udmlzaWJsZSA9IHRydWVcbiAgICAgICAgICAgdGhpcy5fc3RhdGUub2JqZWN0ID0gZGF0YU9iamVjdC5vYmplY3RcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVTaXplKGRhdGFPYmplY3Quc2l6ZSlcbiAgICB9XG59IiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5pbXBvcnQge2RhdGEgYXMgU2hhcmVkRGF0YSwgU3RvcmV9IGZyb20gXCIuL3NoYXJlZFwiXG5cbmV4cG9ydCBjbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBzaGFyZWQ6IFN0b3JlXG5cbiAgICBjb25zdHJ1Y3RvciAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIDQwMCwgMjI1LCBwYXJhbXMpXG5cbiAgICAgICAgLy8gY3JlYXRlIG91ciBzaGFyZWQgZGF0YSBvYmplY3QgdGhhdCB3aWxsXG4gICAgICAgIC8vIHNoYXJlIGRhdGEgYmV0d2VlbiB2dWUgYW5kIGh1YnNcbiAgICAgICAgdGhpcy5zaGFyZWQgPSBuZXcgU3RvcmUodGhpcylcbiAgICAgICAgdGhpcy52dWVBcHAucHJvdmlkZSgnc2hhcmVkJywgdGhpcy5zaGFyZWQpXG5cbiAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc05ldHdvcmtlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0OiBTaGFyZWREYXRhKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVNoYXJlZERhdGEoZGF0YU9iamVjdClcbiAgICAgICAgdGhpcy5zaGFyZWQudXBkYXRlU2hhcmVkRGF0YShkYXRhT2JqZWN0KVxuICAgIH1cblxuICAgIGdldFNoYXJlZERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlZC5zdGF0ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAocGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0XG4iLCI8dGVtcGxhdGU+XG4gIDxoMj57eyBtc2cgfX08L2gyPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8VGl0bGUgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNzYWdlID8gcGFyYW1zLm1lc3NhZ2UgOiBcIlBPUlRBTCBUSVRMRVwiXG48L3NjcmlwdD5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgMTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxoND57eyBtc2cgfX08L2g0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IGRlZmluZVByb3BzLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSdcblxuZGVmaW5lUHJvcHMoe1xuICBtc2c6IFN0cmluZ1xufSlcblxuY29uc3Qgc3RhdGUgPSByZWFjdGl2ZSh7IGNvdW50OiAwIH0pXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8VGl0bGUgdi1iaW5kOm1zZz1cIm1lc2dcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJTdWJ0aXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciBtZXNnID0gcGFyYW1zICYmIHBhcmFtcy5tZXNzYWdlID8gcGFyYW1zLm1lc3NhZ2UgOiBcIlBPUlRBTCBTVUJUSVRMRVwiXG48L3NjcmlwdD5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgMTAwLCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMzhkNmQ3YTFlMDJmYzJmOS5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxUaXRsZSBtc2c9XCJSZWFsaXR5IE1lZGlhXCIgLz5cblx0PGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3JvdHVuZGEtbWFwLnBuZ1wiIHdpZHRoPVwiMjUwXCIgPlxuXHQ8ZGl2IGNsYXNzPVwiZGlzcGxheXRleHRcIj5BUiBhbGxvd3MgdXMgdG8gZXh0ZW5kIG91ciBwaHlzaWNhbCByZWFsaXR5OyBWUiBjcmVhdGVzIGZvciB1cyBhIGRpZmZlcmVudCByZWFsaXR5LjwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvN2FmN2I5NWIzNWZkNzYxNi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIGFzIHJlYWxpdHkgbWVkaWFcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQtVlIuanBnXCIgd2lkdGg9XCIyNTBcIiA+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRWFjaCByZWFsaXR5IG1lZGl1bSBtZWRpYXRlcyBhbmQgcmVtZWRpYXRlcy4gSXQgb2ZmZXJzIGEgbmV3IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB3b3JsZCB0aGF0IHdlIGltcGxpY2l0bHkgY29tcGFyZSBcblx0XHR0byBvdXIgZXhwZXJpZW5jZSBvZiB0aGUgd29ybGQgaW4gaXRzZWxmLCBidXQgYWxzbyB0aHJvdWdoIG90aGVyIG1lZGlhLjwvZGl2PiBcbiAgPC9kaXY+XG4gICA8cD5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly9yZWFsaXR5bWVkaWEuZGlnaXRhbFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgU3RhcnQgYXQgdGhlIHJlYWxpdHkgbWVkaWEgc2l0ZS4gXG4gICAgPC9hPlxuICAgIHxcbiAgPC9wPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvN2FiM2Q4NmFmZDQ4ZGJmYi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIlRoZSBMYUNpb3RhdCBFZmZlY3RcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cblx0ICA8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvbGFjaW90YXQuanBnXCIgd2lkdGg9XCIyNTBcIj5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+RmlsbSBiZWNhbWUgb25lIG9mIHRoZSBtb3N0IGltcG9ydGFudCByZWFsaXR5IFxuICAgICAgbWVkaWEgb2YgdGhlIHR3ZW50aWV0aCBjZW50dXJ5LCBhbmQgaW4gc29tZSB3YXlzLCBpdCBpcyBhIGZvcmVydW5uZXIgXG4gICAgICBvZiB2aXJ0dWFsIHJlYWxpdHkuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+ICBcbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC85MWZkZmE4MTFlNzUyZGM4LmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cblx0PGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgR3JhcGhpY3MgJmFtcDsgVHJhY2tpbmdcIiAvPlxuXHQ8aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWFnZXMvdW5jYW5ueS5qcGdcIiB3aWR0aD1cIjIwMFwiPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+My1EIGNvbXB1dGVyIGdyYXBoaWNzIGhlbHAgdG8gY29uc3RydWN0IHRoZSB2aXN1YWwgXG5cdFx0cmVhbGl0aWVzIG9mIEFSIGFuZCBWUiwgdGhhdCBpcyBwaG90b3JlYWxpc20uIFRoZSB1bmNhbm55IHZhbGxleS48L2Rpdj5cblx0PC9kaXY+XG5cdDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJQcmVzZW5jZVwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNwYWNlclwiPiBcblx0ICA8IS0tPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPi0tPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QcmVzZW5jZSBpbiBWUiBpcyB1c3VhbGx5IGNvbmNlaXZlZCBvZiBhcyBmb3JnZXR0aW5nIHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZS4gVGhlIGlkZWEgaXMgdGhhdCBpZiB0aGUgdXNlciBjYW4gYmUgZW50aWNlZCBpbnRvIGJlaGF2aW5nIGFzIGlmIHNoZSB3ZXJlIG5vdCBhd2FyZSBvZiBhbGwgdGhlIGNvbXBsZXggdGVjaG5vbG9neSwgdGhlbiBzaGUgZmVlbHMgcHJlc2VuY2UuPC9kaXY+ICBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2RjMDVjMDQ1NDZhNjllNjQucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJHZW5yZXNcIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj4gXG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5SZWFsaXR5IG1lZGlhIGFwcGxpY2F0aW9ucyBvZnRlbiBmdW5jdGlvbiBhcyBhZGRpdGlvbnMgdG8gZXN0YWJsaXNoZWQgZ2VucmVzLiBNb3N0IGN1cnJlbnQgQVIgYW5kIFZSIGFwcGxpY2F0aW9ucyBiZWhhdmUgbGlrZSBhcHBsaWNhdGlvbnMgb3IgYXJ0aWZhY3RzIHRoYXQgd2Uga25vdyBmcm9tIGVhcmxpZXIgbWVkaWEuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgRnV0dXJlIG9mIEFSICZhbXA7IFZSXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvaW1hZ2VzL3BhcnRoZW5vbi5wbmdcIiB3aWR0aD1cIjI1MFwiPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5WUiB3aWxsIGNvbnRpbnVlIHRvIGNvbnN0cnVjdCBzcGVjaWFsIHJlYWxpdGllcywgYXBhcnQgZnJvbSB0aGUgZXZlcnlkYXkuIFZSIHdvcmxkcyB3aWxsIGNvbnRpbnVlIHRvIGJlIG1ldGFwaG9yaWMgd29ybGRzLjwvZGl2PiAgXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeSBhbmQgUHVibGljIFNwYWNlXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlBlcnZhc2l2ZSwgYWx3YXlzLW9uIEFSIGFwcGxpY2F0aW9ucyBoYXZlIHRoZSBwb3RlbnRpYWwgdG8gcHJvdmlkZSBjb21wYW5pZXMgb3IgZ292ZXJubWVudCBhdXRob3JpdGllcyBcbiAgICAgIGV2ZW4gbW9yZSBpbmZvcm1hdGlvbiBhbmQgd2l0aCBtb3JlIHByZWNpc2lvbiB0aGFuIG91ciBjdXJyZW50IG1vYmlsZSBhcHBsaWNhdGlvbnMgZG8sIFxuICAgICAgYm90aCBieSBhZ2dyZWdhdGluZyBvdXIgaGFiaXRzIGFzIGNvbnN1bWVycyBhbmQgYnkgaWRlbnRpZnlpbmcgdXMgYXMgaW5kaXZpZHVhbHMuPC9kaXY+ICBcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAvLyAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJwb3N0ZXJ0aXRsZVwiPkFSICZhbXA7IFZSIGFzIHJlYWxpdHkgbWVkaWE8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICA8YnI+XG4gICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgIDxicj5cbiAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgPGJyPlxuICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgIC8vIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJUaGUgSGlzdG9yeSBvZiBSZWFsaXR5IE1lZGlhXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+IFxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCIzLUQgJmFtcDsgVHJhY2tpbmdcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIlByZXNlbmNlXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsdXNobGVmdFwiPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gU29tZSBvZiB0aGUga2V5IGRpZmZlcmVuY2VzIGJldHdlZW4g4oCcY2xhc3NpY+KAnSBWUiBhbmQgQVI8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gRXh0ZW5kZWQgcmVhbGl0eSAoWFIpIGFuZCB0aGUgaW1tZXJzaXZlIHdlYiA8L2gzPlxuICAgICAgICA8YnI+XG4gICAgICAgIDxoMz4gV2hlcmUgQVIgYW5kIFZSIGZpdCBvbiBNaWxncmFtIGFuZCBLaXNoaW5v4oCZcyB2aXJ0dWFsaXR5IGNvbnRpbnV1bTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+ICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDMwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxUaXRsZSBtc2c9XCJHZW5yZXNcIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmx1c2hsZWZ0XCI+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBTb21lIG9mIHRoZSBrZXkgZGlmZmVyZW5jZXMgYmV0d2VlbiDigJxjbGFzc2lj4oCdIFZSIGFuZCBBUjwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBFeHRlbmRlZCByZWFsaXR5IChYUikgYW5kIHRoZSBpbW1lcnNpdmUgd2ViIDwvaDM+XG4gICAgICAgIDxicj5cbiAgICAgICAgPGgzPiBXaGVyZSBBUiBhbmQgVlIgZml0IG9uIE1pbGdyYW0gYW5kIEtpc2hpbm/igJlzIHZpcnR1YWxpdHkgY29udGludXVtPC9oMz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj4gICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoMzAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPFRpdGxlIG1zZz1cIkZ1dHVyZVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8VGl0bGUgbXNnPVwiUHJpdmFjeVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbHVzaGxlZnRcIj5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFNvbWUgb2YgdGhlIGtleSBkaWZmZXJlbmNlcyBiZXR3ZWVuIOKAnGNsYXNzaWPigJ0gVlIgYW5kIEFSPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IEV4dGVuZGVkIHJlYWxpdHkgKFhSKSBhbmQgdGhlIGltbWVyc2l2ZSB3ZWIgPC9oMz5cbiAgICAgICAgPGJyPlxuICAgICAgICA8aDM+IFdoZXJlIEFSIGFuZCBWUiBmaXQgb24gTWlsZ3JhbSBhbmQgS2lzaGlub+KAmXMgdmlydHVhbGl0eSBjb250aW51dW08L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PiAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCgzMDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzE5MDk5NDM3MGFlYmUzOTUucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTUvQWx5eC1zcGxhc2gucG5nXCIgd2lkdGg9XCI0MDBcIiA+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJIYWxmTGlmZTogQWx5eFwiIC8+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gRmlyc3QgcGVyc29uIHNob290ZXIgZ2FtZXMgc3VjaCBhcyAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmhhbGYtbGlmZS5jb20vZW4vYWx5eC9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5IYWxmTGlmZTogQWx5eCA8L2E+IGhhdmUgbG9uZyB1c2VkIDMtRCBncmFwaGljcyB0byBjcmVhdGUgYW4gaW1tZXJzaXZlIGV4cGVyaWVuY2UgZm9yIG1pbGxpb25zIG9mIHBsYXllcnMuIEFuZCBmb3IgZGVjYWRlcywgXG4gICAgcGxheWVycyBvbiBjb21wdXRlcnMgYW5kIGdhbWUgY29uc29sZXMgaGF2ZSB5ZWFybmVkIGZvciB0cnVlIFZSIHNvIHRoYXQgdGhleSBjb3VsZCBmYWxsIHRocm91Z2ggdGhlIHNjcmVlbiBpbnRvIHRoZSB3b3JsZHMgb24gdGhlIG90aGVyIHNpZGUuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJQb2tlbW9uIEdvXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UG9rZW1vbiBHbyAoMjAxNikgaXMgcGVyaGFwcyBzdGlsbCB0aGUgYmVzdC1rbm93biBBUiBnYW1lLiBcbiAgICAgIFRoZSBQb2tlbW9uIGZyYW5jaGlzZSB3YXMgYWxyZWFkeSBkZWNhZGVzIG9sZCwgYW5kIHRoaXMgd2FzIGNlcnRhaW5seSBwYXJ0IG9mIHRoZSBcbiAgICAgIGFuc3dlciBmb3IgdGhlIEFSIGdhbWXigJlzIHN1cnByaXNpbmcgaW1wYWN0LiBcbiAgICAgIEl0IHdhcyB0aGUgZmlyc3QgUG9rZW1vbiBnYW1lIG9uIGEgbW9iaWxlIHBob25lIGFuZCB0aGUgZmlyc3QgZnJlZSBQb2tlbW9uIGdhbWUgb24gYW55IHBsYXRmb3JtLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgIC8vICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiQmVhdCBTYWJlclwiIC8+XG5cdCAgPGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPkJlYXQgU2FiZXIgaXMgYSBWUiByaHl0aG0gZ2FtZSBcbiAgICAgIHdpdGggYSBsaXR0bGUgU3RhciBXYXJzIHRocm93biBpbi4gVGhlIHBsYXllciB1c2VzIGxpZ2h0c2FiZXJzIHRvIGtlZXAgdGhlIGJlYXQuIFxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiV2Fsa2luZyBEZWFkOiBPdXIgV29ybGRcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5JbiB0aGlzIEFSIHZlcnNpb24gb2YgdGhlIHRyYW5zbWVkaWEgZnJhbmNoaXNlXG4gICAgICBHUFMgaXMgdXNlZCB0byBkZXRlcm1pbmUgeW91ciBsb2NhdGlvbiBpbiB0aGUgd29ybGQuIFlvdXIgbG9jYXRpb24gXG4gICAgICBhbmQgdGhlIHpvbWJpZXMgYXBwZWFyIGluIGFuIGVuaGFuY2VkIEdvb2dsZSBNYXBzIG1hcCBvbiB0aGUgcGhvbmUgc2NyZWVuLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTGEgQXBwYXJpemlvbmVcIiAvPlxuXHQgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5MaWtlIHZpZGVvIGdhbWVzIGFuZCAzNjAtZGVncmVlIHZpZGVvLCBcbiAgICAgIFZSIGFydCBlbXBoYXNpemVzIGltbWVyc2lvbiBhcyB0aGUgZmVhdHVyZSB0aGF0IG1ha2VzIHRoZSBleHBlcmllbmNlIFxuICAgICAgdW5pcXVlLCBhcyBpbiBhIFZSIHdvcmsgYnkgQ2hyaXN0aWFuIExlbW1lcnogZW50aXRsZWQgTGEgQXBwYXJpemlvbmUgKDIwMTcpLlxuICAgIDwvZGl2PiBcbiAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8VGl0bGUgbXNnPVwiTWluZWNyYWZ0IFZSXCIgLz5cblx0ICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+TWluZWNyYWZ0IFZSIGlzIGEgZnVsbHkgaW1tZXJzaXZlLCBcbiAgICAgIGhlYWRzZXQgdmVyc2lvbiBvZiB0aGUgc2FuZGJveCBnYW1lIHRoYXQgYWxyZWFkeSBydW5zIG9uIGNvbXB1dGVycywgZ2FtZSBjb25zb2xlcywgYW5kIG1vYmlsZSBkZXZpY2VzLiBcbiAgICAgIEl0IGlzIGNhbGxlZCBhIFwic2FuZGJveCBnYW1lXCIgYmVjYXVzZSBpdCBwcm92aWRlcyBhbiBpbmRlcGVuZGVudCBlbnZpcm9ubWVudCBpbiB3aGljaCBcbiAgICAgIHBsYXllcnMgY2FuIG1ha2UgdGhlaXIgb3duIHN0cnVjdHVyZXMgYW5kIG9iamVjdHMgb3V0IG9mIHZpcnR1YWwsIExFR08tbGlrZSBibG9ja3MuXG4gICAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyIGhlYWRsaW5lXCI+XG4gIDxUaXRsZSBtc2c9XCJBUiAmYW1wOyBWUiBHQU1FU1wiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXIgaGVhZGxpbmVcIj5cbiAgPFRpdGxlIG1zZz1cIkFSICZhbXA7IFZSIEFSVFwiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4vLyAgICAgICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyLXNpZGVcIj5cbiAgPGJyPjxicj5cbiAgPCEtLSA8VGl0bGUgbXNnPVwiQXVyYVwiIC8+IC0tPlxuICA8ZGl2IGNsYXNzPVwiaGVhZGxpbmVcIj5BdXJhPC9kaXY+XG4gIDxicj5cbiAgPGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gICAgPHA+SW4gMTkzMHMsIFdhbHRlciBCZW5qYW1pbiBpbnRyb2R1Y2VkIHRoZSBjb25jZXB0IG9mIDxlbT5hdXJhPC9lbT4gaW4gVGhlIFdvcmsgb2YgQXJ0IGluIHRoZSBBZ2Ugb2YgTWVjaGFuaWNhbCBSZXByb2R1Y3Rpb24uIFxuICBBdXJhIGlzIHRoZSA8ZW0+aGVyZSBhbmQgbm93PC9lbT4gdGhhdCB3b3JrIHBvc3Nlc3NlcyBiZWNhdXNlIG9mIGl0cyB1bmlxdWUgaGlzdG9yeSBvZiBwcm9kdWN0aW9uIGFuZCB0cmFuc21pc3Npbm93b24uIDwvcD5cbiAgPGJyPlxuICA8cD5BUiBhcHBsaWNhdGlvbnMgYXJlIG5vdCBwZXJmZWN0IHJlcHJvZHVjdGl2ZSB0ZWNobm9sb2dpZXMsIGFzIHNvbWUgZHJhdyBvbiB0aGUgcGh5c2ljYWwgYW5kIGN1bHR1cmFsIHVuaXF1ZXNuZXNzLCA8ZW0+dGhlIGhlcmUgYW5kIG5vdzwvZW0+IG9mIHBhcnRpY3VsYXIgcGxhY2VzIDwvcD5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyLXNpZGVcIj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlxuICAgIFwiVGhlc2UgZGVmaW5pdGlvbnMgY2lyY2xlIGFyb3VuZCBvbmUgY29yZSBpZGVhOiB0aGF0IHByZXNlbmNlIGlzIGEga2luZCBvZiBhYnNlbmNlLCA8c3BhbiBjbGFzcz1cImtleVBvaW50XCI+dGhlIGFic2VuY2Ugb2YgbWVkaWF0aW9uLjwvc3Bhbj4gUHJlc2VuY2UgYXMgdHJhbnNwb3J0YXRpb24sIGltbWVyc2lvbiwgb3IgcmVhbGlzbSBhbGwgY29tZSBkb3duIHRvIHRoZSB1c2VyJ3MgZm9yZ2V0dGluZyB0aGF0IHRoZSBtZWRpdW0gaXMgdGhlcmUuXCJcbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyLXNpZGVcIj5cbiAgPFRpdGxlIG1zZz1cIkdhdWTDrSdzIENhc2EgQmF0bGzDsyB3aXRoIEFSXCIgLz5cbiAgPGJyPjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlwiQ2FzYSBCYXRsbMOzLCBvbmUgb2YgdGhlIG1hc3RlcnBpZWNlcyBvZiBBbnRvbmkgR2F1ZMOtLCBjYW4gYmUgZXhwZXJpZW5jZWQgd2l0aCB0aGUgbW9iaWxlIEFSLCB3aGljaCB2aXN1YWxpemVzIHRoZSByZWNvbnN0cnVjdGVkIGludGVyaW9yIGFuZCB0aGUgZGVzaWduIGluc3BpcmF0aW9ucyB0aHJvdWdoIDNEIGFuaW1hdGlvbnMuXCI8L2Rpdj5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2I5YTMwN2RiM2I2MTU3ZTAuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cblxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9DYXNhLWJhdGxsby5qcGdcIiBjbGFzcz1cImZ1bGxcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgLy8gICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gPGRpdiBjbGFzcz1cInNwYWNlci1zaWRlXCI+XG4gIDxUaXRsZSBtc2c9XCJDeWJlcnNpY2tuZXNzIGFuZCB0aGUgbmVnYXRpb24gb2YgcHJlc2VuY2VcIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gIDxicj48YnI+XG4gICBUaGUgdGVybSBjeWJlcnNpY2tuZXNzLCBvciB2aXN1YWxseSBpbmR1Y2VkIG1vdGlvbiBzaWNrbmVzcywgaGFzIGJlZW4gY29pbmVkIHRvIGRlc2NyaWJlIHN5bXB0b21zIGluY2x1ZGluZyBoZWFkYWNoZSwgbmF1c2VhLCBleWUgc3RyYWluLCBkaXp6aW5lc3MsIGZhdGlndWUsIG9yIGV2ZW4gdm9taXRpbmcgdGhhdCBtYXkgb2NjdXIgZHVyaW5nIG9yIGFmdGVyIGV4cG9zdXJlIHRvIGEgdmlydHVhbCBlbnZpcm9ubWVudC4gQ3liZXJzaWNrbmVzcyBpcyB2aXNjZXJhbCBldmlkZW5jZSB0aGF0IFZSIGlzIG5vdCB0aGUgbWVkaXVtIHRvIGVuZCBhbGwgbWVkaWEuIEN5YmVyc2lja25lc3MgcmVtaW5kcyB0aGUgc3VzY2VwdGlibGUgdXNlciBvZiB0aGUgbWVkaXVtIGluIGEgcG93ZXJmdWwgd2F5LiBOYXVzZWEgcmVwbGFjZXMgYXN0b25pc2htZW50LiAgXG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAvLyAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2I5MmM1ZjVhYTA3OTI2NjUuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvUmlkZVZSLmpwZ1wiIGNsYXNzPVwiZnVsbFwiPlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAvLyAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXItc2lkZVwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUHJlc2VuY2UgYW5kIEVtcGF0aHlcIiAvPlxuICA8YnIvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+UmVzZWFyY2hlcnMgaGF2ZSBsb25nIHB1cnN1ZWQgdGhlIGlkZWEgb2YgZW1vdGlvbmFsIHJlYWN0aW9ucyBzdWNoIGFzIGVtcGF0aHkgYXMgYSB0ZXN0IG9mIHByZXNlbmNlLiBcbiBWUiBpcyAgdW5kZXJzdG9vZCBhcyBnZXR0aW5nIHVzIGNsb3NlciB0byB0aGUgYXV0aGVudGljIG9yIHRoZSByZWFsLiBCdXQgZm9yZ2V0dGluZyB0aGUgbWVkaXVtIGlzIG5vdCBuZWNlc3NhcnkgZm9yIGEgc2Vuc2Ugb2YgcHJlc2VuY2UuIFByZXNlbmNlIGNhbiBiZSB1bmRlcnN0b29kIGluIGEgbW9yZSBudWFuY2VkIHdheSBhcyBhIGxpbWluYWwgem9uZSBiZXR3ZWVuIGZvcmdldHRpbmcgYW5kIGFja25vd2xlZGdpbmcgVlIgYXMgYSBtZWRpdW0uXG48L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMjVlY2YwNWY2NmRmMDc3Ny5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01hcF9ibGFjay5qcGdcIiBjbGFzcz1cImZ1bGxcIj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgLy8gICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iZWI2MThmZmUzNzY5YmI2LnBuZ1wiIiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2JmMjFmMzQ0MmQzZmE4NGQucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8ZGl2IGNsYXNzPVwibGFyZ2VyVGV4dFwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6Ym9sZDt0ZXh0LWFsaWduOmxlZnRcIj4xLiBXaGF0IGlzIFByZXNlbmNlPzwvZGl2PlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdXBhcnJvdy5wbmdcIiB3aWR0aD1cIjUwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmxlZnRcIj4yLiBNYW5pZmVzdGF0aW9ucyBvZiBQcmVzZW5jZTwvZGl2PlxuICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VyYXJyb3cucG5nXCIgd2lkdGg9XCI1MFwiICBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIiBzdHlsZT1cInRleHQtYWxpZ246bGVmdFwiPjMuIEF1cmEsIFBsYWNlIGFuZCBTcGFjZSA8L2Rpdj5cbiAgIFxuXG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgLy8gICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNDZkNzc5M2ZhN2FiMjRhZC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxkaXYgc3R5bGU9XCJmb250LXNpemU6Mi40cmVtOyBmb250LXdlaWdodDpib2xkO3RleHQtYWxpZ246bGVmdFwiPjIuIE1hbmlmZXN0YXRpb25zIG9mIFByZXNlbmNlPC9kaXY+XG4gICAgPGJyIC8+XG4gICAgPGJyPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvcmlnaHRhcnJvdy5wbmdcIiB3aWR0aD1cIjUwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmxlZnRcIj4xLiBXaGF0IGlzIFByZXNlbmNlPzwvZGl2PlxuICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VwYXJyb3cucG5nXCIgd2lkdGg9XCI1MFwiICBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIiBzdHlsZT1cInRleHQtYWxpZ246bGVmdFwiPjMuIEF1cmEsIFBsYWNlIGFuZCBTcGFjZSA8L2Rpdj5cbiAgIFxuXG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgLy8gICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvZjg5Y2I0ZTM1MDQ2OWIxNC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxkaXYgY2xhc3M9XCJsYXJnZXJUZXh0XCIgc3R5bGU9XCJmb250LXNpemU6Mi44cmVtO2ZvbnQtd2VpZ2h0OmJvbGQ7dGV4dC1hbGlnbjpsZWZ0XCI+My4gQXVyYSwgUGxhY2UgYW5kIFNwYWNlIDwvZGl2PlxuICA8YnI+PGJyPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvdWxhcnJvdy5wbmdcIiB3aWR0aD1cIjUwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHRcIj5cblx0PGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmxlZnRcIj4xLiBXaGF0IGlzIFByZXNlbmNlPzwvZGl2PlxuICAgIDxiciAvPlxuICAgICAgPGJyIC8+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3VwYXJyb3cucG5nXCIgd2lkdGg9XCI1MFwiICBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuXHQ8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIiBzdHlsZT1cInRleHQtYWxpZ246bGVmdFwiPjIuIE1hbmlmZXN0YXRpb25zIG9mIFByZXNlbmNlPC9kaXY+XG4gICBcblxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgIC8vICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzQ5MDU3NTczNzQ5MjMyNTkucG5nXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlci1zaWRlXCI+XG4gIDxicj48YnI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9sZmFycm93LnBuZ1wiIHdpZHRoPVwiMjBcIiBzdHlsZT1cImZsb2F0OiBsZWZ0OyBtYXJnaW46IDEwcHhcIj5cbiAgPFRpdGxlIG1zZz1cIlVsdGltYXRlIEVtcGF0aHkgTWFjaGluZVwiIC8+XG4gIDxicj48YnI+XG4gIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4zNjA8c3Bhbj4mIzE3Njs8L3NwYW4+IGZpbG0gQ2xvdWRzIE92ZXIgU2lkcmEgY3JlYXRlZCBieSBDaHJpcyBNaWxrIGFuZCBHYWJvIEFyb3JhIHNob3dzIHRoZSBsaWZlIG9mIFN5cmlhbiByZWZ1Z2VlcyBpbiBaYSdhdGFyaSBjYW1wIGluIEpvcmRhbi4gVGhlIGNhbWVyYSBmb2xsb3dzIDEyLXllYXIgb2xkIFNpZHJhIGluIGhlciBldmVyeWRheSBsaWZlLCBhbGxvd2luZyB0aGUgdXNlcnMgdG8gYmUgcHJlc2VudCB3aXRoIFNpZHJhLiA8L2Rpdj5cbiAgPGJyIC8+XG4gIDxibG9ja3F1b3RlIGNsYXNzPVwic3F1YXJlb2ZmXCI+XCJXaGVuIHlvdeKAmXJlIGluc2lkZSBvZiB0aGUgaGVhZHNldCAuIC4gLiB5b3Ugc2VlIGZ1bGwgMzYwIGRlZ3JlZXMsIGluIGFsbCBkaXJlY3Rpb25zLiBBbmQgd2hlbiB5b3XigJlyZSBzaXR0aW5nIHRoZXJlIGluIGhlciByb29tLCB3YXRjaGluZyBoZXIsIHlvdSdyZSBub3Qgd2F0Y2hpbmcgaXQgdGhyb3VnaCBhIHRlbGV2aXNpb24gc2NyZWVuLCB5b3XigJlyZSBub3Qgd2F0Y2hpbmcgaXQgdGhyb3VnaCBhIHdpbmRvdywgeW914oCZcmUgc2l0dGluZyB0aGVyZSB3aXRoIGhlci4gV2hlbiB5b3UgbG9vayBkb3duLCB5b3UncmUgc2l0dGluZyBvbiB0aGUgc2FtZSBncm91bmQgdGhhdCBzaGXigJlzIHNpdHRpbmcgb24uIEFuZCBiZWNhdXNlIG9mIHRoYXQsIHlvdSBmZWVsIGhlciBodW1hbml0eSBpbiBhIGRlZXBlciB3YXkuIFlvdSBlbXBhdGhpemUgd2l0aCBoZXIgaW4gYSBkZWVwZXIgd2F5LiAoTWlsayAyMDE1KVwiPC9ibG9ja3F1b3RlPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgLy8gICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9iNDY0ZGJlOTBkNjEzM2FiLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG5cbiAgICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvY2xvdWRvdmVyc2lkcmEuanBnXCIgY2xhc3M9XCJmdWxsXCI+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC9kMGRhMTk4ZmM5NGY5MDZjLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXItc2lkZVwiPlxuICA8YnI+PGJyPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvcnRhcnJvdy5wbmdcIiB3aWR0aD1cIjIwXCIgc3R5bGU9XCJmbG9hdDogcmlnaHQ7IG1hcmdpbjogMTBweFwiPlxuICA8VGl0bGUgbXNnPVwiVGhlIGZ1dHVyZSBvZiBuZXdzP1wiIC8+XG4gIDxicj5cbiAgPGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+Tm9ubmllIGRlIGxhIFBlw7FhJ3MgPGEgaHJlZj1cImh0dHBzOi8vZW1iZWQudGVkLmNvbS90YWxrcy9ub25ueV9kZV9sYV9wZW5hX3RoZV9mdXR1cmVfb2ZfbmV3c192aXJ0dWFsX3JlYWxpdHlcIiB0YXJnZXQ9XCJfYmxhbmtcIj5UZWQgVGFsazwvYT4gY2FsbGVkICdUaGUgZnV0dXJlIG9mIG5ld3M/JycgIGludHJvZHVjZXMgYSBuZXcgZm9ybSBvZiBqb3VybmFsaXNtIHdoZXJlIFZpcnR1YWwgUmVhbGl0eSB0ZWNobm9sb2d5IGlzIHVzZWQgdG8gcHV0IGF1ZGllbmNlIGluc2lkZSB0aGUgc3Rvcmllcy4gSW4gaGVyIHdvcmssIHNoZSBjcmVhdGVkIFZSIHN0b3JpZXMgYWJvdXQgaW1wcmlzb25tZW50IGluIEd1YW50YW5hbW8gYW5kIGh1bmdlciBpbiBMb3MgQW5nZWxlcyB0byBpbmR1Y2UgZW1wYXRoeSBpbiB0aGUgYXVkaWVuY2UuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvN2I2ODJmNzczNzc2Y2M0ZS5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvbm9ubmllLmpwZ1wiIHN0eWxlPVwid2lkdGg6MTAwJVwiID5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8yMTc2ZGM2NmY1YTAyNTQ2LnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXItc2lkZVwiPlxuICA8ZGl2IGNsYXNzPVwicG9zdGVydGl0bGVcIj5QaXQgRXhwZXJpbWVudDwvZGl2PlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm9vbTYvcGl0VlIucG5nXCIgc3R5bGU9XCJ3aWR0aDogNjAlOyBmbG9hdDogcmlnaHQ7IG1hcmdpbjowIDAgMCAxNXB4XCI+XG4gIFx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlRoZSBwaXQgZXhwZXJpbWVudCBpcyBhIHZpcnR1YWwgZXhwZXJpbWVudCBvZnRlbiB1c2VkIHRvIGV2YWx1YXRlIHRoZSBzZW5jZSBvZiBwcmVzZW5jZS4gVGhlIHVzZXIgaXMgZ2l2ZW4gYSB0YXNrIHRvIGdyYWIgYW4gb2JqZWN0IG9uIHBsYW5rIGFuZCB0YWtlIGl0IHRvIHRoZSBvdGhlciBzaWRlLCBjcm9zc2luZyB0aGUgcGl0LiA8L2Rpdj5cblxuICA8L2Rpdj5cbjwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvZGVkY2I3ZjE2MmFmNWVhZS5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyLXNpZGVcIj5cbiAgPFRpdGxlIG1zZz1cIlByZXNlbmNlIGluIEFSXCIgLz5cbiAgPGJyPjxicj5cbiAgXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9waXRBUi5qcGdcIiBzdHlsZT1cIndpZHRoOiA2MCU7IGZsb2F0OiByaWdodDsgbWFyZ2luOjAgMCAwIDE1cHhcIj5cblxuVGhpcyBleHBlcmltZW50IHdhcyBpbnNwaXJlZCBieSB0aGUgVlIgXCJwaXRcIiBleHBlcmltZW50IGRlc2NyaWJlZCBvbiB0aGUgd2FsbCB0byB5b3VyIGxlZnQuIFRoZSBzdWJqZWN0cyB3b3JlIEFSIGhlYWRzZXRzIGluc3RlYWQgb2YgVlIgb25lcy4gVGhleSBjb3VsZCBzZWUgdGhlIHJvb20gYXJvdW5kIHRoZW0sIGJ1dCB0aGUgcGl0IGl0c2VsZiB3YXMgc3RpbGwgdmlydHVhbC4gV291bGQgdGhlIHN1YmplY3RzIHdvdWxkIGZlZWwgdGhlIHNhbWUgbWVhc3VyYWJsZSBhbnhpZXR5IGluIEFSIGFzIGluIFZSPyBUaGUgc3ViamVjdHMgZmlsbGVkIG91dCBhIHF1ZXN0aW9ubmFpcmUgYWZ0ZXIgdGhlIGV4cGVyaWVuY2UgYW5kIGluZGljYXRlZCB0aGF0IHRoZXkgZGlkIGhhdmUgYSBmZWVsaW5nIG9mIHByZXNlbmNlLCBidXQgaW4gdGhpcyBjYXNlLCB1bmxpa2UgaW4gdGhlIFZSIGV4cGVyaW1lbnQsIHRoZSBwaHlzaW9sb2dpY2FsIGRhdGEgKGhlYXJ0IHJhdGUgZXRjLikgZGlkIG5vdCBpbmRpY2F0ZSBhIHJlc3BvbnNlLlxuPGJyPjxicj5cbkdhbmR5LCBNYXJpYmV0aCwgZXQgYWwuIDIwMTAuIOKAnEV4cGVyaWVuY2VzIHdpdGggYW4gQVIgRXZhbHVhdGlvbiBUZXN0IEJlZDogUHJlc2VuY2UsIFBlcmZvcm1hbmNlLCBhbmQgUGh5c2lvbG9naWNhbCBNZWFzdXJlbWVudC7igJ0gSW4gMjAxMCBJRUVFIEludGVybmF0aW9uYWwgU3ltcG9zaXVtIG9uIE1peGVkIGFuZCBBdWdtZW50ZWQgUmVhbGl0eSwgMTI34oCTMzYuIFNlb3VsLCBLb3JlYSAoU291dGgpOiBJRUVFLiBodHRwczovL2RvaS5vcmcvMTAuMTEwOS9JU01BUi4yMDEwLjU2NDM1NjAuXG5cbiA8L2Rpdj5cbjwvZGl2PlxuICA8L2Rpdj5cblxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyLXNpZGVcIj5cbiAgPGRpdiBjbGFzcz1cInBvc3RlcnRpdGxlXCI+UHJlc2VuY2U8L2Rpdj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPlByZXNlbmNlIGlzIGEga2luZCBvZiBhYnNlbmNlLCB0aGUgYWJzZW5jZSBvZiBtZWRpYXRpb24uIElmIHRoZSB1c2VycyBjYW4gZm9yZ2V0IHRoYXQgdGhlIG1lZGl1bSBpcyB0aGVyZSwgdGhlbiB0aGV5IGZlZWwgcHJlc2VuY2UuIFxuICA8YnI+XG4gIDxicj5cbiAgVG8gbG9vayBmdXJ0aGVyLCBMb21iYXJkIGFuZCBEaXR0b24ncyBjbGFzc2lmaWNhdGlvbiBvZiBwcmVzZW5jZSBpcyB1c2VmdWwuIFRoZXkgZ3JvdXBlZCBkZWZpbml0aW9ucyBvZiBwcmVzZW5jZSBpbnRvIHR3byBjYXRlZ29yaWVzLCB3aGljaCBhcmVcbiAgPGJyPlxuICA8YnI+XG4gIDxkaXYgY2xhc3M9XCJrZXlQb2ludFwiPiBcbiAgKDEpIGluZGl2aWR1YWwgcGVyY2VwdGlvbiBvZiB0aGUgd29ybGRcbiAgPGJyPlxuICAoMikgc29jaWFsIGludGVyYWN0aW9uIGFuZCBlbmdhZ2VtZW50IHdpdGggb3RoZXJzPC9kaXY+XG4gIDxicj5cbiAgPGJyPlxuICBUaGUgZmlyc3QgY2F0ZWdvcnkgaW5jbHVkZXMgcHJlc2VuY2UgYXMgdHJhbnNwb3J0YXRpb24sIGFzIGltbWVyc2lvbiBhbmQgYXMgcmVhbGlzbS5cbiAgPC9kaXY+XG4gIDxicj5cbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCIgc3R5bGU9XCJmb250LXN0eWxlOml0YWxpY1wiPlwiVlIgYW5kIEFSIGNhbm5vdCBkZWNlaXZlIHRoZWlyIHVzZXJzIGludG8gYmVsaWV2aW5nIHRoYXQgdGhleSBhcmUgaGF2aW5nIGEgbm9uLW1lZGlhdGVkIGV4cGVyaWVuY2UuIEJ1dCB0aGF0IGlzIG5vdCBuZWNlc3NhcnkgZm9yIGEgc2Vuc2Ugb2YgcHJlc2VuY2UuXCI8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiAgPC9kaXY+IFxuICBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyLXNpZGVcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIlRyZWVodWdnZXI6IFdhd29uYVwiIC8+XG4gIDxicj48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5UcmVlaHVnZ2VyOiBXYXdvbmEgVlIgZXhwZXJpZW5jZSB0cmFuc3BvcnRzIHRoZSB1c2VycyB0byB0aGUgcmVkIGdpYW50IFNlcXVvaWEgdHJlZXMgZnJvbSB0aGUgU2VxdW9pYSBOYXRpb25hbCBQYXJrLiBJdCBwcm92aWRlcyBhIHNlbnNlIG9mIGludGltYWN5IHdpdGggdGhlIHRyZWUgLSB3aXRoIGl0cyBiYXJrLCB3aXRoIHRoZSBjZWxscyB0aGF0IG1ha2UgdXAgaXRzIGJlaW5nLiBUaGUgdml2aWRuZXNzIG9mIHRoZSB3b3JrIGlsbHVzdHJhdGVzIDxlbT5wcmVzZW5jZTwvZW0+LiA8L2Rpdj5cbiAgPCEtLSBJbiB0aGlzIGV4cGVyaWVuY2UsIHVzZXJzIGZpbmQgdGhlbXNlbHZlcyBvbiB0aGUgdGhyZXNob2xkIG9mIGZvcmdldHRpbmcgdGhhdCB3ZSBhcmUgaGF2aW5nIGEgVlIgZXhwZXJpZW5jZS4gQmVpbmcgb24gdGhhdCB0aHJlc2hvbGQgaXMgYSBzZW5jZSBvZiBwcmVzZW5jZSBpbiBhIHJlYWxpdHkgbWVkaXVtLiAtLT5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvOTAwYzVjMzNjYjUwYjBkZi5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb29tNi9MYWNpb3RhdC5wbmdcIiBjbGFzcz1cImZ1bGxcIj5cbiAgICA8YnI+PGJyPlxuICAgIDxkaXY+UmVhbGl0eSBtZWRpYSBoYXZlIGFsd2F5cyBiZWVuIGFib3V0IHByZXNlbmNlLiBUaGUgbGVnZW5kIG9mIExhIENpb3RhdCBpcyBhIG15dGggb2YgcHJlc2VuY2UsIHdoaWNoIHlvdSBjYW4gZXhwbG9yZSBpbiB0aGUgZ2FsbGVyeSBlbnRpdGxlZCBcIldoYXQgYXJlIFJlYWxpdHkgTWVkaWE/XCI8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC80ZjYzNjk1YzQ2OTc3MmUyLnBuZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L1NwYWNlQW5kUGxhY2UucG5nXCIgY2xhc3M9XCJmdWxsXCI+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIC8vICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8IS0tIDxUaXRsZSBtc2c9XCJUaGUgZnV0dXJlIG9mIG5ld3M/XCIgLz4gLS0+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5QYXJ0aGVub24gbW9kZWwgZXhwbGFuYXRpb248L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2I1MzA5ZTJiNDVkNTMzMGMuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1Jvb202L3RlcnJhY290dGEyLmpwZ1wiIGNsYXNzPVwiZnVsbFwiID5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgIC8vICAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyLXNpZGVcIj5cbiAgPFRpdGxlIG1zZz1cIlRlcnJhY290dGEgV2FycmlvcnMgQVJcIiAvPlxuICA8YnI+PGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+VGhlIEZyYW5rbGluIEluc3RpdHV0ZSBpbiBQaGlsYWRlbHBoaWEgb2ZmZXJlZCBhIG1vYmlsZSBBUiBleHBlcmllbmNlIGZvciB0aGVpciBUZXJyYWNvdHRhIFdhcnJpb3IgZXhoaWJpdGlvbi4gVGhlIGFwcCBhbGxvd2VkIHZpc2l0b3JzIHRvIHVzZSB0aGVpciBzbWFydHBob25lcyB0byBzY2FuIGl0ZW1zIGFuZCB2aWV3IHZhcmlvdXMgQVIgY29udGVudCB0byBsZWFybiAgbW9yZSBhYm91dCB0aGUgaGlzdG9yeSBiZWhpbmQgdGhlIGNsYXkgc29sZGllcnMuPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiUGl0IEV4cGVyaW1lbnRcIiAvPlxuICA8YnI+XG4gIDxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPk1lYXN1cmluZyB0aGUgYW1vdW50IG9mIHByZXNlbmNlIG9yIHRoZSBzZW5zZSBvZiBiZWluZyB0aGVyZSwgaXMgb25lIG9mIHRoZSBmZXcgd2F5cyB0byBhc3Nlc3MgdGhlIHF1YWxpdHkgb2YgYSB2aXJ0dWFsIHNwYWNlLiBUaGlzIHZpcnR1YWwgcGl0IGV4cGVyaW1lbnQgaXMgYSBzcGFjZSB0aGF0IG1lYXN1cmVzIHRoZSBwcmVzZW5jZSBieSBtZWFzdXJpbmcgY2hhbmdlcyBpbiBwaHlzaW9sb2dpY2FsIHJlYWN0aW9ucyBpbiB1c2VycyBzdWNoIGFzIGNoYW5nZXMgaW4gaGVhcnQgcmF0ZS4gSW4gdGhpcyB2aXJ0dWFsIHJvb20sIGZlZWwgd2hldGhlciB5b3VyIGhlYXJ0IGlzIGJlYXRpbmcgZmFzdGVyIG9yIHlvdXIgaGFuZHMgZ2V0IHN3ZWF0eSBhcyBpZiB5b3UgYXJlIGluIGEgcmVhbCBzcGFjZS4gIFxuICAgIDxicj5cbiAgICA8YnI+XG4gICAgPGJyPlxuICBNZWVoYW4sIE0uLCBJbnNrbywgQi4sIFdoaXR0b24sIE0uLCAmIEJyb29rcyBKciwgRi4gUC4gKDIwMDIpLiBQaHlzaW9sb2dpY2FsIG1lYXN1cmVzIG9mIHByZXNlbmNlIGluIHN0cmVzc2Z1bCB2aXJ0dWFsIGVudmlyb25tZW50cy4gQWNtIHRyYW5zYWN0aW9ucyBvbiBncmFwaGljcyAodG9nKSwgMjEoMyksIDY0NS02NTIuIFxuICA8YnI+XG4gIDxicj5cbiAgPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJJbnN0cnVjdGlvbnNcIiAvPlxuICA8YnI+XG4gIDxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPjEuIFBpY2sgdXAgdGhlIHJ1YmJlciBkdWNrIGluIHRoaXMgcm9vbSBhbmQgdHJ5IHRvIHBsYWNlIGl0IGluIHRoZSBkZXNpZ25hdGVkIGFyZWEgb24gdGhlIGZhciBzaWRlIG9mIHRoZSByb29tLlxuICA8YnI+XG4gIDxicj5cbjIuIFBpY2sgdXAgYW5vdGhlciBydWJiZXIgZHVjayBhbmQgZHJvcCBpdCBvbiB0aGUgcmVkIGFuZCBibHVlIHRhcmdldCBvbiB0aGUgZmxvb3IuXG48YnI+XG48YnI+XG48YnI+XG48YnI+XG5IZWFkLU1vdW50ZWQgRGlzcGxheSBkZXZpY2VzIHN1Y2ggYXMgT2N1bHVzIFF1ZXN0cyBhcmUgcmVjb21tZW5kZWQgZm9yIHRoaXMgZXhwZXJpbWVudC4gPC9kaXY+XG48YnI+XG48YnI+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxicj48YnI+XG4gIDxUaXRsZSBtc2c9XCJWZXJ5IGNhcmVmdWxseSBzdHJldGNoIHlvdXIgYXJtcyBvdXQgZm9yIGJhbGFuY2UuXCIgLz5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkRvZXMgdGhpcyBleHBlcmltZW50IG1ha2UgeW91IHN3ZWF0IG9yIHlvdXIgaGVhcnQgYmVhdCBmYXN0ZXI/XCIgLz5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbjxUaXRsZSBtc2c9XCJXZWxjb21lIHRvIFJlYWxpdHkgTWVkaWEhXCIgLz5cbjxicj48YnI+XG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj4gPGk+UmVhbGl0eSBNZWRpYTwvaT4gaXMgYSBwcm9qZWN0IGVuY29tcGFzc2luZyB0aHJlZSB3cml0aW5nIHNwYWNlcywgdGhyZWUgdGVjaG5vbG9naWVzIGZvciByZXByZXNlbnRpbmcgaWRlYXM6IHByaW50LCB0aGUgd2ViLCBhbmQgaW1tZXJzaXZlIFZSLiBUaGUgcHJpbnRlZCBwYWdlIGlzIGEgd3JpdGluZyBzcGFjZSB3aXRoIGEgdHJhZGl0aW9uIGRhdGluZyBiYWNrIHRvIHRoZSBmaWZ0ZWVudGggY2VudHVyeSAoaW4gRXVyb3BlLCBtdWNoIGVhcmxpZXIgaW4gQ2hpbmEpLiBPYnZpb3VzbHkgdGhlIHdlYiBoYXMgYSBmYXIgc2hvcnRlciB0cmFkaXRpb24sIGJlZ2lubmluZyBhcm91bmQgMTk5MC4gQnV0IGluIHRoZSB0aGlydHkgeWVhciBzaW5jZSBUaW0gQmVybmVycy1MZWUgbGF1bmNoZWQgdGhlIGZpcnN0IHdlYiBzZXJ2ZXIsIHRoZSB3ZWIgaGFzIGdyb3duIHRvIHJpdmFsIHByaW50IGZvciBtYW55IGtpbmRzIG9mIGNvbW11bmljYXRpb24uIFRoZSB0ZWNobm9sb2dpZXMgZm9yIGNyZWF0aW5nIDNEIGdyYXBoaWMgc3BhY2VzIGluIFZSIChhbmQgQVIpIGFjdHVhbGx5IHByZWRhdGUgdGhlIHdlYi4gQnV0IG9ubHkgaW4gdGhlIHBhc3QgMTAgeWVhcnMgaGF2ZSBBUiBhbmQgVlIgYmVjb21lIHdpZGVseSBhdmFpbGFibGUgbWVkaWEuIFRoZSBnb2FsIG9mIFJlYWxpdHlNZWRpYSBpcyB0byBkZW1vbnN0cmF0ZSB0aGUgcG90ZW50aWFsIHJhbmdlIG9mIEFSIGFuZCBWUiBhcyBjb21tdW5pY2F0aXZlIGZvcm1zLlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC83YTI0YTZkMzA5ZDQ1M2YyLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPFRpdGxlIG1zZz1cIlJlYWxpdHkgTWVkaWFcIiAvPlxuICA8YnIgLz5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvcmVhbGl0eU1lZGlhQm9vay5qcGdcIiB3aWR0aD1cIjI4MFwiIHN0eWxlPVwiZmxvYXQ6bGVmdDsgbWFyZ2luLXJpZ2h0OjIwcHhcIj5cblxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+PGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjMwcHhcIj5QdWJsaXNoZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vbWl0cHJlc3MubWl0LmVkdS9ib29rcy9yZWFsaXR5LW1lZGlhXCI+TUlUIFByZXNzPC9hPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwib2JsaXF1ZVwiPkJ5IEpheSBEYXZpZCBCb2x0ZXIsIE1hcmlhIEVuZ2JlcmcgYW5kIEJsYWlyIE1hY0ludHlyZTwvZGl2PiBcbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwicXVvdGVcIj5Ib3cgYXVnbWVudGVkIHJlYWxpdHkgYW5kIHZpcnR1YWwgcmVhbGl0eSBhcmUgdGFraW5nIHRoZWlyIHBsYWNlcyBpbiBjb250ZW1wb3JhcnkgbWVkaWEgY3VsdHVyZSBhbG9uZ3NpZGUgZmlsbSBhbmQgdGVsZXZpc2lvbi48L2Rpdj48L2Rpdj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxUaXRsZSBtc2c9XCJCb29rOiBSZWFsaXR5IE1lZGlhXCIgLz5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiIHN0eWxlPVwid2lkdGg6MzgwcHhcIj5QdWJsaXNoZWQgYnkgPGEgaHJlZj1cImh0dHBzOi8vbWl0cHJlc3MubWl0LmVkdS9ib29rcy9yZWFsaXR5LW1lZGlhXCI+TUlUIFByZXNzPC9hPjwvZGl2PlxuICA8YnI+XG4gIDxkaXYgY2xhc3M9XCJvYmxpcXVlIHNxdWFyZW9mZlwiPkJ5IEpheSBEYXZpZCBCb2x0ZXIsIE1hcmlhIEVuZ2JlcmcgYW5kIEJsYWlyIE1hY0ludHlyZTwvZGl2PiBcbiAgPGJyPlxuICA8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmIHF1b3RlXCI+XCJIb3cgYXVnbWVudGVkIHJlYWxpdHkgYW5kIHZpcnR1YWwgcmVhbGl0eSBhcmUgdGFraW5nIHRoZWlyIHBsYWNlcyBpbiBjb250ZW1wb3JhcnkgbWVkaWEgY3VsdHVyZSBhbG9uZ3NpZGUgZmlsbSBhbmQgdGVsZXZpc2lvbi5cIiA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNWIxNGRhOTZlMjg4OWZmMi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01vemlsbGFIdWJzLmpwZ1wiIHdpZHRoPVwiNDAwXCIgPlxuICA8YnI+PGJyPlxuICA8VGl0bGUgbXNnPVwiVGhlIEh1YnMgUGxhdGZvcm1cIiAvPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+KlJlYWxpdHltZWRpYSogaXMgYnVpbHQgb24gdG9wIG9mIE1vemlsbGEncyBvcGVuLXNvdXJjZSBwbGF0Zm9ybS4gQW4gZXh0ZW5zaXZlIGd1aWRlIHRvIHVzaW5nIE1vemlsbGEgSHVicyBpcyBhdmFpbGFibGUgYXQgPGEgaHJlZj1cImh0dHBzOi8vaHVicy5tb3ppbGxhLmNvbS9kb2NzL2ludHJvLWh1YnMuaHRtbFwiIHRhcmdldD1cImJsYW5rXCI+aW4gdGhlIEh1YnMgdXNlciBkb2N1bWVudGF0aW9uPC9hPi4gSGVyZSBhcmUgdGhlIGhpZ2hsaWdodHM6XG4gIDxicj48YnI+XG5CZWZvcmUgZW50ZXJpbmcsIHlvdSBhcmUgaW4gdGhlIHJvb20ncyBsb2JieS4gRnJvbSBoZXJlLCB5b3UgY2FuIHNlZSBhbmQgaGVhciB3aGF0J3MgZ29pbmcgb24gaW5zaWRlIHRoZSByb29tLCBidXQgeW91IGNhbiBvbmx5IGludGVyYWN0IHdpdGggb3RoZXJzIHVzaW5nIHRleHQgY2hhdC4gXG48YnI+PGJyPlxuPC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJzcXVhcmVvZmZcIj5cbiAgICAgIDxicj5cbiAgICAgIDxicj5cbiAgICAgIDxicj5cbjxkaXYgY2xhc3M9XCJrZXlQb2ludFwiPlRvIGVudGVyIHRoZSByb29tOjwvZGl2PlxuPGJyPlxuLSBPbiBhIGRlc2t0b3Agb3IgbW9iaWxlIGRldmljZSwgZm9sbG93IHRoZSBwcm9tcHRzIHRvIHNlbGVjdCBhIG5hbWUvYXZhdGFyIGFuZCBlbmFibGUgdGhlIG1pYy5cbjxicj5cbi0gT24gYSBWUiBoZWFkc2V0LCBpZiB5b3Ugb3BlbmVkIHRoZSBVUkwgb24geW91ciBkZXNrdG9wIG9yIHNtYXJ0cGhvbmUsIGNob29zZSBcIkVudGVyIG9uIFN0YW5kYWxvbmUgVlJcIiB0byBjcmVhdGUgYSBjb2RlIHRoYXQgbWFrZXMgaXQgZWFzeSB0byBvcGVuIG9uIHlvdXIgc3RhbmRhbG9uZSBoZWFkc2V0LiBPcGVuIHRoZSBicm93c2VyIGluIHlvdXIgVlIgaGVhZHNldCwgbmF2aWdhdGUgdG8gaHVicy5saW5rIGFuZCBlbnRlciB0aGUgY29kZS5cbjxicj48YnI+XG48ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5UbyBuYXZpZ2F0ZSBpbiBIdWJzOjwvZGl2PiAgXG48YnI+XG4tIE9uIGRlc2t0b3AgdXNlIHlvdXIgV0FTRCBvciBhcnJvdyBrZXlzIHRvIG1vdmUgYXJvdW5kLiBZb3UgY2FuIGFsc28gcHJlc3MgeW91ciByaWdodCBtb3VzZSBidXR0b24gdG8gdGVsZXBvcnQgdG8gYSBkaWZmZXJlbnQgbG9jYXRpb24uIFJvdGF0ZSB5b3VyIHZpZXcgdXNpbmcgdGhlIFEgYW5kIEUga2V5cywgb3IgaG9sZCBkb3duIHlvdXIgbGVmdCBtb3VzZSBidXR0b24gYW5kIGRyYWcuXG48YnI+XG4tIEZvciBWUiBhbmQgbW9iaWxlIGNvbnRyb2xzLCBzZWUgdGhlIGxpc3Qgb2YgPGEgaHJlZj1cImh0dHBzOi8vaHVicy5tb3ppbGxhLmNvbS9kb2NzL2h1YnMtY29udHJvbHMuaHRtbFwiIHRhcmdldD1cImJsYW5rXCI+SHVicyBjb250cm9scy48L2E+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNWQ0MmJjNmIyYTA3NGNjZC5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG5cbjxUaXRsZSBtc2c9XCJGZWF0dXJlcyBpbiBIdWJzXCIgLz5cbjxicj5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZlwiPiBUaGUgZmlndXJlIGJlbG93IGluZGljYXRlcyBob3cgdG8gbXV0ZSB5b3VyIG1pY3JvcGhvbmUsIHRha2UgcGhvdG9zLCBzaGFyZSB5b3VyIHNjcmVlbiwgY3JlYXRlIG1lZGlhIG9iamVjdHMsIGFuZCBzbyBvbjogPC9kaXY+IFxuICAgIDxicj48YnI+XG4gICAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL09uYm9hcmRpbmcvaHVicy11c2VyLWludGVyZmFjZS5wbmdcIiB3aWR0aD1cIjQwMFwiID5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cblxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPFRpdGxlIG1zZz1cIlN0YW5kaW5nIG9uIHRoZSBBdWRpbyBQYWRzIHdpbGwgc3RhcnQgdGhlIG5hcnJhdGlvbiBhYm91dCB0aGUgcm9vbSBvciB0aGUgc291bmQgb2YgdGhlIHZpZGVvIGNsaXAuXCIgLz5cblxuPGJyPjxicj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvODJhOTExZDI4OWNkMjgzNi5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48VGl0bGUgbXNnPVwiT3RoZXIgd2F5cyB0byB1c2UgdGhlIHJvb21cIiAvPlxuPGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG4gICAgPGRpdiBjbGFzcz1cImtleVBvaW50XCI+VmlzaXQgdGhlIGV4aGliaXQgd2l0aCBmcmllbmRzPC9kaXY+XG4gICAgU2hhcmluZyB0aGUgVVJMIG9mIHRoZSByb29tIHlvdSBhcmUgY3VycmVudGx5IGluIHdpbGwgYWxsb3cgb3RoZXJzIHRvIGpvaW4geW91ciBleHBlcmllbmNlLlxuICAgIDxiciAvPlxuICAgIDxiciAvPlxuICAgICAgPGRpdiBjbGFzcz1cImtleVBvaW50XCI+RmF2b3JpdGUgeW91ciByb29tPC9kaXY+XG4gICAgIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL2Zhdm9yaXRlLnBuZ1wiIHdpZHRoPVwiNDAwXCIgPlxuICAgICAgPGJyIC8+XG4gICBTZXQgeW91ciByb29tIGFzIGEgZmF2b3JpdGUgdW5kZXIgdGhlICdtb3JlJyBtZW51LiBUaGVuLCB5b3UgY2FuIGVhc2lseSByZXZpc2l0IHRoZSByb29tIGZyb20gdGhlIGxpc3QgaW4gdGhlICdmYXZvcml0ZSByb29tcycuXG4gIDwvZGl2PiBcbiAgXG4gICAgXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvMDEzYjc1NGFmOWViY2QzMi5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG48YnI+XG48ZGl2IGNsYXNzPVwia2V5UG9pbnRcIj5IZXJlIGlzIGEgbWFwLCB3aGljaCB5b3Ugd2lsbCBhbHNvIGZpbmQgcG9zdGVkIHRocm91Z2ggdGhlIGdhbGxlcmllczwvZGl2PlxuPGJyIC8+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9PbmJvYXJkaW5nL01hcF90cmFuc3BhcmVudC5wbmdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+XG48YnI+PGJyPjxicj48YnI+PGJyPlxuRWFjaCBnYWxsZXJ5IGluIHRoaXMg4oCcaW1tZXJzaXZlIGJvb2vigJ0gY29ycmVzcG9uZHMgdG8gb25lIG9yIG1vcmUgY2hhcHRlcnMgaW4gdGhlIHByaW50ZWQgYm9vayBhbmQgaWxsdXN0cmF0ZXMgdGhlIHRoZW1lcyBvZiB0aGUgcHJpbnRlZCBjaGFwdGVyKHMpLiAoU2VlIHRoZSBtYXAgb24gdGhlIGZhciB3YWxsIGZvciB0aGUgbmFtZXMvdGhlbWVzIG9mIHRoZSBnYWxsZXJpZXMuKSBGb3IgZXhhbXBsZSwgdGhlIGdhbGxlcnkgZW50aXRsZWQg4oCcUHJlc2VuY2XigJ0gaWxsdXN0cmF0ZXMgYm90aCBwcmVzZW5jZSBhbmQgdGhlIHJlbGF0ZWQgY29uY2VwdCBvZiBhdXJhIGFuZCBob3cgY29tcHV0ZXIgc2NpZW50aXN0cyBhcyB3ZWxsIGFzIGZpbG1tYWtlcnMgYW5kIGRlc2lnbmVycyBoYXZlIHRyaWVkIHRvIGV2b2tlIHRoZXNlIHJlYWN0aW9ucyBpbiB2aXNpdG9ycyB0byB0aGVpciBpbW1lcnNpdmUgYXBwbGljYXRpb25zLiBcbiA8L2Rpdj4gXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPGEgaHJlZj1cImh0dHBzOi8vcmVhbGl0eW1lZGlhLmRpZ2l0YWwvXCI+PFRpdGxlIG1zZz1cIkNsaWNrIGhlcmUgdG8gcmV0dXJuIGJhY2sgdG8gdGhlIHdlYnNpdGVcIiAvPjwvYT5cbjxpZnJhbWUgY2xhc3M9XCJ3ZWJJZnJhbWVcIiBzcmM9XCJodHRwczovL3JlYWxpdHltZWRpYS5kaWdpdGFsL1wiIHRpdGxlPVwicmVhbGl0eW1lZGlhIHdlYnNpdGVcIiB3aWR0aD1cIjEwMjRcIiBoZWlnaHQ9XCI3NjhcIiBzdHlsZT1cIi13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDAuNSk7LW1vei10cmFuc2Zvcm0tc2NhbGUoMC41KTtcIj48L2lmcmFtZT4gIFxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1KVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGJyPjxicj5cbiAgPFRpdGxlIG1zZz1cIkJhY2sgdG8gdGhlIG1haW4gZXhoaWJpdGlvblwiIC8+XG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAvLyB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzU2YTg2OGE1MzNlMTkzMTIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS8xLW1pbmVjcmFmdC1hci5qcGdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvYWY1ODdmYWQwZDYwZGYxMi5qcGdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzItYnJ1bmVsbGVzY2hpLmpwZ1wiIHdpZHRoPVwiNDAwXCI+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC80NzhiYWMwOWVjODZmMWYwLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvMy16YWtpLWxpemFyZC5qcGdcIiB3aWR0aD1cIjQwMFwiPlxuXG4gIDwvZGl2PlxuICA8L2Rpdj5cbiAgPC9kaXY+IFxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi8uLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgICAgLy90aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCJleHBvcnQgZGVmYXVsdCBcImh0dHBzOi8vcmVzb3VyY2VzLnJlYWxpdHltZWRpYS5kaWdpdGFsL3Z1ZS1hcHBzL2Rpc3QvNTliZjJjOTlmNWEyMTljNy5wbmdcIiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+XG4gIDxpbWcgc3JjPVwiLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9Sb3R1bmRhLzUtcHJvbWFjaG9zLnBuZ1wiIHdpZHRoPVwiNDAwXCI+XG5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uLy4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgICAvL3RoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCw0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsImV4cG9ydCBkZWZhdWx0IFwiaHR0cHM6Ly9yZXNvdXJjZXMucmVhbGl0eW1lZGlhLmRpZ2l0YWwvdnVlLWFwcHMvZGlzdC8wMjc4MDg0OGI1ODRmNTAxLmpwZ1wiIiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIiBjbGFzcz1cImRhcmt3YWxsXCI+XG4gIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj5cbiAgPGltZyBzcmM9XCIuLi8uLi8uLi9hc3NldHMvaW1hZ2VzL1JvdHVuZGEvNi1nZW5yZXMuanBnXCIgd2lkdGg9XCI0MDBcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0LzRkMTM4NzFmN2IyMTU5OGIuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS85LXByaXZhY3kuanBnXCIgd2lkdGg9XCI0MDBcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiZXhwb3J0IGRlZmF1bHQgXCJodHRwczovL3Jlc291cmNlcy5yZWFsaXR5bWVkaWEuZGlnaXRhbC92dWUtYXBwcy9kaXN0L2M3ZWFmMGE1ZDllYTMxNmYuanBnXCIiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuICA8aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvUm90dW5kYS8xMC1mdXR1cmUuanBnXCIgd2lkdGg9XCI0MDBcIj5cblxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9DZW50ZXJUaXRsZS52dWUnXG5cbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy90b3AuY3NzXCJcbmltcG9ydCBcIi4uLy4uLy4uL2Fzc2V0cy9yb29tLmNzc1wiXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAgIC8vdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0IiwiPHRlbXBsYXRlPlxuICA8ZGl2PiBcbiAgPGRpdiBpZD1cInJvb21cIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlclwiPlxuPFRpdGxlIHYtYmluZDptc2c9XCJ0aXRsZVwiIC8+XG48YnI+PGJyPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+U3RhbmRpbmcgb24gdGhlIEF1ZGlvIFBhZHMgd2lsbCB7eyBib2R5IH19PC9kaXY+IFxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cblxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciB0aXRsZSA9IHBhcmFtcyAmJiBwYXJhbXMucGFyYW1ldGVyMSA/IHBhcmFtcy5wYXJhbWV0ZXIxIDogXCJIb3cgdG8gVXNlIHRoZSBBdWRpbyBQYWRzXCJcbnZhciBib2R5ID0gcGFyYW1zICYmIHBhcmFtcy5wYXJhbWV0ZXIyID8gcGFyYW1zLnBhcmFtZXRlcjIgOiBcInN0YXJ0IHRoZSBuYXJyYXRpb25zIGFib3V0IHRoZSByb29tIHlvdSBhcmUgY3VycmVudGx5IGluXCJcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlci1zaWRlXCI+XG4gIDxicj5cbjwhLS08VGl0bGUgdi1iaW5kOm1zZz1cInRpdGxlXCIgLz4tLT5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZiBsYWJlbFRpdGxlIFwiPnt7IHRpdGxlIH19PC9kaXY+IFxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmXCI+e3sgYm9keSB9fTwvZGl2PiBcbjxicj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxuXG5sZXQgcGFyYW1zID0gaW5qZWN0KFwicGFyYW1zXCIpXG52YXIgdGl0bGUgPSBwYXJhbXMgJiYgcGFyYW1zLnBhcmFtZXRlcjEgPyBwYXJhbXMucGFyYW1ldGVyMSA6IFwiIFwiXG52YXIgYm9keSA9IHBhcmFtcyAmJiBwYXJhbXMucGFyYW1ldGVyMiA/IHBhcmFtcy5wYXJhbWV0ZXIyIDogXCIgXCJcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCJpbXBvcnQgQXBwIGZyb20gXCIuL0FwcC52dWVcIjtcbmltcG9ydCBIdWJzQXBwUHJvdG8gZnJvbSBcIi4uL0h1YnNBcHBcIjtcblxuY2xhc3MgSHVic0FwcCBleHRlbmRzIEh1YnNBcHBQcm90byB7XG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKEFwcCwgd2lkdGgsIGhlaWdodCwgcGFyYW1zKVxuICAgICAgLy8gIHRoaXMuaXNJbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgfVxufVxuXG52YXIgaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGFwcCA9IG5ldyBIdWJzQXBwKDYwMCwgNDc1LCBwYXJhbXMpXG4gICAgYXBwLm1vdW50KClcbiAgICByZXR1cm4gYXBwXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQiLCI8dGVtcGxhdGU+XG4gIDxkaXY+IFxuICA8ZGl2IGlkPVwicm9vbVwiIGNsYXNzPVwiZGFya3dhbGxcIj5cbiAgPGRpdiBjbGFzcz1cInNwYWNlci1zaWRlXCI+XG4gIDxicj5cbjwhLS08VGl0bGUgdi1iaW5kOm1zZz1cInRpdGxlXCIgLz4tLT5cblx0PGRpdiBjbGFzcz1cInNxdWFyZW9mZiBsYWJlbExnVGl0bGUgXCI+e3sgdGl0bGUgfX08L2Rpdj4gXG5cdDxkaXYgY2xhc3M9XCJzcXVhcmVvZmYgbGFiZWxMZ0JvZHlcIj57eyBib2R5IH19PC9kaXY+IFxuPGJyPlxuICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDwvZGl2PiBcbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5cblxuaW1wb3J0IFRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQ2VudGVyVGl0bGUudnVlJ1xuXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvdG9wLmNzc1wiXG5pbXBvcnQgXCIuLi8uLi9hc3NldHMvcm9vbS5jc3NcIlxuXG5cbmxldCBwYXJhbXMgPSBpbmplY3QoXCJwYXJhbXNcIilcbnZhciB0aXRsZSA9IHBhcmFtcyAmJiBwYXJhbXMucGFyYW1ldGVyMSA/IHBhcmFtcy5wYXJhbWV0ZXIxIDogXCIgXCJcbnZhciBib2R5ID0gcGFyYW1zICYmIHBhcmFtcy5wYXJhbWV0ZXIyID8gcGFyYW1zLnBhcmFtZXRlcjIgOiBcIiBcIlxuXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsImltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IEh1YnNBcHBQcm90byBmcm9tIFwiLi4vSHVic0FwcFwiO1xuXG5jbGFzcyBIdWJzQXBwIGV4dGVuZHMgSHVic0FwcFByb3RvIHtcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHBhcmFtczogYW55ID0ge30pIHtcbiAgICAgICAgc3VwZXIoQXBwLCB3aWR0aCwgaGVpZ2h0LCBwYXJhbXMpXG4gICAgICAvLyAgdGhpcy5pc0ludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG59XG5cbnZhciBpbml0ID0gZnVuY3Rpb24gKHBhcmFtczogYW55ID0ge30pIHtcbiAgICBsZXQgYXBwID0gbmV3IEh1YnNBcHAoNjAwLCA0NzUsIHBhcmFtcylcbiAgICBhcHAubW91bnQoKVxuICAgIHJldHVybiBhcHBcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdCIsIjx0ZW1wbGF0ZT5cbiAgPGRpdj4gXG4gIDxkaXYgaWQ9XCJyb29tXCIgY2xhc3M9XCJkYXJrd2FsbFwiPlxuICA8ZGl2IGNsYXNzPVwic3BhY2VyLXNpZGVcIj5cbiAgPGJyPlxuPCEtLTxUaXRsZSB2LWJpbmQ6bXNnPVwidGl0bGVcIiAvPi0tPlxuXHQ8ZGl2IGNsYXNzPVwic3F1YXJlb2ZmIHRpdGxlU3R5bGUgXCI+e3sgdGl0bGUgfX08L2Rpdj4gXG4gIDxicj5cbiAgPC9kaXY+XG4gIDwvZGl2PlxuICA8L2Rpdj4gXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5cbmltcG9ydCBUaXRsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NlbnRlclRpdGxlLnZ1ZSdcblxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3RvcC5jc3NcIlxuaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Jvb20uY3NzXCJcblxuXG5sZXQgcGFyYW1zID0gaW5qZWN0KFwicGFyYW1zXCIpXG52YXIgdGl0bGUgPSBwYXJhbXMgJiYgcGFyYW1zLnBhcmFtZXRlcjEgPyBwYXJhbXMucGFyYW1ldGVyMSA6IFwiIFwiXG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHAudnVlXCI7XG5pbXBvcnQgSHVic0FwcFByb3RvIGZyb20gXCIuLi9IdWJzQXBwXCI7XG5cbmNsYXNzIEh1YnNBcHAgZXh0ZW5kcyBIdWJzQXBwUHJvdG8ge1xuICAgIGNvbnN0cnVjdG9yICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgcGFyYW1zOiBhbnkgPSB7fSkge1xuICAgICAgICBzdXBlcihBcHAsIHdpZHRoLCBoZWlnaHQsIHBhcmFtcylcbiAgICAgIC8vICB0aGlzLmlzSW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIH1cbn1cblxudmFyIGluaXQgPSBmdW5jdGlvbiAocGFyYW1zOiBhbnkgPSB7fSkge1xuICAgIGxldCBhcHAgPSBuZXcgSHVic0FwcCg2MDAsIDQ3NSwgcGFyYW1zKVxuICAgIGFwcC5tb3VudCgpXG4gICAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Il0sIm5hbWVzIjpbIkh1YnNBcHAiLCJldGhlcmVhbC5jcmVhdGVMYXlvdXRTeXN0ZW0iLCJXZWJMYXllcjNEIiwiU3RvcmUiLCJIdWJzQXBwUHJvdG8iLCJBcHAiLCJpbml0Il0sIm1hcHBpbmdzIjoiOztBQUFBLG1CQUFlOzs7Ozs7Ozs7QUNXZjs7Ozs7OztBQUZjO0FBS1o7QUFDRjtBQUNBLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSC9COzs7O0FBTGM7QUFNZCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFDO0FBQzdCLElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsbURBQWtEOzs7Ozs7Ozs7Ozs7O01DYjlFLE1BQU07SUFDdkIsYUFBYSxDQUFnQjtJQUM3QixhQUFhLENBQXlCO0lBRXRDLEtBQUssQ0FBUTtJQUNiLE1BQU0sQ0FBUTtJQUVkLE1BQU0sQ0FBSztJQUNYLE9BQU8sQ0FBcUM7SUFFNUMsWUFBYSxHQUFjLEVBQUUsS0FBYSxFQUFFLE1BQWMsRUFBRSxnQkFBb0IsRUFBRTtRQUM5RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBRXBCLElBQUksQ0FBQyxN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
