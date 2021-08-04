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
import classNames from 'classnames';

import FloatingCharacterCountdown from '../floating-character-countdown/FloatingCharacterCountdown';
import './TextField.scss';

export interface TextFieldProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: string;
  placeholder: string;
  handleSubmission: (string) => void;
}

const maxCharacterCount = 255;

export default function TextField(props: TextFieldProps): React.ReactElement {
  const { placeholder, type, handleSubmission, ...spanProps } = props;

  const [text, setText] = React.useState('');

  const handleTextChange = (changeEvent) => {
    setText(changeEvent.target.value);
  };

  const handleKeyPress = (keyPressEvent) => {
    if (keyPressEvent.key === 'Enter') {
      handleSubmission(text);
      setText('');
    }
  };

  const className = classNames('text-field', type);

  return (
    <span {...spanProps} className={className}>
      <input
        type="text"
        placeholder={placeholder}
        maxLength={maxCharacterCount}
        value={text}
        onChange={handleTextChange}
        onKeyPress={handleKeyPress}
      />
      <FloatingCharacterCountdown
        maxCharacterCount={maxCharacterCount}
        charsAreRunningOutThreshold={50}
        characterCount={text.length}
      />
    </span>
  );
}