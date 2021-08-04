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
import classnames from 'classnames';

import { PrimaryButton } from '../button/Button';
import Dialog, { DialogMethods } from '../dialog/Dialog';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import Theme from '../../types/theme';

import './SettingsDialog.scss';

import lightThemeImage from '../../../assets/light-theme-picture.jpg';
import darkThemeImage from '../../../assets/dark-theme-picture.jpg';

function SettingsDialog(props: unknown, ref: React.Ref<DialogMethods>) {
  const [theme, setTheme] = useTheme();
  const { logout } = useAuth();

  return <SettingsDialogRenderer theme={theme} onThemeChange={setTheme} onLogout={logout} ref={ref} />;
}

type SettingsDialogRendererProps = {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  onLogout: () => void;
};

export const SettingsDialogRenderer = React.forwardRef<DialogMethods, SettingsDialogRendererProps>((props, ref) => {
  const { theme, onThemeChange, onLogout } = props;

  const [tab, setTab] = React.useState<'styles' | 'account'>('styles');

  return (
    <Dialog className="settings-dialog" header="settings" subHeader="choose your preferences" ref={ref}>
      <div className="tab-container">
        <div className="tab-heading">
          <div className={classnames('tab', { selected: tab === 'styles' })} onClick={() => setTab('styles')}>
            styles
          </div>
          <div className={classnames('tab', { selected: tab === 'account' })} onClick={() => setTab('account')}>
            account
          </div>
        </div>

        {tab === 'styles' && (
          <div className="tab-body styles-tab-body">
            <div className="label">appearance</div>
            <div className="tab-heading theme-tab-heading">
              <div className="theme-icon-container">
                <img
                  src={lightThemeImage}
                  className={classnames({ selected: theme === Theme.LIGHT })}
                  onClick={() => onThemeChange(Theme.LIGHT)}
                  alt="Light Theme"
                />
                <div className="theme-icon-label">light</div>
              </div>

              <div className="theme-icon-container">
                <img
                  src={darkThemeImage}
                  className={classnames({ selected: theme === Theme.DARK })}
                  onClick={() => onThemeChange(Theme.DARK)}
                  alt="Dark Theme"
                />
                <div className="theme-icon-label">dark</div>
              </div>
            </div>
          </div>
        )}
        {tab === 'account' && (
          <div className="tab-body account-tab-body">
            <PrimaryButton onClick={onLogout}>logout</PrimaryButton>
          </div>
        )}
      </div>
    </Dialog>
  );
});

export default React.forwardRef<DialogMethods>(SettingsDialog);
