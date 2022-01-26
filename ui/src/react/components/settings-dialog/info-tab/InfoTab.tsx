/*
 * Copyright (c) 2021 Ford Motor Company
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';

import versionJson from '../../../../application-version.json';
import Logo from '../../logo/Logo';

import './InfoTab.scss';

function InfoTab(): JSX.Element {
  return (
    <div className="tab-body info-tab-body">
      <Logo />
      <label className="version-label">
        Version: <input className="version-container" disabled value={versionJson.version} />
      </label>
    </div>
  );
}

export default InfoTab;
