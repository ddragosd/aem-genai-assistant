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
  ActionButton, Flex, Tooltip, TooltipTrigger, View,
} from '@adobe/react-spectrum';
import React from 'react';
import { css } from '@emotion/css';
import Copy from '@spectrum-icons/workflow/Copy';
import Delete from '@spectrum-icons/workflow/Delete';
import { motion } from 'framer-motion';
import { useToggleFavorite } from '../state/ToggleFavoriteHook.js';

const styles = {
  card: css`
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
  `,
  variant: css`
    padding: 10px;
    min-height: 100px;
  `,
};

export function FavoriteCard({ variant, ...props }) {
  const toggleFavorite = useToggleFavorite();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: 'easeIn', duration: 0.3 }}>
    <View
      {...props}
      UNSAFE_className={styles.card}>
      <div className={styles.variant}>{variant.content}</div>
        <View
          borderRadius="regular"
          paddingRight="24px">
          <Flex direction="row" gap="size-100" justifyContent="left">
            <TooltipTrigger delay={0}>
              <ActionButton
                isQuiet
                UNSAFE_className="hover-cursor-pointer"
                onPress={() => navigator.clipboard.writeText(variant.content)}>
                <Copy />
              </ActionButton>
              <Tooltip>Copy</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger delay={0}>
              <ActionButton
                isQuiet U
                NSAFE_className="hover-cursor-pointer"
                onPress={() => toggleFavorite(variant)}>
                <Delete />
              </ActionButton>
              <Tooltip>Remove</Tooltip>
            </TooltipTrigger>
          </Flex>
        </View>
      </View>
    </motion.div>
  );
}
