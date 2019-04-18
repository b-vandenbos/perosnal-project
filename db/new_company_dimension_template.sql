INSERT INTO dimension (
    company_id,
    index,
    q_dimension
) VALUES
($1, '1', 'My Job'),
($1,'2', 'My Supervisor'),
($1,'3', 'My Team'),
($1,'4', 'My Organization');

SELECT * FROM dimension WHERE company_id = $1;