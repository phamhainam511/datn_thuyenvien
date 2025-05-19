import db from '../models';

async function getCrewWorkingCount() {
    const [results] = await db.sequelize.query(`
        SELECT COUNT(*) AS count
        FROM thuyenvien_trangthai tvtt
        INNER JOIN (
            SELECT thuyenvien_id, MAX(thoigian) AS latest_time
            FROM thuyenvien_trangthai
            GROUP BY thuyenvien_id
        ) latest
        ON tvtt.thuyenvien_id = latest.thuyenvien_id AND tvtt.thoigian = latest.latest_time
        INNER JOIN trangthai tt ON tvtt.trangthai_id = tt.id_trangthai
        WHERE tt.tentrangthai = 'Đang trên tàu'
    `);

    return results[0].count || 0;
}

export default { getCrewWorkingCount };
