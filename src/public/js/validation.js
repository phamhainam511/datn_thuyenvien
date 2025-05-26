function setupValidation() {
    document.querySelectorAll('.validate-int').forEach(input => {
        input.addEventListener('input', () => {
            const selection = input.selectionStart;
            const data_old = input.value;
            const data_new = data_old.replace(/[^0-9]/g, '');
            if (data_old !== data_new) {
                input.value = data_new;
                input.setSelectionRange(selection - 1, selection - 1);
            }
        });
    });
    document.querySelectorAll('.validate-float').forEach(input => {
        input.addEventListener('input', () => {
            const selection = input.selectionStart;
            let data_old = input.value;
            const arr = data_old.split('.');
            let data_new = arr[0].replace(/[^0-9]/g, '');
            if (arr.length > 1) {
                data_new += '.' + arr[1].replace(/[^0-9]/g, '');
            }
            if (data_old !== data_new) {
                input.value = data_new;
                input.setSelectionRange(selection - 1, selection - 1);
            }
        });
    });

    document.querySelectorAll('.validate-text').forEach(input => {
        input.addEventListener('input', () => {
            const selection = input.selectionStart;
            const data_old = input.value;
            const data_new = data_old.replace(/[0-9]/g, '');
            if (data_old !== data_new) {
                input.value = data_new;
                input.setSelectionRange(selection - 1, selection - 1);
            }
        });
    });

    document.querySelectorAll('.validate-int, .validate-float').forEach(input => {
        input.addEventListener('blur', () => {
            const min = parseFloat(input.dataset.min || '-Infinity');
            const max = parseFloat(input.dataset.max || 'Infinity');
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                if (value < min) {
                    input.value = min;
                } else if (value > max) {
                    input.value = max;
                }
            }
        });
    });

    document.querySelectorAll('.validate-email').forEach(input => {
        input.addEventListener('blur', () => {
            const email = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
            const value = input.value.trim();
            if (value !== '' && !email.test(value)) {
                input.setCustomValidity('Email không hợp lệ');
                input.reportValidity();
            } else {
                input.setCustomValidity('');
            }
        });
        input.addEventListener('input', () => {
            input.setCustomValidity('');
        });
    });
}

document.addEventListener('DOMContentLoaded', setupValidation);