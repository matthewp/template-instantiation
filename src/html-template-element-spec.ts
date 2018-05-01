/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http:polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http:polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http:polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http:polymer.github.io/PATENTS.txt
 */

import { Spec } from '../../@polymer/ristretto/lib/spec.js';
import { Fixturable } from
    '../../@polymer/ristretto/lib/mixins/fixturable.js';
import '../../chai/chai.js';
import { ExampleTemplateProcessor } from './example-template-processor.js';
import createInstance from './html-template-element.js';

const spec = new (Fixturable(Spec))();
const { describe, it, fixture } = spec;
const { expect } = chai;

describe('HTMLTemplateElement', () => {
  describe('createInstance', () => {
    fixture(() => {
      const template = document.createElement('template');
      template.innerHTML = `<div>{{content}}</div>`;
      return { template };
    });

    describe('without arguments', () => {
      it('throws due to missing processor', ({ template }: any) => {
        let threw = false;

        try {
          let ci = createInstance as any;
          ci(template, null);
        } catch (e) {
          threw = true;
        }

        expect(threw).to.be.equal(true);
      });
    });

    describe('given a processor', () => {
      fixture((context: any) => {
        return { ...context, processor: new ExampleTemplateProcessor };
      });

      it('returns a DocumentFragment', ({ template, processor }: any) => {
        const instance = createInstance(template, processor);
        expect(instance).to.be.instanceof(DocumentFragment);
      });

      it('returns a TemplateInstance', ({ template, processor }: any) => {
        const instance = createInstance(template, processor);
        expect(instance).to.be.instanceof(DocumentFragment);
      });

      describe('with initial state', () => {
        fixture((context: any) => {
          return { ...context, state: { content: 'Hello world.' } };
        });

        it('puts the state in the DOM', ({ template, processor, state }: any) => {
          const instance = createInstance(template, processor, state);
          expect(instance.childNodes[0].textContent).to.be.equal(state.content);
        });
      });
    });
  });
});

export const htmlTemplateElementSpec: Spec = spec;
