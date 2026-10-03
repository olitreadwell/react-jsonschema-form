import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createFormComponent, expectToHaveBeenCalledWithFormData } from './testUtils';

const user = userEvent.setup();

describe('RatingWidget', () => {
  const uiSchema = { 'ui:widget': 'RatingWidget' };

  it('should render the default number of stars, offset by schema.minimum', () => {
    const { node } = createFormComponent({
      schema: { type: 'number', minimum: 1 },
      uiSchema,
    });

    const stars = node.querySelectorAll('[role="radio"]');
    expect(stars).toHaveLength(5);
    expect(stars[0]).toHaveAttribute('data-value', '1');
    expect(stars[0]).toHaveAttribute('aria-label', '1 star');
    expect(stars[4]).toHaveAttribute('data-value', '5');
  });

  it('should render the number of stars given by the stars option', () => {
    const { node } = createFormComponent({
      schema: { type: 'number' },
      uiSchema: { 'ui:widget': 'RatingWidget', 'ui:options': { stars: 3 } },
    });

    expect(node.querySelectorAll('[role="radio"]')).toHaveLength(3);
  });

  it('should cap the number of stars at 5 even when schema.maximum is higher', () => {
    const { node } = createFormComponent({
      schema: { type: 'number', maximum: 10 },
      uiSchema,
    });

    expect(node.querySelectorAll('[role="radio"]')).toHaveLength(5);
  });

  it('should mark stars up to and including the current value as filled', () => {
    const { node } = createFormComponent({
      schema: { type: 'number' },
      uiSchema,
      formData: 3,
    });

    const stars = node.querySelectorAll('[role="radio"]');
    expect(stars[2]).toHaveTextContent('★');
    expect(stars[4]).toHaveTextContent('☆');
    // aria-checked only marks the star matching the current value, not every filled star
    expect(stars[3]).toHaveAttribute('aria-checked', 'true');
    expect(stars[2]).toHaveAttribute('aria-checked', 'false');
  });

  it('should render heart symbols when shape is set to heart', () => {
    const { node } = createFormComponent({
      schema: { type: 'number' },
      uiSchema: { 'ui:widget': 'RatingWidget', 'ui:options': { shape: 'heart' } },
      formData: 1,
    });

    const stars = node.querySelectorAll('[role="radio"]');
    expect(stars[0]).toHaveTextContent('♥');
    expect(stars[2]).toHaveTextContent('♡');
  });

  it('should call onChange with the clicked star value', async () => {
    const { node, onChange } = createFormComponent({
      schema: { type: 'number' },
      uiSchema,
    });

    await user.click(node.querySelectorAll('[role="radio"]')[2]);

    expectToHaveBeenCalledWithFormData(onChange, 2, 'root');
  });

  it('should call onChange when Enter or Space is pressed on a star', () => {
    const { node, onChange } = createFormComponent({
      schema: { type: 'number' },
      uiSchema,
    });

    const star = node.querySelectorAll('[role="radio"]')[1];
    fireEvent.keyDown(star, { key: 'Enter' });
    fireEvent.keyDown(star, { key: ' ' });
    fireEvent.keyDown(star, { key: 'Tab' });

    expect(onChange).toHaveBeenCalledTimes(2);
    expectToHaveBeenCalledWithFormData(onChange, 1, 'root');
  });

  it.each([['disabled'], ['readonly']] as const)('should not call onChange when %s', async (prop) => {
    const { node, onChange } = createFormComponent({
      schema: { type: 'number' },
      uiSchema,
      [prop]: true,
    });

    await user.click(node.querySelectorAll('[role="radio"]')[2]);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should handle focus and blur events with the hovered star value', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const { node } = createFormComponent({
      schema: { type: 'number' },
      uiSchema,
      onFocus,
      onBlur,
    });

    const star = node.querySelectorAll('[role="radio"]')[3];
    const hiddenInput = node.querySelector('input[type="hidden"]')!;
    fireEvent.focus(star);
    fireEvent.blur(star);

    expect(onFocus).toHaveBeenLastCalledWith(hiddenInput.id, 3);
    expect(onBlur).toHaveBeenLastCalledWith(hiddenInput.id, 3);
  });

  it('should reflect the value in a hidden input for form submission', () => {
    const { node } = createFormComponent({
      schema: { type: 'number' },
      uiSchema,
      formData: 4,
    });

    expect(node.querySelector('input[type="hidden"]')).toHaveValue('4');
  });
});
