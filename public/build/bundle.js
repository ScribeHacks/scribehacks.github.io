
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.31.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/Navbar.svelte generated by Svelte v3.31.2 */
    const file = "src/components/Navbar.svelte";

    // (19:2) {#if !isCollapsed}
    function create_if_block(ctx) {
    	let div;
    	let a0;
    	let t1;
    	let a1;
    	let t3;
    	let a2;
    	let t5;
    	let a3;
    	let t7;
    	let a4;
    	let t9;
    	let a5;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a0 = element("a");
    			a0.textContent = "About";
    			t1 = space();
    			a1 = element("a");
    			a1.textContent = "FAQ";
    			t3 = space();
    			a2 = element("a");
    			a2.textContent = "Schedule";
    			t5 = space();
    			a3 = element("a");
    			a3.textContent = "Map";
    			t7 = space();
    			a4 = element("a");
    			a4.textContent = "Team";
    			t9 = space();
    			a5 = element("a");
    			a5.textContent = "Contact";
    			attr_dev(a0, "class", "nav-link svelte-14ewlvb");
    			attr_dev(a0, "href", "#about");
    			add_location(a0, file, 20, 6, 427);
    			attr_dev(a1, "class", "nav-link svelte-14ewlvb");
    			attr_dev(a1, "href", "#faq");
    			add_location(a1, file, 21, 6, 477);
    			attr_dev(a2, "class", "nav-link svelte-14ewlvb");
    			attr_dev(a2, "href", "#schedule");
    			add_location(a2, file, 22, 6, 523);
    			attr_dev(a3, "class", "nav-link svelte-14ewlvb");
    			attr_dev(a3, "href", "#venue");
    			add_location(a3, file, 23, 6, 579);
    			attr_dev(a4, "class", "nav-link svelte-14ewlvb");
    			attr_dev(a4, "href", "#team");
    			add_location(a4, file, 24, 6, 627);
    			attr_dev(a5, "class", "nav-link svelte-14ewlvb");
    			attr_dev(a5, "href", "#contact");
    			add_location(a5, file, 25, 6, 675);
    			attr_dev(div, "class", "collapsable svelte-14ewlvb");
    			add_location(div, file, 19, 4, 395);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a0);
    			append_dev(div, t1);
    			append_dev(div, a1);
    			append_dev(div, t3);
    			append_dev(div, a2);
    			append_dev(div, t5);
    			append_dev(div, a3);
    			append_dev(div, t7);
    			append_dev(div, a4);
    			append_dev(div, t9);
    			append_dev(div, a5);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(19:2) {#if !isCollapsed}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let nav;
    	let t0;
    	let button;
    	let mounted;
    	let dispose;
    	let if_block = !/*isCollapsed*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			if (if_block) if_block.c();
    			t0 = space();
    			button = element("button");
    			button.textContent = "☰";
    			attr_dev(button, "class", "menu-control svelte-14ewlvb");
    			attr_dev(button, "aria-label", "Toggle Menu");
    			add_location(button, file, 28, 2, 744);
    			attr_dev(nav, "class", "nav svelte-14ewlvb");
    			add_location(nav, file, 17, 0, 352);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			if (if_block) if_block.m(nav, null);
    			append_dev(nav, t0);
    			append_dev(nav, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*toggleCollapsed*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!/*isCollapsed*/ ctx[0]) {
    				if (if_block) ; else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(nav, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Navbar", slots, []);
    	let isCollapsed = false;

    	function toggleCollapsed() {
    		$$invalidate(0, isCollapsed = !isCollapsed);
    	}

    	onMount(() => {
    		window.addEventListener("resize", handleResize);
    	});

    	function handleResize() {
    		if (window.innerWidth > 768) $$invalidate(0, isCollapsed = false); else $$invalidate(0, isCollapsed = true);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		isCollapsed,
    		toggleCollapsed,
    		handleResize
    	});

    	$$self.$inject_state = $$props => {
    		if ("isCollapsed" in $$props) $$invalidate(0, isCollapsed = $$props.isCollapsed);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isCollapsed, toggleCollapsed];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/sections/Hero.svelte generated by Svelte v3.31.2 */

    const file$1 = "src/sections/Hero.svelte";

    function create_fragment$1(ctx) {
    	let section;
    	let div3;
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let h1;
    	let t2;
    	let p;
    	let span0;
    	let t4;
    	let span1;
    	let t6;
    	let span2;
    	let t8;
    	let br0;
    	let t9;
    	let button;
    	let t11;
    	let br1;
    	let t12;
    	let div1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "ScribeHacks I";
    			t2 = space();
    			p = element("p");
    			span0 = element("span");
    			span0.textContent = "California Bay Area";
    			t4 = space();
    			span1 = element("span");
    			span1.textContent = "September 18-19";
    			t6 = space();
    			span2 = element("span");
    			span2.textContent = "Registrations Open";
    			t8 = space();
    			br0 = element("br");
    			t9 = space();
    			button = element("button");
    			button.textContent = "Register Here!";
    			t11 = space();
    			br1 = element("br");
    			t12 = space();
    			div1 = element("div");
    			if (img.src !== (img_src_value = "img/scribehacks/logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "ScribeHacks Logo");
    			attr_dev(img, "class", "svelte-wx6lx4");
    			add_location(img, file$1, 32, 8, 1126);
    			attr_dev(h1, "class", "fadeInDown svelte-wx6lx4");
    			add_location(h1, file$1, 33, 8, 1196);
    			attr_dev(div0, "class", "title svelte-wx6lx4");
    			add_location(div0, file$1, 31, 6, 1098);
    			attr_dev(span0, "class", "subtitle svelte-wx6lx4");
    			add_location(span0, file$1, 37, 8, 1289);
    			attr_dev(span1, "class", "subtitle svelte-wx6lx4");
    			add_location(span1, file$1, 38, 8, 1347);
    			attr_dev(span2, "class", "subtitle svelte-wx6lx4");
    			add_location(span2, file$1, 39, 8, 1401);
    			attr_dev(p, "class", "info-group svelte-wx6lx4");
    			add_location(p, file$1, 36, 6, 1258);
    			add_location(br0, file$1, 41, 6, 1467);
    			attr_dev(button, "id", "register-cta");
    			attr_dev(button, "class", "button svelte-wx6lx4");
    			add_location(button, file$1, 42, 6, 1480);
    			add_location(br1, file$1, 45, 6, 1587);
    			attr_dev(div1, "id", "formArea");
    			attr_dev(div1, "class", "svelte-wx6lx4");
    			add_location(div1, file$1, 46, 6, 1600);
    			add_location(div2, file$1, 30, 4, 1086);
    			attr_dev(div3, "class", "hero svelte-wx6lx4");
    			add_location(div3, file$1, 29, 2, 1063);
    			attr_dev(section, "class", "section svelte-wx6lx4");
    			add_location(section, file$1, 28, 0, 1035);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div0, t0);
    			append_dev(div0, h1);
    			append_dev(div2, t2);
    			append_dev(div2, p);
    			append_dev(p, span0);
    			append_dev(p, t4);
    			append_dev(p, span1);
    			append_dev(p, t6);
    			append_dev(p, span2);
    			append_dev(div2, t8);
    			append_dev(div2, br0);
    			append_dev(div2, t9);
    			append_dev(div2, button);
    			append_dev(div2, t11);
    			append_dev(div2, br1);
    			append_dev(div2, t12);
    			append_dev(div2, div1);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", register, false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function register() {
    	const formArea = document.getElementById("formArea");

    	var tripetto = TripettoServices.init({
    		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic1oxMlNZU3BiM1JQcHE0d3QxMlovdUk5ZVZUaDVjTUR1SDVtNU1JSUwxZz0iLCJkZWZpbml0aW9uIjoicEJqMlJNZHJpeE9qWkRJeDlvanYwK3FWSTl2N0dFcDV5K09qU05tM2YwOD0iLCJ0eXBlIjoiY29sbGVjdCJ9._RGSXj3FB2-5cc2xZqUJXyaMCfrFbdFJc4Ns4MFZZhc"
    	});

    	if (formArea.style.display == "none") {
    		formArea.style.display = "unset";

    		TripettoAutoscroll.run({
    			element: document.getElementById("formArea"),
    			definition: tripetto.definition,
    			styles: tripetto.styles,
    			l10n: tripetto.l10n,
    			locale: tripetto.locale,
    			translations: tripetto.translations,
    			attachments: tripetto.attachments,
    			onSubmit: tripetto.onSubmit,
    			snapshot: tripetto.snapshot,
    			onPause: tripetto.onPause,
    			persistent: true
    		});
    	} else {
    		formArea.style.display = "none";
    	}
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Hero", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Hero> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ register });
    	return [];
    }

    class Hero extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hero",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/sections/About.svelte generated by Svelte v3.31.2 */

    const file$2 = "src/sections/About.svelte";

    function create_fragment$2(ctx) {
    	let a;
    	let section;
    	let div0;
    	let h2;
    	let t1;
    	let div1;
    	let p;
    	let b;
    	let br;
    	let t3;

    	const block = {
    		c: function create() {
    			a = element("a");
    			section = element("section");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Write the code of the future.";
    			t1 = space();
    			div1 = element("div");
    			p = element("p");
    			b = element("b");
    			b.textContent = "Coding gives us the power to make things.";
    			br = element("br");
    			t3 = text("\n    Every Facebook, Google, and Microsoft started with just a bit of code, so we want to encourage each person to learn to make something impactful or through technology.");
    			attr_dev(h2, "class", "svelte-523h4w");
    			add_location(h2, file$2, 4, 6, 85);
    			attr_dev(div0, "class", "section-left svelte-523h4w");
    			add_location(div0, file$2, 3, 2, 52);
    			add_location(b, file$2, 7, 7, 170);
    			add_location(br, file$2, 7, 55, 218);
    			attr_dev(p, "class", "svelte-523h4w");
    			add_location(p, file$2, 7, 4, 167);
    			attr_dev(div1, "class", "section-right svelte-523h4w");
    			add_location(div1, file$2, 6, 2, 135);
    			attr_dev(section, "class", "section about svelte-523h4w");
    			add_location(section, file$2, 2, 0, 18);
    			attr_dev(a, "name", "about");
    			add_location(a, file$2, 1, 0, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, section);
    			append_dev(section, div0);
    			append_dev(div0, h2);
    			append_dev(section, t1);
    			append_dev(section, div1);
    			append_dev(div1, p);
    			append_dev(p, b);
    			append_dev(p, br);
    			append_dev(p, t3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("About", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/FaqItem.svelte generated by Svelte v3.31.2 */

    const file$3 = "src/components/FaqItem.svelte";

    function create_fragment$3(ctx) {
    	let details;
    	let summary;
    	let span0;
    	let t0_value = /*faq*/ ctx[0].title + "";
    	let t0;
    	let t1;
    	let span1;
    	let t2;
    	let div;
    	let p;
    	let raw_value = /*faq*/ ctx[0].content + "";

    	const block = {
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			t2 = space();
    			div = element("div");
    			p = element("p");
    			attr_dev(span0, "class", "title");
    			add_location(span0, file$3, 7, 4, 83);
    			attr_dev(span1, "class", "icon svelte-qm8mxt");
    			attr_dev(span1, "aria-hidden", "true");
    			add_location(span1, file$3, 8, 4, 126);
    			attr_dev(summary, "class", "svelte-qm8mxt");
    			add_location(summary, file$3, 6, 2, 69);
    			add_location(p, file$3, 11, 4, 208);
    			attr_dev(div, "class", "content svelte-qm8mxt");
    			add_location(div, file$3, 10, 2, 182);
    			attr_dev(details, "class", "accordion svelte-qm8mxt");
    			add_location(details, file$3, 5, 0, 39);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(summary, span0);
    			append_dev(span0, t0);
    			append_dev(summary, t1);
    			append_dev(summary, span1);
    			append_dev(details, t2);
    			append_dev(details, div);
    			append_dev(div, p);
    			p.innerHTML = raw_value;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*faq*/ 1 && t0_value !== (t0_value = /*faq*/ ctx[0].title + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*faq*/ 1 && raw_value !== (raw_value = /*faq*/ ctx[0].content + "")) p.innerHTML = raw_value;		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(details);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("FaqItem", slots, []);
    	let { faq } = $$props;
    	const writable_props = ["faq"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FaqItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("faq" in $$props) $$invalidate(0, faq = $$props.faq);
    	};

    	$$self.$capture_state = () => ({ faq });

    	$$self.$inject_state = $$props => {
    		if ("faq" in $$props) $$invalidate(0, faq = $$props.faq);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [faq];
    }

    class FaqItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { faq: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FaqItem",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*faq*/ ctx[0] === undefined && !("faq" in props)) {
    			console.warn("<FaqItem> was created without expected prop 'faq'");
    		}
    	}

    	get faq() {
    		throw new Error("<FaqItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set faq(value) {
    		throw new Error("<FaqItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/sections/FAQ.svelte generated by Svelte v3.31.2 */
    const file$4 = "src/sections/FAQ.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (44:4) {#each faq as item}
    function create_each_block(ctx) {
    	let faqitem;
    	let current;

    	faqitem = new FaqItem({
    			props: { faq: /*item*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(faqitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(faqitem, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(faqitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(faqitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(faqitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(44:4) {#each faq as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let a;
    	let section;
    	let h2;
    	let t1;
    	let br;
    	let t2;
    	let div;
    	let current;
    	let each_value = /*faq*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			a = element("a");
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "Frequently Asked Questions";
    			t1 = space();
    			br = element("br");
    			t2 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "svelte-19egonz");
    			add_location(h2, file$4, 40, 2, 3174);
    			add_location(br, file$4, 41, 2, 3212);
    			attr_dev(div, "class", "faq svelte-19egonz");
    			add_location(div, file$4, 42, 2, 3221);
    			attr_dev(section, "class", "section svelte-19egonz");
    			add_location(section, file$4, 39, 0, 3146);
    			attr_dev(a, "name", "faq");
    			add_location(a, file$4, 38, 0, 3131);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, section);
    			append_dev(section, h2);
    			append_dev(section, t1);
    			append_dev(section, br);
    			append_dev(section, t2);
    			append_dev(section, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*faq*/ 1) {
    				each_value = /*faq*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("FAQ", slots, []);

    	const faq = [
    		{
    			title: "Who can participate?",
    			content: "We allow those in middle school to join us, but only with parental permission. If you are in college, you are welcome to mentor or give speeches at the hackathon. If you want to be a mentor, you can <a target=\"_blank\" href=\"https://sohamb117.typeform.com/to/pq7eingx\">sign up here</a> or if you want to sponsor you can email us at <a href=\"mailto:sponsorship@scribehacks.tech\">sponsorship@scribehacks.tech</a>"
    		},
    		{
    			title: "What can we make?",
    			content: "At ScribeHacks we want you to pioneer with what you make. While there's no strict guidelines on what you can make, we urge participants to make something that looks towards the future of technology or solves a problem, no matter how small."
    		},
    		{
    			title: "What is a hackathon?",
    			content: "A hackathon is an event where participants use their knowledge and skills to create, develop, design, and create a full product in a certain amount of time. They’re open not just to programmers and engineers, but to anyone who’s interested in working together to find answers to the world’s most pressing problems, or just making something fun."
    		},
    		{
    			title: "What if I can't code?",
    			content: "No matter what your skills are, we'll try to make this event fun for you. We believe that solutions are better when they integrate diverse ways of thinking. There will be many opportunities to learn new skills or ideas at workshops and from the people around you. We’ll also be holding team building events where you can meet new people. Just come eager to learn!"
    		},
    		{
    			title: "Does it cost anything?",
    			content: "ScribeHacks is absolutely free! There is no entry fee, ScribeHacks will provide you with plenty of food, snacks, swag, and prizes throughout the 24 hours. We can provide all of this due to our wonderful sponsors!"
    		},
    		{
    			title: "What should I bring?",
    			content: "Please bring a valid form of identification like a student id or driver's license, a computer (preferably a laptop), chargers, and any hardware you will use for your hack. You can also bring a sleeping bag, pillow, toiletries, and a couple changes of clothes. Food will be provided at the event. No firearms, weapons, alcohol, or illegal drugs are allowed on campus."
    		},
    		{
    			title: "How do I prepare?",
    			content: "While you are not allowed to start coding or making the art for your project until the hackathon starts, you can always find a team, register for the hackathon, make mockups in Figma, XD, Sketch, and get the materials needed to make your project."
    		},
    		{
    			title: "What are the rules?",
    			content: "All participants are expected to follow the Hack Club Code of Conduct to ensure that everyone stays safe and has a fun time. In addition, plagiarism, copying code off the internet, or hardcoding values and not disclosing them, and other dishonesty may disqualify your project."
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<FAQ> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ FaqItem, faq });
    	return [faq];
    }

    class FAQ extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FAQ",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/sections/Schedule.svelte generated by Svelte v3.31.2 */

    const file$5 = "src/sections/Schedule.svelte";

    function create_fragment$5(ctx) {
    	let a;
    	let section;
    	let h2;
    	let t1;
    	let div33;
    	let ul0;
    	let h30;
    	let t3;
    	let li0;
    	let div0;
    	let t5;
    	let div1;
    	let t7;
    	let div2;
    	let t9;
    	let li1;
    	let div3;
    	let t11;
    	let div4;
    	let t13;
    	let div5;
    	let t15;
    	let li2;
    	let div6;
    	let t17;
    	let div7;
    	let t19;
    	let div8;
    	let t21;
    	let li3;
    	let div9;
    	let t23;
    	let div10;
    	let t25;
    	let div11;
    	let t27;
    	let li4;
    	let div12;
    	let t29;
    	let div13;
    	let t31;
    	let div14;
    	let t33;
    	let li5;
    	let div15;
    	let t35;
    	let div16;
    	let t37;
    	let div17;
    	let t39;
    	let li6;
    	let div18;
    	let t41;
    	let div19;
    	let t43;
    	let div20;
    	let t45;
    	let li7;
    	let div21;
    	let t47;
    	let div22;
    	let t49;
    	let div23;
    	let t51;
    	let ul1;
    	let li8;
    	let t52;
    	let li9;
    	let t53;
    	let li10;
    	let t54;
    	let li11;
    	let t55;
    	let li12;
    	let t56;
    	let li13;
    	let t57;
    	let li14;
    	let t58;
    	let li15;
    	let t59;
    	let ul2;
    	let h31;
    	let t61;
    	let li16;
    	let t62;
    	let li17;
    	let div24;
    	let t64;
    	let div25;
    	let t66;
    	let div26;
    	let t68;
    	let li18;
    	let t69;
    	let li19;
    	let div27;
    	let t71;
    	let div28;
    	let t73;
    	let div29;
    	let t75;
    	let li20;
    	let t76;
    	let li21;
    	let div30;
    	let t78;
    	let div31;
    	let t80;
    	let div32;

    	const block = {
    		c: function create() {
    			a = element("a");
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "Schedule and Activities";
    			t1 = space();
    			div33 = element("div");
    			ul0 = element("ul");
    			h30 = element("h3");
    			h30.textContent = "Saturday";
    			t3 = space();
    			li0 = element("li");
    			div0 = element("div");
    			div0.textContent = "8:00 AM";
    			t5 = space();
    			div1 = element("div");
    			div1.textContent = "Doors Open, Check In";
    			t7 = space();
    			div2 = element("div");
    			div2.textContent = "Pending";
    			t9 = space();
    			li1 = element("li");
    			div3 = element("div");
    			div3.textContent = "9:00 AM";
    			t11 = space();
    			div4 = element("div");
    			div4.textContent = "Opening Ceremony";
    			t13 = space();
    			div5 = element("div");
    			div5.textContent = "Pending";
    			t15 = space();
    			li2 = element("li");
    			div6 = element("div");
    			div6.textContent = "10:00 AM";
    			t17 = space();
    			div7 = element("div");
    			div7.textContent = "Hacking Begins";
    			t19 = space();
    			div8 = element("div");
    			div8.textContent = "Pending";
    			t21 = space();
    			li3 = element("li");
    			div9 = element("div");
    			div9.textContent = "1:00 PM";
    			t23 = space();
    			div10 = element("div");
    			div10.textContent = "Lunch";
    			t25 = space();
    			div11 = element("div");
    			div11.textContent = "Pending";
    			t27 = space();
    			li4 = element("li");
    			div12 = element("div");
    			div12.textContent = "4:00 PM";
    			t29 = space();
    			div13 = element("div");
    			div13.textContent = "Capture The Flag (Digital)";
    			t31 = space();
    			div14 = element("div");
    			div14.textContent = "Pending";
    			t33 = space();
    			li5 = element("li");
    			div15 = element("div");
    			div15.textContent = "7:00 PM";
    			t35 = space();
    			div16 = element("div");
    			div16.textContent = "Dinner";
    			t37 = space();
    			div17 = element("div");
    			div17.textContent = "Pending";
    			t39 = space();
    			li6 = element("li");
    			div18 = element("div");
    			div18.textContent = "8:00 PM";
    			t41 = space();
    			div19 = element("div");
    			div19.textContent = "Super Smash Bros. Tournament";
    			t43 = space();
    			div20 = element("div");
    			div20.textContent = "Pending";
    			t45 = space();
    			li7 = element("li");
    			div21 = element("div");
    			div21.textContent = "12:00 AM";
    			t47 = space();
    			div22 = element("div");
    			div22.textContent = "Midnight Snack";
    			t49 = space();
    			div23 = element("div");
    			div23.textContent = "Pending";
    			t51 = space();
    			ul1 = element("ul");
    			li8 = element("li");
    			t52 = space();
    			li9 = element("li");
    			t53 = space();
    			li10 = element("li");
    			t54 = space();
    			li11 = element("li");
    			t55 = space();
    			li12 = element("li");
    			t56 = space();
    			li13 = element("li");
    			t57 = space();
    			li14 = element("li");
    			t58 = space();
    			li15 = element("li");
    			t59 = space();
    			ul2 = element("ul");
    			h31 = element("h3");
    			h31.textContent = "Sunday";
    			t61 = space();
    			li16 = element("li");
    			t62 = space();
    			li17 = element("li");
    			div24 = element("div");
    			div24.textContent = "9:00 AM";
    			t64 = space();
    			div25 = element("div");
    			div25.textContent = "Project Submissions";
    			t66 = space();
    			div26 = element("div");
    			div26.textContent = "Pending";
    			t68 = space();
    			li18 = element("li");
    			t69 = space();
    			li19 = element("li");
    			div27 = element("div");
    			div27.textContent = "1:00 PM";
    			t71 = space();
    			div28 = element("div");
    			div28.textContent = "Closing Ceremony";
    			t73 = space();
    			div29 = element("div");
    			div29.textContent = "Pending";
    			t75 = space();
    			li20 = element("li");
    			t76 = space();
    			li21 = element("li");
    			div30 = element("div");
    			div30.textContent = "7:00 PM";
    			t78 = space();
    			div31 = element("div");
    			div31.textContent = "Virtual Afterparty";
    			t80 = space();
    			div32 = element("div");
    			div32.textContent = "Pending";
    			attr_dev(h2, "class", "svelte-m1ibvs");
    			add_location(h2, file$5, 3, 2, 49);
    			add_location(h30, file$5, 7, 6, 123);
    			attr_dev(div0, "class", "col-1");
    			add_location(div0, file$5, 9, 8, 182);
    			attr_dev(div1, "class", "col-2");
    			add_location(div1, file$5, 10, 8, 223);
    			attr_dev(div2, "class", "col-3");
    			add_location(div2, file$5, 11, 8, 277);
    			attr_dev(li0, "class", "schedule-item svelte-m1ibvs");
    			add_location(li0, file$5, 8, 6, 147);
    			attr_dev(div3, "class", "col-1");
    			add_location(div3, file$5, 14, 8, 363);
    			attr_dev(div4, "class", "col-2");
    			add_location(div4, file$5, 15, 8, 404);
    			attr_dev(div5, "class", "col-3");
    			add_location(div5, file$5, 16, 8, 454);
    			attr_dev(li1, "class", "schedule-item svelte-m1ibvs");
    			add_location(li1, file$5, 13, 6, 328);
    			attr_dev(div6, "class", "col-1");
    			add_location(div6, file$5, 19, 8, 540);
    			attr_dev(div7, "class", "col-2");
    			add_location(div7, file$5, 20, 8, 582);
    			attr_dev(div8, "class", "col-3");
    			add_location(div8, file$5, 21, 8, 630);
    			attr_dev(li2, "class", "schedule-item svelte-m1ibvs");
    			add_location(li2, file$5, 18, 6, 505);
    			attr_dev(div9, "class", "col-1");
    			add_location(div9, file$5, 24, 8, 716);
    			attr_dev(div10, "class", "col-2");
    			add_location(div10, file$5, 25, 8, 757);
    			attr_dev(div11, "class", "col-3");
    			add_location(div11, file$5, 26, 8, 796);
    			attr_dev(li3, "class", "schedule-item svelte-m1ibvs");
    			add_location(li3, file$5, 23, 6, 681);
    			attr_dev(div12, "class", "col-1");
    			add_location(div12, file$5, 29, 8, 882);
    			attr_dev(div13, "class", "col-2");
    			add_location(div13, file$5, 30, 8, 923);
    			attr_dev(div14, "class", "col-3");
    			add_location(div14, file$5, 31, 8, 983);
    			attr_dev(li4, "class", "schedule-item svelte-m1ibvs");
    			add_location(li4, file$5, 28, 6, 847);
    			attr_dev(div15, "class", "col-1");
    			add_location(div15, file$5, 34, 8, 1069);
    			attr_dev(div16, "class", "col-2");
    			add_location(div16, file$5, 35, 8, 1110);
    			attr_dev(div17, "class", "col-3");
    			add_location(div17, file$5, 36, 8, 1150);
    			attr_dev(li5, "class", "schedule-item svelte-m1ibvs");
    			add_location(li5, file$5, 33, 6, 1034);
    			attr_dev(div18, "class", "col-1");
    			add_location(div18, file$5, 39, 8, 1236);
    			attr_dev(div19, "class", "col-2");
    			add_location(div19, file$5, 40, 8, 1277);
    			attr_dev(div20, "class", "col-3");
    			add_location(div20, file$5, 41, 8, 1339);
    			attr_dev(li6, "class", "schedule-item svelte-m1ibvs");
    			add_location(li6, file$5, 38, 6, 1201);
    			attr_dev(div21, "class", "col-1");
    			add_location(div21, file$5, 44, 8, 1425);
    			attr_dev(div22, "class", "col-2");
    			add_location(div22, file$5, 45, 8, 1467);
    			attr_dev(div23, "class", "col-3");
    			add_location(div23, file$5, 46, 8, 1515);
    			attr_dev(li7, "class", "schedule-item svelte-m1ibvs");
    			add_location(li7, file$5, 43, 6, 1390);
    			attr_dev(ul0, "class", "svelte-m1ibvs");
    			add_location(ul0, file$5, 6, 4, 112);
    			attr_dev(li8, "class", "stop svelte-m1ibvs");
    			add_location(li8, file$5, 50, 6, 1622);
    			attr_dev(li9, "class", "stop svelte-m1ibvs");
    			add_location(li9, file$5, 51, 6, 1651);
    			attr_dev(li10, "class", "stop svelte-m1ibvs");
    			add_location(li10, file$5, 52, 6, 1680);
    			attr_dev(li11, "class", "stop svelte-m1ibvs");
    			add_location(li11, file$5, 53, 6, 1709);
    			attr_dev(li12, "class", "stop svelte-m1ibvs");
    			add_location(li12, file$5, 54, 6, 1738);
    			attr_dev(li13, "class", "stop svelte-m1ibvs");
    			add_location(li13, file$5, 55, 6, 1767);
    			attr_dev(li14, "class", "stop svelte-m1ibvs");
    			add_location(li14, file$5, 56, 6, 1796);
    			attr_dev(li15, "class", "stop svelte-m1ibvs");
    			add_location(li15, file$5, 57, 6, 1825);
    			attr_dev(ul1, "class", "traveller svelte-m1ibvs");
    			attr_dev(ul1, "aria-hidden", "true");
    			add_location(ul1, file$5, 49, 4, 1574);
    			add_location(h31, file$5, 60, 6, 1873);
    			attr_dev(li16, "class", "schedule-gap svelte-m1ibvs");
    			add_location(li16, file$5, 61, 6, 1895);
    			attr_dev(div24, "class", "col-1");
    			add_location(div24, file$5, 63, 8, 1967);
    			attr_dev(div25, "class", "col-2");
    			add_location(div25, file$5, 64, 8, 2008);
    			attr_dev(div26, "class", "col-3");
    			add_location(div26, file$5, 65, 8, 2061);
    			attr_dev(li17, "class", "schedule-item svelte-m1ibvs");
    			add_location(li17, file$5, 62, 6, 1932);
    			attr_dev(li18, "class", "schedule-gap svelte-m1ibvs");
    			add_location(li18, file$5, 67, 6, 2112);
    			attr_dev(div27, "class", "col-1");
    			add_location(div27, file$5, 69, 8, 2184);
    			attr_dev(div28, "class", "col-2");
    			add_location(div28, file$5, 70, 8, 2225);
    			attr_dev(div29, "class", "col-3");
    			add_location(div29, file$5, 71, 8, 2275);
    			attr_dev(li19, "class", "schedule-item svelte-m1ibvs");
    			add_location(li19, file$5, 68, 6, 2149);
    			attr_dev(li20, "class", "schedule-gap svelte-m1ibvs");
    			add_location(li20, file$5, 73, 6, 2326);
    			attr_dev(div30, "class", "col-1");
    			add_location(div30, file$5, 75, 8, 2398);
    			attr_dev(div31, "class", "col-2");
    			add_location(div31, file$5, 76, 8, 2439);
    			attr_dev(div32, "class", "col-3");
    			add_location(div32, file$5, 77, 8, 2491);
    			attr_dev(li21, "class", "schedule-item svelte-m1ibvs");
    			add_location(li21, file$5, 74, 6, 2363);
    			attr_dev(ul2, "class", "svelte-m1ibvs");
    			add_location(ul2, file$5, 59, 4, 1862);
    			attr_dev(div33, "class", "schedule svelte-m1ibvs");
    			add_location(div33, file$5, 5, 2, 85);
    			attr_dev(section, "class", "section svelte-m1ibvs");
    			add_location(section, file$5, 2, 0, 21);
    			attr_dev(a, "name", "schedule");
    			add_location(a, file$5, 1, 0, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, section);
    			append_dev(section, h2);
    			append_dev(section, t1);
    			append_dev(section, div33);
    			append_dev(div33, ul0);
    			append_dev(ul0, h30);
    			append_dev(ul0, t3);
    			append_dev(ul0, li0);
    			append_dev(li0, div0);
    			append_dev(li0, t5);
    			append_dev(li0, div1);
    			append_dev(li0, t7);
    			append_dev(li0, div2);
    			append_dev(ul0, t9);
    			append_dev(ul0, li1);
    			append_dev(li1, div3);
    			append_dev(li1, t11);
    			append_dev(li1, div4);
    			append_dev(li1, t13);
    			append_dev(li1, div5);
    			append_dev(ul0, t15);
    			append_dev(ul0, li2);
    			append_dev(li2, div6);
    			append_dev(li2, t17);
    			append_dev(li2, div7);
    			append_dev(li2, t19);
    			append_dev(li2, div8);
    			append_dev(ul0, t21);
    			append_dev(ul0, li3);
    			append_dev(li3, div9);
    			append_dev(li3, t23);
    			append_dev(li3, div10);
    			append_dev(li3, t25);
    			append_dev(li3, div11);
    			append_dev(ul0, t27);
    			append_dev(ul0, li4);
    			append_dev(li4, div12);
    			append_dev(li4, t29);
    			append_dev(li4, div13);
    			append_dev(li4, t31);
    			append_dev(li4, div14);
    			append_dev(ul0, t33);
    			append_dev(ul0, li5);
    			append_dev(li5, div15);
    			append_dev(li5, t35);
    			append_dev(li5, div16);
    			append_dev(li5, t37);
    			append_dev(li5, div17);
    			append_dev(ul0, t39);
    			append_dev(ul0, li6);
    			append_dev(li6, div18);
    			append_dev(li6, t41);
    			append_dev(li6, div19);
    			append_dev(li6, t43);
    			append_dev(li6, div20);
    			append_dev(ul0, t45);
    			append_dev(ul0, li7);
    			append_dev(li7, div21);
    			append_dev(li7, t47);
    			append_dev(li7, div22);
    			append_dev(li7, t49);
    			append_dev(li7, div23);
    			append_dev(div33, t51);
    			append_dev(div33, ul1);
    			append_dev(ul1, li8);
    			append_dev(ul1, t52);
    			append_dev(ul1, li9);
    			append_dev(ul1, t53);
    			append_dev(ul1, li10);
    			append_dev(ul1, t54);
    			append_dev(ul1, li11);
    			append_dev(ul1, t55);
    			append_dev(ul1, li12);
    			append_dev(ul1, t56);
    			append_dev(ul1, li13);
    			append_dev(ul1, t57);
    			append_dev(ul1, li14);
    			append_dev(ul1, t58);
    			append_dev(ul1, li15);
    			append_dev(div33, t59);
    			append_dev(div33, ul2);
    			append_dev(ul2, h31);
    			append_dev(ul2, t61);
    			append_dev(ul2, li16);
    			append_dev(ul2, t62);
    			append_dev(ul2, li17);
    			append_dev(li17, div24);
    			append_dev(li17, t64);
    			append_dev(li17, div25);
    			append_dev(li17, t66);
    			append_dev(li17, div26);
    			append_dev(ul2, t68);
    			append_dev(ul2, li18);
    			append_dev(ul2, t69);
    			append_dev(ul2, li19);
    			append_dev(li19, div27);
    			append_dev(li19, t71);
    			append_dev(li19, div28);
    			append_dev(li19, t73);
    			append_dev(li19, div29);
    			append_dev(ul2, t75);
    			append_dev(ul2, li20);
    			append_dev(ul2, t76);
    			append_dev(ul2, li21);
    			append_dev(li21, div30);
    			append_dev(li21, t78);
    			append_dev(li21, div31);
    			append_dev(li21, t80);
    			append_dev(li21, div32);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Schedule", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Schedule> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Schedule extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Schedule",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/sections/Venue.svelte generated by Svelte v3.31.2 */

    const file$6 = "src/sections/Venue.svelte";

    function create_fragment$6(ctx) {
    	let a;
    	let section;
    	let div0;
    	let iframe;
    	let iframe_src_value;
    	let t0;
    	let div1;
    	let h2;
    	let t2;
    	let p;

    	const block = {
    		c: function create() {
    			a = element("a");
    			section = element("section");
    			div0 = element("div");
    			iframe = element("iframe");
    			t0 = space();
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Venue";
    			t2 = space();
    			p = element("p");
    			p.textContent = "San Franciso Bay Area - TBD";
    			if (iframe.src !== (iframe_src_value = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225513.800459859!2d-124.66329873915016!3d37.86226004028482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808583a3a688d7b5%3A0x8c891b8457461fa9!2sSan%20Francisco%20Bay%20Area%2C%20CA!5e0!3m2!1sen!2sus!4v1606525794824!5m2!1sen!2sus")) attr_dev(iframe, "src", iframe_src_value);
    			set_style(iframe, "border", "0");
    			iframe.allowFullscreen = "";
    			attr_dev(iframe, "width", "100%");
    			attr_dev(iframe, "height", "450");
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "title", "Location of Venue");
    			add_location(iframe, file$6, 4, 4, 83);
    			attr_dev(div0, "class", "section-left svelte-2f8lue");
    			add_location(div0, file$6, 3, 2, 52);
    			attr_dev(h2, "class", "svelte-2f8lue");
    			add_location(h2, file$6, 7, 4, 545);
    			attr_dev(p, "class", "svelte-2f8lue");
    			add_location(p, file$6, 8, 4, 564);
    			attr_dev(div1, "class", "section-right svelte-2f8lue");
    			add_location(div1, file$6, 6, 2, 513);
    			attr_dev(section, "class", "section venue svelte-2f8lue");
    			add_location(section, file$6, 2, 0, 18);
    			attr_dev(a, "name", "venue");
    			add_location(a, file$6, 1, 0, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, section);
    			append_dev(section, div0);
    			append_dev(div0, iframe);
    			append_dev(section, t0);
    			append_dev(section, div1);
    			append_dev(div1, h2);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Venue", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Venue> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Venue extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Venue",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/TeamMember.svelte generated by Svelte v3.31.2 */

    const file$7 = "src/components/TeamMember.svelte";

    function create_fragment$7(ctx) {
    	let li;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div1;
    	let p;
    	let b;
    	let t1_value = /*profile*/ ctx[0].name + "";
    	let t1;
    	let t2;
    	let div0;
    	let a0;
    	let img1;
    	let img1_src_value;
    	let a0_href_value;
    	let t3;
    	let a1;
    	let img2;
    	let img2_src_value;
    	let a1_href_value;

    	const block = {
    		c: function create() {
    			li = element("li");
    			img0 = element("img");
    			t0 = space();
    			div1 = element("div");
    			p = element("p");
    			b = element("b");
    			t1 = text(t1_value);
    			t2 = space();
    			div0 = element("div");
    			a0 = element("a");
    			img1 = element("img");
    			t3 = space();
    			a1 = element("a");
    			img2 = element("img");
    			attr_dev(img0, "class", "pfp svelte-1yxilpp");
    			if (img0.src !== (img0_src_value = /*profile*/ ctx[0].image)) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "Team Member");
    			add_location(img0, file$7, 6, 2, 70);
    			add_location(b, file$7, 8, 7, 156);
    			add_location(p, file$7, 8, 4, 153);
    			if (img1.src !== (img1_src_value = "/img/social/github.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "GitHub");
    			attr_dev(img1, "class", "svelte-1yxilpp");
    			add_location(img1, file$7, 11, 8, 250);
    			attr_dev(a0, "href", a0_href_value = /*profile*/ ctx[0].github);
    			add_location(a0, file$7, 10, 6, 214);
    			if (img2.src !== (img2_src_value = "/img/social/linkedin.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "LinkedIn");
    			attr_dev(img2, "class", "svelte-1yxilpp");
    			add_location(img2, file$7, 14, 8, 353);
    			attr_dev(a1, "href", a1_href_value = /*profile*/ ctx[0].linkedin);
    			add_location(a1, file$7, 13, 6, 315);
    			attr_dev(div0, "class", "socials svelte-1yxilpp");
    			add_location(div0, file$7, 9, 4, 186);
    			attr_dev(div1, "class", "info svelte-1yxilpp");
    			add_location(div1, file$7, 7, 2, 130);
    			attr_dev(li, "class", "team-member svelte-1yxilpp");
    			add_location(li, file$7, 5, 0, 43);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, img0);
    			append_dev(li, t0);
    			append_dev(li, div1);
    			append_dev(div1, p);
    			append_dev(p, b);
    			append_dev(b, t1);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(a0, img1);
    			append_dev(div0, t3);
    			append_dev(div0, a1);
    			append_dev(a1, img2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*profile*/ 1 && img0.src !== (img0_src_value = /*profile*/ ctx[0].image)) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if (dirty & /*profile*/ 1 && t1_value !== (t1_value = /*profile*/ ctx[0].name + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*profile*/ 1 && a0_href_value !== (a0_href_value = /*profile*/ ctx[0].github)) {
    				attr_dev(a0, "href", a0_href_value);
    			}

    			if (dirty & /*profile*/ 1 && a1_href_value !== (a1_href_value = /*profile*/ ctx[0].linkedin)) {
    				attr_dev(a1, "href", a1_href_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TeamMember", slots, []);
    	let { profile } = $$props;
    	const writable_props = ["profile"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TeamMember> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("profile" in $$props) $$invalidate(0, profile = $$props.profile);
    	};

    	$$self.$capture_state = () => ({ profile });

    	$$self.$inject_state = $$props => {
    		if ("profile" in $$props) $$invalidate(0, profile = $$props.profile);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [profile];
    }

    class TeamMember extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { profile: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TeamMember",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*profile*/ ctx[0] === undefined && !("profile" in props)) {
    			console.warn("<TeamMember> was created without expected prop 'profile'");
    		}
    	}

    	get profile() {
    		throw new Error("<TeamMember>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set profile(value) {
    		throw new Error("<TeamMember>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/sections/Team.svelte generated by Svelte v3.31.2 */
    const file$8 = "src/sections/Team.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (69:6) {#each people as profile}
    function create_each_block$1(ctx) {
    	let teammember;
    	let current;

    	teammember = new TeamMember({
    			props: { profile: /*profile*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(teammember.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(teammember, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(teammember.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(teammember.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(teammember, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(69:6) {#each people as profile}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let a;
    	let section;
    	let h2;
    	let t1;
    	let br;
    	let t2;
    	let ul;
    	let current;
    	let each_value = /*people*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			a = element("a");
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "The Team";
    			t1 = space();
    			br = element("br");
    			t2 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "svelte-1rxvmrm");
    			add_location(h2, file$8, 65, 4, 1616);
    			add_location(br, file$8, 66, 4, 1638);
    			attr_dev(ul, "class", "team-members svelte-1rxvmrm");
    			add_location(ul, file$8, 67, 4, 1649);
    			attr_dev(section, "class", "section team svelte-1rxvmrm");
    			add_location(section, file$8, 64, 2, 1581);
    			attr_dev(a, "name", "team");
    			add_location(a, file$8, 63, 0, 1563);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, section);
    			append_dev(section, h2);
    			append_dev(section, t1);
    			append_dev(section, br);
    			append_dev(section, t2);
    			append_dev(section, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*people*/ 1) {
    				each_value = /*people*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Team", slots, []);

    	const people = [
    		{
    			name: "Soham",
    			image: "/img/team/soham.jpg",
    			in: "https://linkedin.com/in/sohamb117/",
    			gh: "https://github.com/sohamb117"
    		},
    		{
    			name: "Kyle",
    			image: "/img/team/kyle.jpg",
    			in: "https://www.linkedin.com/in/sdbagel/",
    			gh: "https://github.com/SDBagel"
    		},
    		{
    			name: "Kai",
    			image: "/img/team/kai.png",
    			in: "https://www.linkedin.com/in/kai-mccormick/",
    			gh: "https://github.com/kaidevrim"
    		},
    		{
    			name: "Rohan",
    			image: "/img/team/rohan.jpg",
    			in: "https://linkedin.com/in/bansal-rohan",
    			gh: "https://github.com/rohan-bansal"
    		},
    		{
    			name: "Shreya",
    			image: "/img/team/shreya.jpg",
    			gh: "https://github.com/shreyaparikh08"
    		},
    		{
    			name: "Aparna",
    			image: "/img/team/aparna.jpg",
    			in: "https://www.linkedin.com/in/aparna-prabhakar-a8490a1b1/"
    		},
    		{
    			name: "Ginni",
    			image: "/img/team/ginni.jpg"
    		},
    		{
    			name: "Chenghao",
    			image: "/img/team/chenghao.png",
    			in: "https://www.linkedin.com/in/chenghao-li786/",
    			gh: "https://github.com/chenghaoli36"
    		},
    		{
    			name: "Chloe",
    			image: "/img/team/chloe.jpg",
    			in: "https://www.linkedin.com/in/chloewang55/"
    		},
    		{
    			name: "Pradyun",
    			image: "/img/team/pradyun.png",
    			in: "https://www.linkedin.com/in/pradyun-n-958499b8/",
    			gh: "https://github.com/pradyungn/"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Team> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ TeamMember, people });
    	return [people];
    }

    class Team extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Team",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/sections/Contact.svelte generated by Svelte v3.31.2 */

    const file$9 = "src/sections/Contact.svelte";

    function create_fragment$9(ctx) {
    	let a1;
    	let section;
    	let div;
    	let h2;
    	let t1;
    	let p;
    	let t2;
    	let a0;
    	let t4;
    	let t5;
    	let form;
    	let input0;
    	let br;
    	let t6;
    	let textarea;
    	let t7;
    	let input1;

    	const block = {
    		c: function create() {
    			a1 = element("a");
    			section = element("section");
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Contact Us";
    			t1 = space();
    			p = element("p");
    			t2 = text("Send us a message at ");
    			a0 = element("a");
    			a0.textContent = "support@scribehacks.tech";
    			t4 = text(" or use this form to submit an inquiry.");
    			t5 = space();
    			form = element("form");
    			input0 = element("input");
    			br = element("br");
    			t6 = space();
    			textarea = element("textarea");
    			t7 = space();
    			input1 = element("input");
    			attr_dev(h2, "class", "svelte-eyhl3n");
    			add_location(h2, file$9, 4, 4, 74);
    			attr_dev(a0, "href", "mailto:support@scribehacks.tech");
    			add_location(a0, file$9, 5, 28, 122);
    			attr_dev(p, "class", "svelte-eyhl3n");
    			add_location(p, file$9, 5, 4, 98);
    			attr_dev(input0, "name", "subject");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "placeholder", "Subject...");
    			attr_dev(input0, "class", "svelte-eyhl3n");
    			add_location(input0, file$9, 7, 6, 327);
    			add_location(br, file$9, 7, 65, 386);
    			attr_dev(textarea, "name", "body");
    			attr_dev(textarea, "placeholder", "Message...");
    			attr_dev(textarea, "class", "svelte-eyhl3n");
    			add_location(textarea, file$9, 8, 6, 397);
    			attr_dev(input1, "class", "button svelte-eyhl3n");
    			attr_dev(input1, "type", "submit");
    			input1.value = "Send";
    			add_location(input1, file$9, 9, 6, 462);
    			attr_dev(form, "align", "center");
    			attr_dev(form, "id", "contact-form");
    			attr_dev(form, "action", "mailto:support@scribehacks.tech");
    			attr_dev(form, "class", "svelte-eyhl3n");
    			add_location(form, file$9, 6, 4, 240);
    			attr_dev(div, "class", "contact svelte-eyhl3n");
    			add_location(div, file$9, 3, 2, 48);
    			attr_dev(section, "class", "section svelte-eyhl3n");
    			add_location(section, file$9, 2, 0, 20);
    			attr_dev(a1, "name", "contact");
    			add_location(a1, file$9, 1, 0, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a1, anchor);
    			append_dev(a1, section);
    			append_dev(section, div);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(p, t2);
    			append_dev(p, a0);
    			append_dev(p, t4);
    			append_dev(div, t5);
    			append_dev(div, form);
    			append_dev(form, input0);
    			append_dev(form, br);
    			append_dev(form, t6);
    			append_dev(form, textarea);
    			append_dev(form, t7);
    			append_dev(form, input1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Contact", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/sections/Footer.svelte generated by Svelte v3.31.2 */

    const file$a = "src/sections/Footer.svelte";

    function create_fragment$a(ctx) {
    	let footer;
    	let p0;
    	let a0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let a1;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let a2;
    	let img2;
    	let img2_src_value;
    	let t2;
    	let a3;
    	let img3;
    	let img3_src_value;
    	let t3;
    	let p1;
    	let t5;
    	let p2;
    	let t6;
    	let a4;
    	let t8;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			p0 = element("p");
    			a0 = element("a");
    			img0 = element("img");
    			t0 = space();
    			a1 = element("a");
    			img1 = element("img");
    			t1 = space();
    			a2 = element("a");
    			img2 = element("img");
    			t2 = space();
    			a3 = element("a");
    			img3 = element("img");
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "© ScribeHacks I | 2021";
    			t5 = space();
    			p2 = element("p");
    			t6 = text("Fiscally sponsored by ");
    			a4 = element("a");
    			a4.textContent = "Hack Club,";
    			t8 = text(" a 501(c)(3) organization.");
    			if (img0.src !== (img0_src_value = "/img/social/discord.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "Discord");
    			attr_dev(img0, "class", "svelte-1n92rwb");
    			add_location(img0, file$a, 4, 6, 82);
    			attr_dev(a0, "href", "");
    			add_location(a0, file$a, 3, 4, 64);
    			if (img1.src !== (img1_src_value = "/img/social/github.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "GitHub");
    			attr_dev(img1, "class", "svelte-1n92rwb");
    			add_location(img1, file$a, 7, 6, 193);
    			attr_dev(a1, "href", "https://github.com/ScribeHacks");
    			add_location(a1, file$a, 6, 4, 145);
    			if (img2.src !== (img2_src_value = "/img/social/instagram.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "Instagram");
    			attr_dev(img2, "class", "svelte-1n92rwb");
    			add_location(img2, file$a, 10, 6, 310);
    			attr_dev(a2, "href", "https://www.instagram.com/scribehacks/");
    			add_location(a2, file$a, 9, 4, 254);
    			if (img3.src !== (img3_src_value = "/img/social/twitter.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "Twitter");
    			attr_dev(img3, "class", "svelte-1n92rwb");
    			add_location(img3, file$a, 13, 6, 435);
    			attr_dev(a3, "href", "https://twitter.com/scribe_hacks?lang=en");
    			add_location(a3, file$a, 12, 4, 377);
    			attr_dev(p0, "class", "social-links svelte-1n92rwb");
    			add_location(p0, file$a, 2, 2, 35);
    			add_location(p1, file$a, 16, 2, 503);
    			attr_dev(a4, "href", "https://hackclub.com");
    			add_location(a4, file$a, 17, 27, 565);
    			add_location(p2, file$a, 17, 2, 540);
    			attr_dev(footer, "class", "section footer svelte-1n92rwb");
    			add_location(footer, file$a, 1, 0, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, p0);
    			append_dev(p0, a0);
    			append_dev(a0, img0);
    			append_dev(p0, t0);
    			append_dev(p0, a1);
    			append_dev(a1, img1);
    			append_dev(p0, t1);
    			append_dev(p0, a2);
    			append_dev(a2, img2);
    			append_dev(p0, t2);
    			append_dev(p0, a3);
    			append_dev(a3, img3);
    			append_dev(footer, t3);
    			append_dev(footer, p1);
    			append_dev(footer, t5);
    			append_dev(footer, p2);
    			append_dev(p2, t6);
    			append_dev(p2, a4);
    			append_dev(p2, t8);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Footer", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.31.2 */
    const file$b = "src/App.svelte";

    function create_fragment$b(ctx) {
    	let main;
    	let navbar;
    	let t0;
    	let hero;
    	let t1;
    	let about;
    	let t2;
    	let faq;
    	let t3;
    	let schedule;
    	let t4;
    	let venue;
    	let t5;
    	let team;
    	let t6;
    	let contact;
    	let t7;
    	let footer;
    	let current;
    	navbar = new Navbar({ $$inline: true });
    	hero = new Hero({ $$inline: true });
    	about = new About({ $$inline: true });
    	faq = new FAQ({ $$inline: true });
    	schedule = new Schedule({ $$inline: true });
    	venue = new Venue({ $$inline: true });
    	team = new Team({ $$inline: true });
    	contact = new Contact({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			create_component(hero.$$.fragment);
    			t1 = space();
    			create_component(about.$$.fragment);
    			t2 = space();
    			create_component(faq.$$.fragment);
    			t3 = space();
    			create_component(schedule.$$.fragment);
    			t4 = space();
    			create_component(venue.$$.fragment);
    			t5 = space();
    			create_component(team.$$.fragment);
    			t6 = space();
    			create_component(contact.$$.fragment);
    			t7 = space();
    			create_component(footer.$$.fragment);
    			add_location(main, file$b, 11, 0, 442);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(navbar, main, null);
    			append_dev(main, t0);
    			mount_component(hero, main, null);
    			append_dev(main, t1);
    			mount_component(about, main, null);
    			append_dev(main, t2);
    			mount_component(faq, main, null);
    			append_dev(main, t3);
    			mount_component(schedule, main, null);
    			append_dev(main, t4);
    			mount_component(venue, main, null);
    			append_dev(main, t5);
    			mount_component(team, main, null);
    			append_dev(main, t6);
    			mount_component(contact, main, null);
    			append_dev(main, t7);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(hero.$$.fragment, local);
    			transition_in(about.$$.fragment, local);
    			transition_in(faq.$$.fragment, local);
    			transition_in(schedule.$$.fragment, local);
    			transition_in(venue.$$.fragment, local);
    			transition_in(team.$$.fragment, local);
    			transition_in(contact.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(hero.$$.fragment, local);
    			transition_out(about.$$.fragment, local);
    			transition_out(faq.$$.fragment, local);
    			transition_out(schedule.$$.fragment, local);
    			transition_out(venue.$$.fragment, local);
    			transition_out(team.$$.fragment, local);
    			transition_out(contact.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(navbar);
    			destroy_component(hero);
    			destroy_component(about);
    			destroy_component(faq);
    			destroy_component(schedule);
    			destroy_component(venue);
    			destroy_component(team);
    			destroy_component(contact);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Navbar,
    		Hero,
    		About,
    		FAQ,
    		Schedule,
    		Venue,
    		Team,
    		Contact,
    		Footer
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        props: {}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
