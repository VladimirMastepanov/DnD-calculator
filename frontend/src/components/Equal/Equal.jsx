import { memo } from 'react';
import { useAtom } from 'jotai';
import { modeAtom, MODES, displayValueAtom } from '../../state/atoms';
import cn from 'classnames';
import './Equal.css';

const Equal = () => {
  const [mode] = useAtom(modeAtom);
  const [displayValue, setDisplayValue] = useAtom(displayValueAtom);
  const operators = ['+', '-', '*', '/'];
  const MAX_LENGTH = 15;

  const calculateSingleOperation = (a, operator, b) => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        if (b === 0) return 'Bad idea';
        return parseFloat(a / b).toFixed(13);
      default:
        return 'Invalid operator';
    }
  };

  const calculateExpression = (expression) => {
    const parts = expression.split(/([-+*/])/).filter(Boolean);
  
    let stack = [];
  
    for (let i = 0; i < parts.length; i += 1) {
      if (operators.includes(parts[i])) {
        const operator = parts[i];
        const prev = parseFloat(stack.pop());
        const next = parseFloat(parts[i + 1]);
  
        if (operator === '*' || operator === '/') {
          stack.push(calculateSingleOperation(prev, operator, next));
          i += 1;
        } else {
          stack.push(prev, operator);
        }
      } else {
        const num = parseFloat(parts[i]);
        if (!isNaN(num)) {
          stack.push(num);
        } else {
          return 'Invalid expression';
        }
      }
    }
  
    let result = stack[0];
    for (let i = 1; i < stack.length; i += 2) {
      const operator = stack[i];
      const next = stack[i + 1];
      result = calculateSingleOperation(result, operator, next);
    }
    return result.toString();
  };

  const handlePressEqual = () => {
    if (operators.includes(displayValue.slice(-1))) {
      const newValue = displayValue.slice(0, -1);
      const res = calculateExpression(newValue);
      setDisplayValue(
        res.length >= MAX_LENGTH
          ? res.slice(0, MAX_LENGTH)
          : res
      );
    } else {
      const res = calculateExpression(displayValue);
      setDisplayValue(
        res.length >= MAX_LENGTH
          ? res.slice(0, MAX_LENGTH)
          : res
      );
    }
  };

  return (
    <div className={cn('btn-equal', {
      'btn-equal__constructor': mode === MODES.CONSTRUCTOR,
    })}>
      <button onClick={handlePressEqual} className={cn('equal', {
        'equal__constructor': mode === MODES.CONSTRUCTOR,
      })}>=</button>
    </div>
  )
};

export default memo(Equal);
