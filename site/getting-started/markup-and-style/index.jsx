/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
import PageBody from 'app_modules/site/components/page/body';
import version from '.generated/site.version';
import { prefix as pf } from 'app_modules/ui/util/component';


import g from 'app_modules/global';
import { Link } from 'react-router';

const versionNumber = version.sldsVersion.replace(/(v|\.)/g, '');
const moduleName = g.moduleName;
const staticAssetName = g.filenamePrefix.toUpperCase() + versionNumber;
const unmanagedPackageUrl = g.unmanagedPackageUrls[0].url;

export default (
  <PageBody anchorTitle="Markup and Style" contentClassName={pf('container--large')}>
    <p className="site-text-introduction">
      The Salesforce Lightning Design System (SLDS) component library was developed to enable Salesforce developers to create a uniform look and feel across all Salesforce-related applications while adhering to CSS best practices and conventions.
    </p>
    <p>In order to accomplish this goal, we’ve chosen to use very specific naming techniques. These allow us to keep our code base flat, with low specificity, and keeps us from fighting specificity wars that start with frustration and end with <code>!important</code>. Though we base our naming on the BEM method, we have a few additions of our own outlined below.
    </p>
    <h2 className="site-text-heading--large">BEM Naming</h2>
    <p><a href="https://en.bem.info/">BEM</a> is a well-known method of naming components — block, element, modifier. If you&rsquo;re comfortable with BEM, move down to the “Where we diverge from BEM” section. For those unfamiliar or who need a quick refresh, let&rsquo;s briefly look at how BEM works. As an example, we’ll build a house component.
    </p>
    <img src={`/assets/images/house.png`} width="400" height="371" alt="gray house with pink door and gray steps" className={pf('float--left')} />
    <h3 className="site-text-heading--medium">Block</h3>
    <p>A block represents the main component name. If you were building a house component, the class name would be <code>.house</code>. All of the properties you want included for all houses would be included in the base <code>.house</code> class.
    </p>
    <h3 className="site-text-heading--medium">Element</h3>
    <p>An element represents a part of a component and is separated by two underscores. The door of the house would be represented by the class <code>.house__door</code>. A window would be <code>.house__window</code>.
    </p>
    <p>Be careful to look for smaller component possibilities within a larger component. Especially if it&rsquo;s a pattern that might be repeated in an unrelated component. Avoid using a class like <code>.house__stair__step</code>. Instead, either use <code>.house__stair-step</code> (a single dash does not indicate anything in BEM and can simply be used for compound naming). Or if the stair portion of the component might be used inside another component, make the <code>.stair</code> a smaller component within the larger component and use <code>.stair__step</code> as an element of it.</p>
    <h3 className="site-text-heading--medium">Modifier</h3>
    <p>A modifier is a component or element variation and is separated by two dashes. The variation can apply to the overall component or it can be applied to an element within the component.</p>
    <p>Since the properties that should apply to every house are placed on the main <code>.house</code> class, all houses receive the <code>.house</code> class as the base. If there is a variation of a house — perhaps it is gray — the <code>.house--gray</code> class would be added to the component in addition to the <code>.house</code> class.</p>
    <p>If the house has a pink door, a variation can be placed on the door element itself — <code>.house__door--pink</code>.</p>
    <h2 className="site-text-heading--large">Where we diverge from BEM</h2>
    <p>In some cases, for reasons of brevity and comprehension, we&rsquo;ve added to, or deviated from, typical BEM naming conventions. These changes are outlined below.
    </p>
    <h3 className="site-text-heading--medium">Utility Classes</h3>
    <p>Though BEM syntax is traditionally based off an initial block, in some cases (in our utilities) we have opted to remove that requirement. For example, margin and padding are indicated with the formula <code>.m-top--medium</code> (margin, top, medium). So while there is no base <code>.m</code> or <code>.m-top</code> class as a base class, we feel it’s an easily understandable way to indicate that there is a size variation in these utility classes.</p>
      <p>Our spacing utilities similarly use the syntax <code>.size--1-of-2</code> without a base <code>.size</code> class. Text sizing uses class names like <code>.text-body--small</code> and <code>.text-heading--large</code> without a base <code>.text-body</code> or <code>.text-heading class</code>.
      </p>
    <h3 className="site-text-heading--medium">Component Containers</h3>
    <p>Though generic .container classes exist, sometimes a component has an optional container — but it is specific to that component alone. Those containers should be indicated by a class using a single underscore. For example, when a <code>.pill</code> has an optional container applied, that class is written as <code>.pill_container</code>.
    </p>
    <h3 className="site-text-heading--medium">Namespacing</h3>
    <p>In order to make this framework easy to use with other frameworks, we’ve added the .slds- namespace. Rather than using <code>.button</code>, our framework uses <code>.slds-button</code>. This allows you to integrate the Lightning Design System (SLDS) with your own bespoke CSS or to integrate it with an application that uses the modified Salesforce Bootstrap framework previously used as you wean your application away from it.
    </p>
    <h3 className="site-text-heading--medium">Scoping</h3>
    <p>In some cases, when you don&rsquo;t have full control of the DOM (for example, when integrating with Visualforce, Lightning Components or another framework), you may need to scope components built with SLDS. In this case, three different versions of the CSS framework are available in the download.</p>
      <p>The components built from SLDS should have the class .slds at the highest level of the DOM where they&rsquo;re included. In some cases this will be a wrapper at the component level, in other cases you may wrap several components. Do not place .slds on the body level of the application if you are including non-slds components within it. This would cause the non-slds components to be scoped and may override expected styles with negative effects.</p>
    <h2 className="site-text-heading--large">Component States</h2>
    <p>When a component has a variety of states, we add a class to indicate the state the component, or certain portions of the component, are in. Some examples are: <code>.is-selected</code>, <code>.is-active</code>, <code>.is-expanded</code>, <code>.is-nested</code>, <code>.is-open</code>, <code>.has-focus</code>, <code>.has-error</code>, etc.
    </p>
    <p>
      Please address any questions about our code style or contributing to our project to our <a href="https://github.com/salesforce-ux/design-system/issues">GitHub issues</a>.
    </p>
  </PageBody>
);
