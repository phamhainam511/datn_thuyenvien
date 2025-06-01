'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('thannhan', [
      {
        thuyenvien_id: 1,
        hotenbo: '',
        sdtbo: '',
        hotenme: '',
        sdtme: '',
        hotenvo: 'Giang Thi Nhan',
        sdtvo: '0989409922',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Đông Hải 2, Hải An , Hải Phòng',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 2,
        hotenbo: '',
        sdtbo: '',
        hotenme: 'Trinh Thi To',
        sdtme: '0836978000',
        hotenvo: 'Nguyen Thi Tham',
        sdtvo: '0975795137',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Xuan Tien, Xuan Truong , Nam Dinh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 3,
        hotenbo: 'Nguyen Sy Ngu',
        sdtbo: '0438431689',
        hotenme: 'Nguyen Thi Buoi',
        sdtme: '0438436301',
        hotenvo: '',
        sdtvo: '',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Quynh Phu, Thai Binh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 4,
        hotenbo: 'Pham Van Du',
        sdtbo: '0438431689',
        hotenme: 'Le Thi Ly',
        sdtme: '0438432275',
        hotenvo: '',
        sdtvo: '',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Tu Son , Kien Thuy , Hai Phong',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 4,
        hotenbo: 'Trinh Van Luat',
        sdtbo: '0438431689',
        hotenme: '',
        sdtme: '',
        hotenvo: 'Tran Thi Thanh Loan',
        sdtvo: '',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Vinh Quang , Tien Lang , Hai Phong',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 5,
        hotenbo: 'Le Dac Tuan',
        sdtbo: '04274189',
        hotenme: '',
        sdtme: '',
        hotenvo: 'Do Thanh Huyen',
        sdtvo: '09382653',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Thanh Luong , Vinh Bao , Hai Phong',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 6,
        hotenbo: 'Nguyen Van Sinh',
        sdtbo: '042741289',
        hotenme: '',
        sdtme: '',
        hotenvo: 'Le Thi Thu Trang',
        sdtvo: '094765924',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Dong Tan , Thanh Hoa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 7,
        hotenbo: '',
        sdtbo: '',
        hotenme: 'Pham Thi Khuong',
        sdtme: '042741289',
        hotenvo: 'Trieu Thi Hai',
        sdtvo: '094761314',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Cam Thuy , Thanh Hoa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 8,
        hotenbo: 'Pham Dinh Toai',
        sdtbo: '0917517843',
        hotenme: '',
        sdtme: '',
        hotenvo: 'Nguyen Thi Hao',
        sdtvo: '094736574',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Ly Hoc ,Vinh Bao,Hai Phong',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        thuyenvien_id: 9,
        hotenbo: 'Bui Ba Tem',
        sdtbo: '0917487843',
        hotenme: '',
        sdtme: '',
        hotenvo: 'Nguyen Thi Kim Oanh',
        sdtvo: '094736574',
        nguoigiamho: '',
        sdtgiamho: '',
        diachi: 'Thuy Truong,Thai Thuy,Thai Binh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('thannhan', null, {});
  }
};
