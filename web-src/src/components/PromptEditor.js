/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import React, { useState } from 'react';
/* eslint-disable-next-line import/no-named-default */
import { default as SimpleEditor } from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { css, injectGlobal } from '@emotion/css';
import { Global } from '@emotion/react';
import { NO_VALUE_STRING, renderPrompt } from '../helpers/PromptRenderer.js';

import { promptState } from '../state/PromptState.js';
import { parametersState } from '../state/ParametersState.js';

languages.custom = {
  function: /{[^@#]([^{}]+)}/,
  keyword: /{@([^{}]+)}/,
  regex: new RegExp(`${NO_VALUE_STRING}`),
  comment: /{#([^{}]+)}/,
};

const style = {
  frame: css`
    width: 100%;
    height: 150px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
  `,
  editable: css`
    background-color: white;
    height: 500px;
    border: 2px solid #ccc;
  `,
  container: css`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
  `,
  editor: css`
    font-family: Adobe Clean,serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    position: absolute;
    & textarea:focus  {
      outline: none;
    }
  `,
};

function PromptEditor(props) {
  const [viewSource, setViewSource] = useState(false);
  const [prompt, setPrompt] = useRecoilState(promptState);
  const parameters = useRecoilValue(parametersState);

  return (
    <div {...props} className={[style.frame, viewSource && style.editable].join(' ')}>
      <Global styles={injectGlobal`
        .token.regex {
          font-weight: bold !important;
          color: #0095ff !important;
        }
        .token.function, .token.regex {
          color: #0095ff !important;
        }
        .token.keyword {
          color: #b25b5b !important;
        }
        .token.comment {
          color: #8a8a8a !important;
        }
      `}/>
      <div className={style.container}>
        <SimpleEditor
          className={style.editor}
          onFocus={() => setViewSource(true)}
          onBlur={() => setViewSource(false)}
          value={viewSource ? prompt : renderPrompt(prompt, parameters)}
          onValueChange={setPrompt}
          highlight={(code) => highlight(code, languages.custom, 'custom')}
          style={{ minHeight: '100%' }}
          readOnly={!viewSource}
        />
      </div>
    </div>
  );
}

export default PromptEditor;
