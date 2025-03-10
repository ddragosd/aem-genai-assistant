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
  Flex, Grid, Heading, Image, ProgressCircle,
} from '@adobe/react-spectrum';

import React, { Suspense, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';
import { ErrorBoundary } from 'react-error-boundary';
import NewSessionBanner from '../assets/new-session-banner.png';
import { PromptTemplateCard } from './PromptTemplateCard.js';
import { NewButton } from './NewButton.js';
import { sessionState } from '../state/SessionState.js';
import { ViewType, viewTypeState } from '../state/ViewType.js';
import { formatTimestamp } from '../helpers/FormatHelper.js';
import { SignOutButton } from './SignOutButton.js';
import { promptTemplateListState } from '../state/PromptTemplateListState.js';

function PromptTemplateListView({ onSelect }) {
  const promptTemplates = useRecoilValue(promptTemplateListState);
  return (
    <Grid
      width={'100%'}
      alignItems={'center'}
      columns={'repeat(auto-fill, minmax(250px, 1fr))'} gap={'size-200'}>
      {
        promptTemplates
        && promptTemplates
          .map((template, index) => (
            <PromptTemplateCard
              key={index}
              template={template}
              onClick={() => onSelect(promptTemplates[index])} />
          ))
      }
    </Grid>
  );
}

export function NewSessionPanel({ props }) {
  const setCurrentSession = useSetRecoilState(sessionState);
  const setViewType = useSetRecoilState(viewTypeState);

  const handleSelect = useCallback((selectedTemplate) => {
    const timestamp = Date.now();
    const session = {
      id: uuid(),
      name: `${selectedTemplate.label} ${formatTimestamp(timestamp)}`,
      description: selectedTemplate.description,
      timestamp,
      prompt: selectedTemplate.template,
      results: [],
    };
    setCurrentSession(session);
    setViewType(ViewType.CurrentSession);
  }, [setCurrentSession, setViewType]);

  return (
    <Grid
      {...props}
      columns={['1fr']}
      rows={['min-content', 'min-content', '1fr']}
      height={'100%'}
      UNSAFE_style={{
        padding: '25px 50px', overflow: 'auto',
      }}>

      <Flex
        direction={'column'}
        position={'relative'}
        width={'70%'}
        gap={0}
        height={'300px'}
        justifySelf={'center'}
        marginTop={20}
        marginBottom={20}>
        <Image
          src={NewSessionBanner}
          objectFit={'cover'}
          marginBottom={20}
          UNSAFE_style={{ borderRadius: '20px' }}/>
        <h3 style={{ padding: 0, margin: 0 }}>
          Create high quality content quickly then measure it with experimentation or publish it to your site.
        </h3>
        <SignOutButton right={-150} top={50}/>
      </Flex>

      <Heading level={4} alignSelf={'start'}>Prompts</Heading>

      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<ProgressCircle isIndeterminate />}>
          <PromptTemplateListView onSelect={handleSelect} />
        </Suspense>
      </ErrorBoundary>
    </Grid>
  );
}
