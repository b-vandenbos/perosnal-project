INSERT INTO dimension (
    company_id,
    q_dimension
) VALUES
($1,'My Job'),
($1,'My Supervisor'),
($1,'My Team'),
($1,'My Organization');

SELECT * FROM dimension WHERE company_id = $1;