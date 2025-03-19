import { hasInjectionContext, getCurrentInstance, inject, ref, watchEffect, watch, unref, version, defineComponent, useSSRContext, createApp, useAttrs, computed, mergeProps, provide, toRef, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, shallowReactive, reactive, effectScope, h, isReadonly, isRef, isShallow, isReactive, toRaw, defineAsyncComponent, getCurrentScope, resolveComponent, withCtx } from 'vue';
import { k as hasProtocol, l as isScriptProtocol, m as joinURL, w as withQuery, n as sanitizeStatusCode, o as getContext, $ as $fetch, q as baseURL, r as createHooks, f as createError$1, v as isEqual, x as stringifyParsedURL, y as stringifyQuery, z as parseQuery, A as toRouteMatcher, B as createRouter, C as defu, D as withLeadingSlash, E as parseURL, F as encodeParam, G as encodePath } from '../_/nitro.mjs';
import { getActiveHead, CapoPlugin } from 'unhead';
import { defineHeadPlugin, composableNames } from '@unhead/shared';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderTeleport, ssrRenderClass, ssrRenderSuspense, ssrRenderVNode, ssrRenderStyle } from 'vue/server-renderer';
import { SwiperSlide, Swiper } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'mongoose';
import 'consola';
import 'consola/utils';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.15.4";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.push(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin);
  }
  for (const plugin of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  manifest_45route_45rule
];
function getRouteFromPath(fullPath) {
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = new URL(fullPath.toString(), "http://localhost");
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: fullPath
  };
}
const router_CaKIoANnI2 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      "error": []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false) ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const currentRoute = computed(() => route);
    const router = {
      currentRoute,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => (void 0).history.go(-1),
      go: (delta) => (void 0).history.go(delta),
      forward: () => (void 0).history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", defineComponent({
      functional: true,
      props: {
        to: {
          type: String,
          required: true
        },
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    }));
    nuxtApp._route = route;
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const initialLayout = nuxtApp.payload.state._layout;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        var _a;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          {
            const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
            if (routeRules.appMiddleware) {
              for (const key in routeRules.appMiddleware) {
                const guard = nuxtApp._middleware.named[key];
                if (!guard) {
                  return;
                }
                if (routeRules.appMiddleware[key]) {
                  middlewareEntries.add(guard);
                } else {
                  middlewareEntries.delete(guard);
                }
              }
            }
          }
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`,
                  data: {
                    path: initialURL
                  }
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_KgADcZ0jPj,
  router_CaKIoANnI2,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY
];
async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry2 of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry2.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        const alias = ctx.options.alias[base];
        if (alias) {
          input = joinURL(alias, input.slice(base.length));
        }
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL: baseURL2 } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL2) {
    baseURL2 = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL2, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$FGoMIv27q2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  supportsAlias,
  validateDomains
}, Symbol.toStringTag, { value: "Module" }));
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipx",
  "domains": [],
  "alias": {},
  "densities": [
    1,
    2
  ],
  "format": [
    "webp"
  ]
};
imageOptions.providers = {
  ["ipx"]: { provider: ipxRuntime$FGoMIv27q2, defaults: {} }
};
const useImage = () => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    },
    runtimeConfig: config
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, required: false },
  // modifiers
  format: { type: String, required: false },
  quality: { type: [Number, String], required: false },
  background: { type: String, required: false },
  fit: { type: String, required: false },
  modifiers: { type: Object, required: false },
  // options
  preset: { type: String, required: false },
  provider: { type: String, required: false },
  sizes: { type: [Object, String], required: false },
  densities: { type: String, required: false },
  preload: {
    type: [Boolean, Object],
    required: false
  },
  // <img> attributes
  width: { type: [String, Number], required: false },
  height: { type: [String, Number], required: false },
  alt: { type: String, required: false },
  referrerpolicy: { type: String, required: false },
  usemap: { type: String, required: false },
  longdesc: { type: String, required: false },
  ismap: { type: Boolean, required: false },
  loading: {
    type: String,
    required: false,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    required: false,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    required: false,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], required: false }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], required: false },
  placeholderClass: { type: String, required: false },
  custom: { type: Boolean, required: false }
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "NuxtImg",
  __ssrInlineRender: true,
  props: imgProps,
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const isServer = true;
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const imgEl = ref();
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const imgAttrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return (_ctx, _push, _parent, _attrs) => {
      if (!_ctx.custom) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          ref_key: "imgEl",
          ref: imgEl,
          class: props.placeholder && !placeholderLoaded.value ? props.placeholderClass : void 0
        }, {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          ...imgAttrs.value,
          ...unref(attrs)
        }, { src: src.value }, _attrs))}>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          imgAttrs: {
            ...imgAttrs.value,
            ...unref(attrs)
          },
          isLoaded: placeholderLoaded.value,
          src: src.value
        }, null, _push, _parent);
      }
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Banner1",
  __ssrInlineRender: true,
  setup(__props) {
    (/* @__PURE__ */ new Date("2025-03-27T14:30:00")).getTime();
    const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-full",
        src: "/images/backgorund/flower.png",
        alt: "Switching Image"
      }, null, _parent));
      _push(`<div class="absolute p-4 sm:p-7 md:p-14 lg:p-20 w-[80%] text-center z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg"><h2 class="text-3xl font-bold text-gray-800 animate-fadeIn animate-fadeIn"> Tho ❤️ Hong </h2><p class="text-lg text-gray-600">We&#39;re Getting Married!</p><p class="mt-4 text-xl font-semibold text-red-500 animate-bounce"> March 27, 2025 </p><div class="mt-3 md:mt-4 lg:mt-6 flex justify-center space-x-4 text-gray-800"><div class="flex flex-col items-center"><span class="text-sm lg:text-3xl font-bold">${ssrInterpolate(unref(countdown).days)}</span><span class="text-sm">Ngày</span></div><div class="flex flex-col items-center"><span class="text-sm lg:text-3xl font-bold">${ssrInterpolate(unref(countdown).hours)}</span><span class="text-sm">Giờ</span></div><div class="flex flex-col items-center"><span class="text-sm lg:text-3xl font-bold">${ssrInterpolate(unref(countdown).minutes)}</span><span class="text-sm">Phút</span></div><div class="flex flex-col items-center"><span class="text-sm lg:text-3xl font-bold">${ssrInterpolate(unref(countdown).seconds)}</span><span class="text-sm">Giây</span></div></div><div class="mt-3 md:mt-4 lg:mt-6 text-pink-500 animate-pulse">💍 Save the Date 💍</div></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Banner1.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ImageModal",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false },
    imageUrl: { default: "" },
    maxWidth: { default: "max-w-4xl" }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$9;
      ssrRenderTeleport(_push, (_push2) => {
        if (_ctx.show) {
          _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-a6a95566><button class="absolute top-2 right-2 text-white text-3xl cursor-pointer" data-v-a6a95566> × </button><div class="${ssrRenderClass(["relative w-full p-4", _ctx.maxWidth])}" data-v-a6a95566>`);
          _push2(ssrRenderComponent(_component_NuxtImg, {
            src: _ctx.imageUrl,
            alt: "Full Image",
            class: "w-full h-auto rounded-lg shadow-lg"
          }, null, _parent));
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-a6a95566"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Banner2",
  __ssrInlineRender: true,
  setup(__props) {
    const isModalOpen = ref(false);
    const imageUrl = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$9;
      const _component_ImageModal = __nuxt_component_4;
      _push(`<!--[--><div class="relative bg-center w-full p-2" data-v-fa2013ea><div class="title text-center text-4xl z-10" data-v-fa2013ea> Chú Rể    &amp;    Cô Dâu </div><div class="grid grid-cols-2 gap-x-6 z-10" data-v-fa2013ea><div class="flex flex-col" data-v-fa2013ea><div class="rounded-xl md:rounded-2xl overflow-hidden" data-v-fa2013ea>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/bo-khung/15x21/DSC08983.jpg",
        alt: "Bride",
        class: "transition-transform duration-300 hover:scale-110 cursor-pointer",
        fit: "cover",
        width: "700",
        quality: "70",
        onClick: ($event) => {
          isModalOpen.value = true;
          imageUrl.value = "/images/bo-khung/15x21/DSC08983.jpg";
        }
      }, null, _parent));
      _push(`</div><div class="card mt-4" data-v-fa2013ea><div class="text-xl name mb-3" data-v-fa2013ea>Nguyễn Viết Thọ</div><div class="parents" data-v-fa2013ea> Con ông : <span class="highlight font-semisemi" data-v-fa2013ea>Nguyễn Viết Vượng</span></div><div class="parents" data-v-fa2013ea> Con bà : <span class="highlight font-semisemi" data-v-fa2013ea>Hoàng Thị Kim Cúc</span></div></div></div><div class="flex flex-col" data-v-fa2013ea><div class="rounded-xl md:rounded-2xl overflow-hidden" data-v-fa2013ea>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/anh-phong/DSC09391.jpg",
        alt: "Groom",
        class: "transition-transform duration-300 hover:scale-105 cursor-pointer",
        fit: "cover",
        width: "700",
        quality: "70",
        onClick: ($event) => {
          isModalOpen.value = true;
          imageUrl.value = "/images/anh-phong/DSC09391.jpg";
        }
      }, null, _parent));
      _push(`</div><div class="card mt-4" data-v-fa2013ea><div class="text-xl name mb-3" data-v-fa2013ea>Tưởng Thị Hồng</div><div class="parents" data-v-fa2013ea> Con ông : <span class="highlight font-semisemi" data-v-fa2013ea>Tưởng Duy Huề</span></div><div class="parents" data-v-fa2013ea> Con bà : <span class="highlight font-semisemi" data-v-fa2013ea>Đỗ Thị Tươi</span></div></div></div></div><div class="absolute z-0 pt-0 pl-0" data-v-fa2013ea></div></div>`);
      _push(ssrRenderComponent(_component_ImageModal, {
        show: unref(isModalOpen),
        imageUrl: unref(imageUrl),
        onClose: ($event) => isModalOpen.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Banner2.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-fa2013ea"]]);
const _sfc_main$5 = {
  components: {
    Swiper,
    SwiperSlide
  },
  emits: ["sendIndex"],
  setup({ emits }) {
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    const click = (index) => {
      console.log("index: ", index);
      emits("sendIndex", index);
    };
    return {
      thumbsSwiper,
      setThumbsSwiper,
      modules: [FreeMode, Navigation, Thumbs, Autoplay],
      click
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_swiper = resolveComponent("swiper");
  const _component_swiper_slide = resolveComponent("swiper-slide");
  const _component_NuxtImg = _sfc_main$9;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_swiper, {
    style: {
      "--swiper-navigation-color": "#fff",
      "--swiper-pagination-color": "#fff"
    },
    loop: true,
    spaceBetween: 10,
    autoplay: { delay: 1e3, pauseOnMouseEnter: true },
    navigation: true,
    thumbs: { swiper: $setup.thumbsSwiper },
    modules: $setup.modules
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/anh-ban/DSC08697.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(0)
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover",
                  src: "/images/anh-ban/DSC08697.jpg",
                  fit: "cover",
                  width: "700",
                  quality: "70",
                  onClick: ($event) => $setup.click(0)
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/anh-phong/DSC08964.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(1)
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover",
                  src: "/images/anh-phong/DSC08964.jpg",
                  fit: "cover",
                  width: "700",
                  quality: "70",
                  onClick: ($event) => $setup.click(1)
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/15x21/DSC09003.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(2)
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover",
                  src: "/images/bo-khung/15x21/DSC09003.jpg",
                  fit: "cover",
                  width: "700",
                  quality: "70",
                  onClick: ($event) => $setup.click(2)
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/15x21/DSC09477.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(3)
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover",
                  src: "/images/bo-khung/15x21/DSC09477.jpg",
                  fit: "cover",
                  width: "700",
                  quality: "70",
                  onClick: ($event) => $setup.click(3)
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/20x30/DSC08666.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(4)
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover",
                  src: "/images/bo-khung/20x30/DSC08666.jpg",
                  fit: "cover",
                  width: "700",
                  quality: "70",
                  onClick: ($event) => $setup.click(4)
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/25x25/DSC08764.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(5)
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover",
                  src: "/images/bo-khung/25x25/DSC08764.jpg",
                  fit: "cover",
                  width: "700",
                  quality: "70",
                  onClick: ($event) => $setup.click(5)
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/anh-ban/DSC08697.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(0)
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/anh-phong/DSC08964.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(1)
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/15x21/DSC09003.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(2)
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/15x21/DSC09477.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(3)
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/20x30/DSC08666.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(4)
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/25x25/DSC08764.jpg",
                fit: "cover",
                width: "700",
                quality: "70",
                onClick: ($event) => $setup.click(5)
              }, null, 8, ["onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_swiper, {
    onSwiper: $setup.setThumbsSwiper,
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    modules: $setup.modules,
    class: "mt-2"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/anh-ban/DSC08697.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(0),
                quality: "70"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover cursor-pointer",
                  src: "/images/anh-ban/DSC08697.jpg",
                  fit: "cover",
                  width: "700",
                  onClick: ($event) => $setup.click(0),
                  quality: "70"
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/anh-phong/DSC08964.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(1),
                quality: "70"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover cursor-pointer",
                  src: "/images/anh-phong/DSC08964.jpg",
                  fit: "cover",
                  width: "700",
                  onClick: ($event) => $setup.click(1),
                  quality: "70"
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/bo-khung/15x21/DSC09003.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(2),
                quality: "70"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover cursor-pointer",
                  src: "/images/bo-khung/15x21/DSC09003.jpg",
                  fit: "cover",
                  width: "700",
                  onClick: ($event) => $setup.click(2),
                  quality: "70"
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/15x21/DSC09477.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(3),
                quality: "70"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover",
                  src: "/images/bo-khung/15x21/DSC09477.jpg",
                  fit: "cover",
                  width: "700",
                  onClick: ($event) => $setup.click(3),
                  quality: "70"
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/bo-khung/20x30/DSC08666.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(4),
                quality: "70"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover cursor-pointer",
                  src: "/images/bo-khung/20x30/DSC08666.jpg",
                  fit: "cover",
                  width: "700",
                  onClick: ($event) => $setup.click(4),
                  quality: "70"
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_swiper_slide, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/bo-khung/25x25/DSC08764.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(5),
                quality: "70"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  class: "w-full h-full object-cover cursor-pointer",
                  src: "/images/bo-khung/25x25/DSC08764.jpg",
                  fit: "cover",
                  width: "700",
                  onClick: ($event) => $setup.click(5),
                  quality: "70"
                }, null, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/anh-ban/DSC08697.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(0),
                quality: "70"
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/anh-phong/DSC08964.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(1),
                quality: "70"
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/bo-khung/15x21/DSC09003.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(2),
                quality: "70"
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover",
                src: "/images/bo-khung/15x21/DSC09477.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(3),
                quality: "70"
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/bo-khung/20x30/DSC08666.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(4),
                quality: "70"
              }, null, 8, ["onClick"])
            ]),
            _: 1
          }),
          createVNode(_component_swiper_slide, null, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                class: "w-full h-full object-cover cursor-pointer",
                src: "/images/bo-khung/25x25/DSC08764.jpg",
                fit: "cover",
                width: "700",
                onClick: ($event) => $setup.click(5),
                quality: "70"
              }, null, 8, ["onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Slider.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "QRModalTho",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    watch(
      () => props.show,
      (value) => {
        if (value) {
          (void 0).body.style.overflow = "hidden";
        } else {
          (void 0).body.style.overflow = "auto";
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$9;
      ssrRenderTeleport(_push, (_push2) => {
        if (_ctx.show) {
          _push2(`<div class="fixed top-0 w-full h-full bg-black opacity-50 z-40" data-v-b9794afe></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.show) {
          _push2(`<div class="fixed top-0 w-full h-full flex items-center justify-center z-50" data-v-b9794afe><div class="relative w-full p-4 max-w-2xl bg-white" data-v-b9794afe>`);
          _push2(ssrRenderComponent(_component_NuxtImg, {
            src: "/images/QRCode/QRCodeTho.png",
            alt: "QR Code Tho",
            class: "w-full h-auto rounded-lg shadow-lg"
          }, null, _parent));
          _push2(`</div><button class="absolute top-3 right-6 text-white text-5xl cursor-pointer" data-v-b9794afe> × </button></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QRModalTho.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-b9794afe"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "QRModalHong",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    watch(
      () => props.show,
      (value) => {
        if (value) {
          (void 0).body.style.overflow = "hidden";
        } else {
          (void 0).body.style.overflow = "auto";
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$9;
      ssrRenderTeleport(_push, (_push2) => {
        if (_ctx.show) {
          _push2(`<div class="fixed top-0 w-full h-full bg-black opacity-50 z-40" data-v-7c0bfe72></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.show) {
          _push2(`<div class="fixed top-0 w-full h-full flex items-center justify-center z-50" data-v-7c0bfe72><div class="relative w-full p-4 max-w-2xl bg-white" data-v-7c0bfe72>`);
          _push2(ssrRenderComponent(_component_NuxtImg, {
            src: "/images/QRCode/QRCodeHong.png",
            alt: "QR Code Tho",
            class: "w-full h-auto rounded-lg shadow-lg"
          }, null, _parent));
          _push2(`</div><button class="absolute top-3 right-6 text-white text-5xl cursor-pointer" data-v-7c0bfe72> × </button></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QRModalHong.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7c0bfe72"]]);
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const isShowQRTho = ref(false);
    const isShowQRHong = ref(false);
    const isModalOpen = ref(false);
    const imageUrl = ref("");
    const isModalOpen11 = ref(false);
    const imageUrl1 = ref("");
    ref(0);
    ref(false);
    const getIndex = (index) => {
      console.log({
        index
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$9;
      const _component_Banner1 = _sfc_main$8;
      const _component_Banner2 = __nuxt_component_2;
      const _component_Slider = __nuxt_component_3;
      const _component_ImageModal = __nuxt_component_4;
      const _component_QRModalTho = __nuxt_component_5;
      const _component_QRModalHong = __nuxt_component_6;
      _push(`<!--[--><div class="container max-w-[650px] mx-auto px-4 bg-gradient-to-b pb-10 from-[#FDFBFB] to-[#F2F2F2]" data-v-4969482b><div class="flex justify-center bg-gradient-to-b from-[#FDFBFB] to-[#F2F2F2] w-full pt-12 mt-4" data-v-4969482b><div class="transform transition-all duration-500 hover:scale-105" data-v-4969482b><h2 style="${ssrRenderStyle({ "font-family": "Tinos, serif" })}" data-v-4969482b>THÂN MỜI TỚI DỰ BỮA TIỆC</h2><div class="title text-4xl text-center mt-6 mb-10" data-v-4969482b> Viết Thọ <br data-v-4969482b> &amp; <br data-v-4969482b> Tưởng Hồng </div></div></div><div class="mt-4" data-v-4969482b>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "rounded-xl md:rounded-2xl cursor-pointer",
        src: "/images/anh-phong/DSC09391.jpg",
        alt: "Switching Image",
        fit: "cover",
        width: "700",
        quality: "70",
        onClick: ($event) => {
          isModalOpen.value = true;
          imageUrl.value = "/images/anh-phong/DSC09391.jpg";
        }
      }, null, _parent));
      _push(`</div><div class="mt-4" data-v-4969482b>`);
      _push(ssrRenderComponent(_component_Banner1, null, null, _parent));
      _push(`</div><div class="mt-4 relative" data-v-4969482b>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "absolute scale-x-[-1] opacity-25 h-full",
        src: "/images/backgorund/flower.png"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Banner2, null, null, _parent));
      _push(`</div><div class="mt-4" data-v-4969482b><div class="rounded-xl md:rounded-2xl overflow-hidden" data-v-4969482b>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/bo-khung/15x21/DSC09457.jpg",
        class: "transition-transform duration-300 hover:scale-115 cursor-pointer",
        alt: "Switching Image",
        fit: "cover",
        width: "700",
        quality: "70",
        onClick: ($event) => {
          isModalOpen11.value = true;
          imageUrl1.value = "/images/bo-khung/15x21/DSC09457.jpg";
        }
      }, null, _parent));
      _push(`</div></div><div class="relative mt-4 bg-fuchsia-50" data-v-4969482b>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "absolute z-10 w-30 -left-3 scale-x-[-1] opacity-75",
        src: "/images/backgorund/small-flower.png"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "absolute -right-3 z-10 w-30 opacity-75",
        src: "/images/backgorund/small-flower.png"
      }, null, _parent));
      _push(`<div class="text-center text-2xl mb-6 py-3 title1 font-semibold text-neutral-600" data-v-4969482b> OUR MEMORY </div>`);
      _push(ssrRenderComponent(_component_Slider, { onSendIndex: getIndex }, null, _parent));
      _push(`</div><div class="mt-4" data-v-4969482b><div class="text-center mb-3 text-3xl title3" data-v-4969482b>Bữa Cơm Thân Mật</div><div class="grid grid-cols-2 gap-4" data-v-4969482b>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/thiep-moi/nhatrai.PNG",
        class: "cursor-pointer w-full",
        alt: "Switching Image",
        fit: "cover",
        width: "700",
        quality: "70",
        onClick: ($event) => {
          isModalOpen.value = true;
          imageUrl.value = "/images/thiep-moi/nhatrai.PNG";
        }
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/thiep-moi/nhagai.PNG",
        class: "cursor-pointer w-full",
        alt: "Switching Image",
        fit: "cover",
        width: "700",
        quality: "70",
        onClick: ($event) => {
          isModalOpen.value = true;
          imageUrl.value = "/images/thiep-moi/nhatrai.PNG";
        }
      }, null, _parent));
      _push(`</div></div><div class="mt-4" data-v-4969482b>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/thiep-moi/honle.PNG",
        class: "cursor-pointer w-full",
        alt: "Switching Image",
        onClick: ($event) => {
          isModalOpen.value = true;
          imageUrl.value = "/images/thiep-moi/honle.PNG";
        }
      }, null, _parent));
      _push(`</div><div class="mt-6" data-v-4969482b><h1 class="text-center text-3xl font-semibold mb-2 title4" data-v-4969482b>CHÚC PHÚC</h1><p class="text-xl text-center title5" data-v-4969482b> Cảm ơn tất cả tình cảm của cô dì chú bác, bạn bè và anh chị em đã dành cho Thọ &amp; Hồng </p><div class="grid grid-cols-2 gap-14 mt-4" data-v-4969482b><div class="text-center" data-v-4969482b>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/tho1.png",
        alt: "Bride",
        fit: "cover",
        class: "rounded-full border-4"
      }, null, _parent));
      _push(`<div class="mt-3 text-2xl title3" data-v-4969482b>Chú Rể</div><div class="mt-3 text-2xl title" data-v-4969482b>Viết Thọ</div><button class="py-3 px-10 border-2 rounded-lg mt-4 cursor-pointer lg:text-xl mung-cuoi" data-v-4969482b> Mừng Cưới </button></div><div class="text-center" data-v-4969482b>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/images/hong1.png",
        alt: "Bride",
        fit: "cover",
        class: "rounded-full border-4"
      }, null, _parent));
      _push(`<div class="mt-3 text-2xl title3" data-v-4969482b>Cô dâu</div><div class="mt-3 text-2xl title" data-v-4969482b>Tưởng Hồng</div><button class="py-3 px-10 border-2 rounded-lg mt-4 cursor-pointer lg:text-xl mung-cuoi" data-v-4969482b> Mừng Cưới </button></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-2" data-v-4969482b><div data-v-4969482b><div class="my-2 text-center font-semibold text-xl" data-v-4969482b>Nhà trai</div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1861.8430705475084!2d105.70073323902878!3d21.04524069845134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134550005e73f09%3A0xfe98e01b15bdb25a!2zTmjDoCB2xINuIGjDs2EgdGjDtG4gxJDhu5NuZw!5e0!3m2!1sen!2sus!4v1742219042523!5m2!1sen!2sus" height="450" style="${ssrRenderStyle({ "border": "0" })}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-full lg:w-auto" data-v-4969482b></iframe></div><div data-v-4969482b><div class="my-2 text-center font-semibold text-xl" data-v-4969482b>Nhà gái</div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233.2298897346993!2d105.79250499269386!3d20.723286702157722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135cbf505967113%3A0x89ad1fee9ae5da3f!2zVOG6oXAgSG_DoSDEkGnhu4NtIFbEg24gw5RuZw!5e0!3m2!1sen!2sus!4v1742219594399!5m2!1sen!2sus" height="450" style="${ssrRenderStyle({ "border": "0" })}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-full lg:w-auto" data-v-4969482b></iframe></div></div></div>`);
      _push(ssrRenderComponent(_component_ImageModal, {
        show: unref(isModalOpen),
        imageUrl: unref(imageUrl),
        onClose: ($event) => isModalOpen.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_ImageModal, {
        show: unref(isModalOpen11),
        imageUrl: unref(imageUrl1),
        onClose: ($event) => isModalOpen11.value = false,
        maxWidth: "max-w-7xl"
      }, null, _parent));
      _push(ssrRenderComponent(_component_QRModalTho, {
        show: unref(isShowQRTho),
        onClose: ($event) => isShowQRTho.value = false
      }, null, _parent));
      _push(ssrRenderComponent(_component_QRModalHong, {
        show: unref(isShowQRHong),
        onClose: ($event) => isShowQRHong.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4969482b"]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-Crus3iXa.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-cmfXfB-z.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { _export_sfc as _, useNuxtApp as a, useRuntimeConfig as b, nuxtLinkDefaults as c, useHead as d, entry$1 as default, navigateTo as n, resolveRouteObject as r, useRouter as u };
//# sourceMappingURL=server.mjs.map
