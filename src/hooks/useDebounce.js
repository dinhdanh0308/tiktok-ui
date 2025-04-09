import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handle = setTimeout(() => setDebounceValue(value), delay);
        // + Nếu chưa có clearTimeout thì 500ms sau nó vẫn setDebounceValue nên debounceValue nó vẫn nhận đc value
        // + Còn có clearTimeout thì chưa đến 500ms nó đã xoá đi cái setTimeout trước luôn rồi nên là nó sẽ ko setTimeout
        // nữa chỉ khi mình dừng gõ thì nó mới ko clear
        return () => clearTimeout(handle);
    }, [value]);
    return debounceValue;
}

export default useDebounce;
