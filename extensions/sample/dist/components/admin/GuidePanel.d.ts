import React from 'react';
type GuideItem = {
    title: string;
    description: string;
};
type GuidePanelProps = {
    title: string;
    intro: string;
    items?: GuideItem[];
    compact?: boolean;
};
export default function GuidePanel({ title, intro, items, compact }: GuidePanelProps): React.JSX.Element;
export {};
