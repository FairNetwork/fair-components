import { Meta, StoryFn } from '@storybook/react';
import Card from "../src/components/card/Card";

export default {
  title: 'Core/Card',
  component: Card,
  args: {},
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args}>Test</Card>;

export const General = Template.bind({});
