import { memo } from 'react';
import { useAtom } from 'jotai';
import { modeAtom, MODES, displayValueAtom } from '../../state/atoms';
import cn from 'classnames'
import './Equal.css';

const Equal = () => {
  const [mode] = useAtom(modeAtom);
  const [displayValue, setDisplayValue] = useAtom(displayValueAtom);
  const operators = ['+', '-', '*', '/'];

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
        return a / b;
      default:
        return 'Error: Invalid operator';
    }
  };

  const calculateExpression = (expression) => {
    const parts = expression.split(/([-+*/])/).filter(Boolean);
    let stack = [];

    // Выполняем умножение и деление сначала
    for (let i = 0; i < parts.length; i++) {
      if (operators.includes(parts[i])) {
        const operator = parts[i];
        const prev = parseFloat(stack.pop());
        const next = parseFloat(parts[++i]);

        if (operator === '*' || operator === '/') {
          const result = calculateSingleOperation(prev, operator, next);
          console.log(result);
          stack.push(result);
        } else {
          stack.push(prev, operator); // Для сложения и вычитания
          stack.push(next);
        }
      } else {
        stack.push(parseFloat(parts[i]));
      }
    }

    // Выполняем сложение и вычитание
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
      setDisplayValue(calculateExpression(newValue));
    } else {
      setDisplayValue(calculateExpression(displayValue))
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
