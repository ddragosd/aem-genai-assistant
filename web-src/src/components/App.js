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
import React from 'react';
import { ToastContainer } from '@react-spectrum/toast';
import {
  Grid,
} from '@adobe/react-spectrum';
import { ConsentDialog } from './ConsentDialog.js';
import {SidePanel} from './SidePanel.js';
import { WorkspacePanel} from './WorkspacePanel.js';
import {useRecoilValue} from 'recoil';
import {NEW_SESSION, viewState} from '../state/ViewState.js';
import {PromptTemplatesPanel} from './PromptTemplatesPanel.js';

export function App() {
  const view = useRecoilValue(viewState);
  return (
    <>
      <ToastContainer />
      <ConsentDialog />
      <Grid
        columns={['250px', '1fr']}
        rows={['100%']}
        gap={'size-300'}
        UNSAFE_style={{ padding: '25px 25px 0 25px' }}
        width="100%" height="100%">
        <SidePanel width="100%" height="100%" />
        { view === NEW_SESSION ? <PromptTemplatesPanel/> : <WorkspacePanel /> }
      </Grid>
    </>
  )
}
