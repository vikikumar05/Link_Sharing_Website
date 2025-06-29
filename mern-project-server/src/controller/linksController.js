const { get } = require("mongoose");

const linksController = {

    create: async (request, response) => {
        const {campaign_title, original_url, category } = request.body;
        try {
            const link = new Links({
                compaignTitle: campaign_title,
                originalUrl: original_url,
                category: category,
                user: request.user.id
            });
            link.save();
            response.json({
                data: {linkId: link._id}
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAll: async (request, response) => {
        try{
            const links = await Links.find({ user: request.user.id}).sort({ createdAt: -1 });
            response.json({
                data: links
            });
        }catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getById: async (request, response) => {

        try{
            const linkId = request.params.id;

            if(!linkId) {
                return response.status(401).json({ error: 'Link ID is required' });
            }

            const link = await Links.findById(linkId);
            if(!link) {
                return response.status(404).json({ error: 'Link not found' });
            }

            if(link.user.toString() !== request.user.id) {
                return response.status(403).json({ error: 'Unauthorized access' });
            }
            response.json({
                data: link
            });

        }catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    update: async (request, response) =>{

        try{
            const linkId = request.params.id;
            if (!linkId) {
                return response.status(401).json({ error: 'Link ID is required' });
            }
            let link = await Links.findById(linkId);
            if (!link) {
                return response.status(404).json({ error: 'Link not found' });
            }
            
            if (link.user.toString() !== request.user.id) {
                return response.status(403).json({
                    error: 'Unauthorized access'
                });
            }

            const {campaign_title, original_url, category } = request.body;
            link = await Links.findByIdAndUpdate(linkId, {
                campaignTitle: campaign_title,
                originalUrl: original_url,
                category: category
            }, { new: true });  // new: true flag makes sure mongodb returns updated data after the update operation

            // Return updated link data
            response.json({ data: link });
            
        }catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    delete: async (request, response) => {
        try {
            const linkId = request.params.id;
            if (!linkId) {
                return response.status(401).json({ error: 'Link ID is required' });
            }
            let link = await Links.findById(linkId);
            if (!link) {
                return response.status(404).json({ error: 'Link not found' });
            }

            // Make sure the link indeed belong to the logged in user.
            if (link.user.toString() !== request.user.id) {
                return response.status(403).json({
                    error: 'Unauthorized access'
                });
            }

            await link.deleteOne();
            response.json({ message: 'Link deleted'});

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    },


    redirect: async (request, response) => {
        try {
            const linkId = request.params.id;
            if (!linkId) {
                return response.status(401).json({ error: 'Link ID is required' });
            }

            let link = await Links.findById(linkId);
            if (!link) {
                return response.status(404).json({ error: 'Link not found' });
            }

            link.clickCount += 1;
            await link.save();

            response.redirect(link.originalUrl);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


module.exports = linksController;
