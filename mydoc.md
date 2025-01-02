# Day 1 Explanation

## 1. TSX Syntax

> **TSX & JSX** adalah jenis file yang digunakan dalam struktur folder React. 
> JSX adalah sintaks yang digunakan oleh React untuk mendeskripsikan tampilan dan code,
> bersamaan dengan TSX adalah ekstensi TypeScript untuk JSX, yang memungkinkan Anda menulis HTML syntax dalam file TypeScript dan versi strict dari JSX. 

### Contoh Kode
```tsx
import React from 'react';

const Greeting: React.FC = () => {
  return <h1>Hello, World!</h1>;
};

export default Greeting;
```

### 2. Functional component
>Functional Component adalah cara untuk mendefinisikan komponen dalam React menggunakan fungsi JavaScript. Komponen ini menerima props sebagai argumen dan mengembalikan elemen React.

Contoh Kode

```tsx
import React from 'react';

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return <button>{label}</button>;
};

export default Button;
```

### 3. Hooks

>Hooks adalah fitur baru di React yang memungkinkan Anda menggunakan state dan lifecycle methods dalam komponen fungsional. Hooks memberikan cara yang lebih bersih dan lebih mudah untuk mengelola state dan efek samping dalam komponen.

Jenis-jenis Hooks

#### a. useState

> Digunakan untuk mengelola state dalam komponen fungsional.
Ilustrasi: Bayangkan sebuah gedung perusahaan. useState adalah seperti manajer yang mengelola jumlah karyawan di gedung tersebut. Setiap kali ada karyawan baru, manajer memperbarui jumlah karyawan.
Contoh Kode
tsx

```tsx
import React, { useState } from 'react';

const EmployeeCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Jumlah Karyawan: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah Karyawan</button>
    </div>
  );
};

export default EmployeeCounter;
```
#### b. useEffect

> Digunakan untuk mengelola efek samping dalam komponen, seperti fetching data atau mengatur subscription.
Ilustrasi: useEffect adalah seperti tim pemasaran yang melakukan riset pasar. Setiap kali ada perubahan dalam data, tim ini melakukan riset ulang untuk memastikan strategi pemasaran tetap relevan.


```tsx
import React, { useEffect, useState } from 'react';

const DataFetcher: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dirender

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
};

export default DataFetcher;
```
#### c. useContext

> Digunakan untuk mengakses context dalam komponen fungsional.
Ilustrasi: useContext adalah seperti sistem komunikasi internal di gedung perusahaan. Ini memungkinkan semua karyawan untuk berbagi informasi dengan mudah tanpa harus berkomunikasi secara langsung satu sama lain.


```tsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

const ThemedComponent: React.FC = () => {
  const theme = useContext(ThemeContext);
  return <div className={theme}>This is a {theme} themed component!</div>;
};

const App: React.FC = () => {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedComponent />
    </ThemeContext.Provider>
  );
};

export default App;
```
#### d. useReducer

>Digunakan untuk mengelola state yang lebih kompleks dengan cara yang mirip dengan Redux.
Ilustrasi: useReducer adalah seperti manajer proyek yang mengelola berbagai tim dalam perusahaan. Setiap tim memiliki tugas tertentu, dan manajer proyek mengoordinasikan semua tim untuk mencapai tujuan bersama.
Contoh Kode
tsx


### 4. Reusable Component

> Reusable Component adalah komponen yang dirancang untuk digunakan kembali di berbagai tempat dalam aplikasi. Dengan membuat komponen yang dapat digunakan kembali, Anda dapat mengurangi duplikasi kode dan meningkatkan konsistensi UI.

```tsx
import React from 'react';

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Card;
```

### 5. Handling User Event + Input

> Handling User Events and Input adalah proses menangani interaksi pengguna dengan aplikasi, seperti klik tombol, perubahan input, dan pengiriman formulir. Ini memungkinkan aplikasi untuk merespons tindakan pengguna dan memperbarui UI sesuai kebutuhan

```tsx
import React, { useState } from 'react';

const InputComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>You typed: {inputValue}</p>
    </div>
  );
};

export default InputComponent;
```