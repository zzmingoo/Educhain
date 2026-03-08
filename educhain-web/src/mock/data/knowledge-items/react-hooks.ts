/**
 * React Hooks 完全指南
 */

import { generateMockShareCode } from '../../utils/shareCode';

export const reactHooksKnowledge = {
  id: 1,
  shareCode: generateMockShareCode(1),
  title: 'React Hooks 完全指南 - 从入门到精通',
  content: `# React Hooks 完全指南 - 从入门到精通

## 📚 引言

React Hooks 是 React 16.8 引入的革命性特性，它让你在不编写 class 的情况下使用 state 以及其他的 React 特性。这个特性彻底改变了 React 组件的编写方式，让函数组件拥有了类组件的所有能力。

### 为什么需要 Hooks？

在 Hooks 出现之前，React 开发者面临以下问题：

1. **组件之间复用状态逻辑很难**
   - 需要使用 render props 或高阶组件
   - 导致组件嵌套地狱
   - 代码难以理解和维护

2. **复杂组件变得难以理解**
   - 生命周期方法中包含不相关的逻辑
   - 相关逻辑被拆分到不同的生命周期方法中
   - 难以拆分和测试

3. **Class 组件的困扰**
   - this 指向问题
   - 需要绑定事件处理器
   - 代码冗长
   - 难以优化

### Hooks 的优势

✅ **更简洁的代码** - 函数组件比类组件更简洁
✅ **更好的逻辑复用** - 自定义 Hooks 让逻辑复用变得简单
✅ **更容易理解** - 没有 this，没有生命周期的困扰
✅ **更好的性能优化** - 使用 useMemo 和 useCallback 轻松优化
✅ **更好的类型推导** - TypeScript 支持更友好

---

## 🎯 核心 Hooks 详解

### 1. useState - 状态管理

最常用的 Hook，用于在函数组件中添加状态。

**基础用法：**

\`\`\`typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John', age: 25 });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev + 1)}>Increment (函数式)</button>
    </div>
  );
}
\`\`\`

**关键点：**
- 初始值只在首次渲染时使用
- setState 可以接收新值或更新函数
- 使用函数式更新避免闭包陷阱
- 对象和数组需要创建新引用才能触发更新

**最佳实践：**

\`\`\`typescript
// ❌ 错误：直接修改对象
setUser(user.age = 26);

// ✅ 正确：创建新对象
setUser({ ...user, age: 26 });

// ✅ 更好：使用函数式更新
setUser(prev => ({ ...prev, age: 26 }));
\`\`\`

**惰性初始化：**

\`\`\`typescript
// 如果初始值计算成本高，使用函数
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
\`\`\`

### 2. useEffect - 副作用处理

用于处理副作用操作，如数据获取、订阅、手动修改 DOM 等。

**基础用法：**

\`\`\`typescript
import { useEffect, useState } from 'react';

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        if (!cancelled) {
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    // 清理函数
    return () => {
      cancelled = true;
    };
  }, [userId]); // 依赖数组

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
\`\`\`

**useEffect 的执行时机：**
1. 组件挂载后执行
2. 依赖项变化后执行
3. 组件卸载前执行清理函数

**常见使用场景：**
- 数据获取
- 订阅/取消订阅
- 手动修改 DOM
- 设置定时器
- 日志记录

**依赖数组规则：**

\`\`\`typescript
// 每次渲染都执行
useEffect(() => {
  console.log('Every render');
});

// 只在挂载时执行一次
useEffect(() => {
  console.log('Mount only');
}, []);

// 依赖变化时执行
useEffect(() => {
  console.log('Dependency changed');
}, [dependency]);
\`\`\`

### 3. useContext - 上下文共享

用于在组件树中共享数据，避免 props 层层传递。

\`\`\`typescript
import { createContext, useContext, useState } from 'react';

// 创建 Context
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

// Provider 组件
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用 Context
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
      }}
    >
      Toggle Theme
    </button>
  );
}
\`\`\`

### 4. useReducer - 复杂状态管理

适合管理包含多个子值的复杂 state 对象。

\`\`\`typescript
import { useReducer } from 'react';

type State = {
  count: number;
  step: number;
};

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <input
        type="number"
        value={state.step}
        onChange={(e) => dispatch({ type: 'setStep', payload: Number(e.target.value) })}
      />
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
\`\`\`

### 5. useCallback - 函数缓存

返回一个记忆化的回调函数，避免不必要的重新渲染。

\`\`\`typescript
import { useCallback, useState, memo } from 'react';

// 子组件使用 memo 优化
const ExpensiveChild = memo(({ onClick }: { onClick: () => void }) => {
  console.log('ExpensiveChild rendered');
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // ❌ 每次渲染都创建新函数
  const handleClick = () => {
    setCount(c => c + 1);
  };

  // ✅ 使用 useCallback 缓存函数
  const handleClickMemoized = useCallback(() => {
    setCount(c => c + 1);
  }, []); // 依赖数组为空，函数永远不变

  return (
    <div>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      <ExpensiveChild onClick={handleClickMemoized} />
      <button onClick={() => setOther(o => o + 1)}>Update Other</button>
    </div>
  );
}
\`\`\`

### 6. useMemo - 值缓存

返回一个记忆化的值，用于性能优化。

\`\`\`typescript
import { useMemo, useState } from 'react';

function ExpensiveCalculation({ items }: { items: number[] }) {
  const [filter, setFilter] = useState('');

  // ❌ 每次渲染都计算
  const sum = items.reduce((acc, item) => acc + item, 0);

  // ✅ 使用 useMemo 缓存计算结果
  const sumMemoized = useMemo(() => {
    console.log('Calculating sum...');
    return items.reduce((acc, item) => acc + item, 0);
  }, [items]); // 只在 items 变化时重新计算

  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item.toString().includes(filter));
  }, [items, filter]);

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items"
      />
      <p>Sum: {sumMemoized}</p>
      <p>Filtered: {filteredItems.join(', ')}</p>
    </div>
  );
}
\`\`\`

### 7. useRef - 引用管理

用于保存可变值，不会触发重新渲染。

\`\`\`typescript
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(\`Rendered \${renderCount.current} times\`);
  });

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
      <p>Render count: {renderCount.current}</p>
    </div>
  );
}
\`\`\`

---

## 🔧 自定义 Hooks

自定义 Hooks 是 React Hooks 最强大的特性之一，它让你可以提取组件逻辑到可复用的函数中。

### 示例 1: useLocalStorage

\`\`\`typescript
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// 使用
function App() {
  const [name, setName] = useLocalStorage('name', 'John');
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
\`\`\`

### 示例 2: useFetch

\`\`\`typescript
import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}
\`\`\`

### 示例 3: useDebounce

\`\`\`typescript
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 使用
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // 执行搜索
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
\`\`\`

---

## ⚠️ 常见陷阱与解决方案

### 1. 闭包陷阱

\`\`\`typescript
// ❌ 问题：使用旧的 count 值
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1); // 总是使用初始的 count (0)
    }, 1000);
    return () => clearInterval(timer);
  }, []); // 空依赖数组

  return <div>{count}</div>;
}

// ✅ 解决方案：使用函数式更新
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1); // 使用最新的 count
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}
\`\`\`

### 2. 依赖数组遗漏

\`\`\`typescript
// ❌ 问题：遗漏依赖
function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults(query).then(setResults);
  }, []); // 遗漏了 query 依赖

  return <div>{/* ... */}</div>;
}

// ✅ 解决方案：添加所有依赖
function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults(query).then(setResults);
  }, [query]); // 包含所有依赖

  return <div>{/* ... */}</div>;
}
\`\`\`

### 3. 无限循环

\`\`\`typescript
// ❌ 问题：每次渲染都创建新对象
function UserList() {
  const [users, setUsers] = useState([]);
  const filters = { active: true }; // 每次渲染都是新对象

  useEffect(() => {
    fetchUsers(filters).then(setUsers);
  }, [filters]); // filters 每次都不同，导致无限循环

  return <div>{/* ... */}</div>;
}

// ✅ 解决方案：使用 useMemo 或将对象移到组件外
const FILTERS = { active: true };

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers(FILTERS).then(setUsers);
  }, []); // 依赖数组为空

  return <div>{/* ... */}</div>;
}
\`\`\`

---

## 📋 最佳实践

1. **只在最顶层使用 Hooks**
   - 不要在循环、条件或嵌套函数中调用 Hooks
   - 确保 Hooks 的调用顺序一致

2. **只在 React 函数中调用 Hooks**
   - 在 React 函数组件中调用
   - 在自定义 Hooks 中调用

3. **使用 ESLint 插件**
   - 安装 eslint-plugin-react-hooks
   - 自动检查 Hooks 规则

4. **合理拆分自定义 Hooks**
   - 提取可复用的逻辑
   - 保持单一职责原则

5. **注意依赖数组**
   - 包含所有使用的外部变量
   - 使用 ESLint 规则自动检查

6. **性能优化要适度**
   - 不要过度使用 useMemo 和 useCallback
   - 先测量，再优化

---

## 🎓 总结

React Hooks 是现代 React 开发的基石，掌握它们对于编写高质量的 React 应用至关重要。通过本指南，你应该已经了解了：

- Hooks 的基本概念和优势
- 核心 Hooks 的使用方法
- 如何创建自定义 Hooks
- 常见陷阱和最佳实践

继续实践，你会发现 Hooks 让 React 开发变得更加优雅和高效！

---

**参考资源：**
- [React 官方文档 - Hooks](https://react.dev/reference/react)
- [Hooks FAQ](https://react.dev/learn#using-hooks)
- [自定义 Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)`,
  type: 'TEXT' as const,
  uploaderId: 2,
  uploaderName: '小铭',
  uploaderAvatar: '/avatars/zzm.jpeg',
  categoryId: 11,
  categoryName: 'React',
  tags: 'React,Hooks,前端开发,JavaScript',
  status: 1,
  createdAt: '2025-12-01T10:30:00Z',
  updatedAt: '2025-12-15T14:20:00Z',
  contentHash: 'hash_react_hooks_guide',
};
