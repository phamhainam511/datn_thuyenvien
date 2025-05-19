import db from '../models';  
import DashBoardService from '../services/DashBoardServices';

export const index = async (req, res) => {
    try {
        const crewWorkingCount = await DashBoardService.getCrewWorkingCount();

        res.render('trangchu.ejs', {
            activeMenu: 'dashboard',
            user: req.session.user,
            dashboardData: {
                crewWorkingCount
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi server');
    }
};
