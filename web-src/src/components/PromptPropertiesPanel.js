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
import {
  Flex, Grid, Image, Link, Text,
} from '@adobe/react-spectrum';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { css } from '@emotion/css';
import { InputsView } from './InputsView.js';
import { GenerateButton } from './GenerateButton.js';

import GenerateIcon from '../assets/generate.svg';
import ChevronLeft from '../assets/chevron-left.svg';
import { ResetButton } from './ResetButton.js';
import { sessionState } from '../state/SessionState.js';
import { ViewType, viewTypeState } from '../state/ViewType.js';

const styles = {
  promptPropertiesPanel: css`
    padding: 20px 0;
    border-right: 2px solid rgb(224, 224, 224); 
  `,
  breadcrumbsLink: css`
    color: var(--alias-content-neutral-subdued-default, var(--alias-content-neutral-subdued-default, #464646));
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  `,
  promptName: css`
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  `,
  actions: css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: var(--spectrum-global-dimension-size-100);
    border-top: 1px solid rgb(224, 224, 224);
    padding: 20px 10px 0;
    grid-area: buttons;
  `,
  promptFlexItems: css`
    padding: 15px 20px;
  `,
};

export function PromptPropertiesPanel(props) {
  const currentSession = useRecoilValue(sessionState);
  const [viewType, setViewType] = useRecoilState(viewTypeState);

  return (
    <Grid
      {...props}
      UNSAFE_className={styles.promptPropertiesPanel}
      areas={['breadcrumbs', 'info', 'form', 'buttons']}
      columns={['auto']}
      rows={['min-content', 'min-content', '1fr', 'min-content']}
      gap={'size-100'}>

      <Flex UNSAFE_className={styles.promptFlexItems} UNSAFE_style={{ paddingTop: '0', paddingBottom: '0' }} direction={'row'} justifyContent={'left'} alignItems={'center'} gridArea={'breadcrumbs'}>
        <Image src={ChevronLeft} width={'24px'}/>
        <Link href="#" onPress={() => setViewType(ViewType.NewSession)} UNSAFE_className={styles.breadcrumbsLink}>Prompts</Link>
      </Flex>

      { currentSession
        ? <Flex UNSAFE_className={styles.promptFlexItems} UNSAFE_style={{ borderBottom: '1px solid rgb(224, 224, 224)' }} direction={'column'} justifyContent={'stretch'} alignItems={'stretch'} gridArea={'info'}>
          <Flex UNSAFE_style={{ borderRadius: '8px', background: '#E0F2FF', padding: '10px' }} gap={'size-100'} alignItems={'center'}>
            <Image src={GenerateIcon} width={'24px'}/>
            <Text UNSAFE_className={styles.promptName}>{ currentSession.name ?? 'Empty' }</Text>
          </Flex>
          <Text UNSAFE_style={{ padding: '10px' }}>{ currentSession.description ?? 'Empty' }</Text>
        </Flex>
        : <div></div>
      }

      <Flex direction={'column'} UNSAFE_className={styles.promptFlexItems}>
        <h3>Inputs</h3>
        <Flex direction={'column'} UNSAFE_style={{ position: 'relative', height: '100%' }}>
          <InputsView/>
        </Flex>
      </Flex>

      <div className={styles.actions}>
        <ResetButton/>
        <GenerateButton/>
      </div>

    </Grid>
  );
}
